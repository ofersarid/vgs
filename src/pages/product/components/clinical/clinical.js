import React, { PureComponent, Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _orderBy from 'lodash/orderBy';
import moment from 'moment';
import Device from '/src/shared/device';
import { SnapScroll, DropMenu, Button } from '/src/shared';
import { Swipeable } from 'react-swipeable';
import { LongArrowAltRight } from 'styled-icons/fa-solid/LongArrowAltRight';
import { LongArrowAltLeft } from 'styled-icons/fa-solid/LongArrowAltLeft';
import services from '/src/services';
import sharedStyles from '../../styles.scss';
import styles from './styles.scss';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
      slide: 0,
      start: true,
      end: false
    };
    autoBind(this);
    this.slidesRefs = [];
    props.articles.forEach(item => {
      this.slidesRefs.push(React.createRef());
    });

    this.onScrollHandlerDB = debounce(this.onScrollHandler, 250);
  }

  componentDidMount() {
    this.listRef.addEventListener('mouseenter', this.touchStartHandler, false);
    this.listRef.addEventListener('mouseleave', this.touchEndHandler, false);
    this.listRef.addEventListener('scroll', this.onScrollHandlerDB, false);
    this.listRef.addEventListener('wheel', this.onWheelHandler, false);
    this.listRef.addEventListener('touchstart', this.touchStartHandler, false);
    this.listRef.addEventListener('touchend', this.touchEndHandler, false);
    this.listRef.scrollLeft = 0;
    this.setState({
      start: this.listRef.clientWidth < this.listRef.scrollWidth,
    });
  }

  componentWillUnmount() {
    this.listRef.removeEventListener('mouseenter', this.touchStartHandler, false);
    this.listRef.removeEventListener('mouseleave', this.touchEndHandler, false);
    this.listRef.removeEventListener('touchstart', this.touchStartHandler, false);
    this.listRef.removeEventListener('touchend', this.touchEndHandler, false);
    this.listRef.removeEventListener('wheel', this.onWheelHandler, false);
    this.listRef.removeEventListener('scroll', this.onScrollHandlerDB, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { slide } = this.state;
    const { isTouchDevice } = this.props;
    // this.listRef.scrollLeft = this.getSlideScrollPosition();
    if (isTouchDevice && slide !== prevState.slide) {
      animateScrollTo(this.slidesRefs[slide].current, { element: this.listRef, horizontal: true });
    }
  }

  touchStartHandler(e) {
    const { disableScrollSnap } = this.props;
    e.stopPropagation();
    e.preventDefault();
    disableScrollSnap(true, true);
  }

  touchEndHandler(e) {
    const { disableScrollSnap } = this.props;
    e.stopPropagation();
    e.preventDefault();
    disableScrollSnap(false, false);
  }

  onScrollHandler() {
    const { disableScrollSnap } = this.props;
    const { slide } = this.state;
    disableScrollSnap(true, true);
    if (this.listRef.scrollLeft + this.listRef.clientWidth >= this.listRef.scrollWidth - 10) {
      // end reached
      this.setState({ end: true, start: false });
    } else if (this.listRef.scrollLeft === 0) {
      // start reached
      this.setState({ start: true, end: false });
    } else if (slide !== 1) {
      // somewhere in the middle
      this.setState({ start: false, end: false });
    }
  }

  onWheelHandler(e) {
    const deltaY = e.wheelDeltaY;
    e.preventDefault();
    if (Math.abs(deltaY) > 0) this.listRef.scrollLeft -= deltaY;
  }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  renderData() {
    const { articles, color } = this.props;
    const dom = articles.map((m, i) => (
      <div ref={this.slidesRefs[i]} className={cx(styles.outerWrapper)} key={m.link} >
        <Button
          className={styles.innerWrapper}
          tag="a"
          target="_blank"
          rel="noopener noreferrer"
          href={m.link}
          waveColor={color === '#0272BA' ? 'blue' : 'purple'}
        >
          <div className={styles.date} >{moment(m.dateTime.toDate()).format('MMMM Do, YYYY')}</div >
          <div className={styles.header} style={{ color }} >{m.description}</div >
          <div className={styles.source} >{m.source}</div >
        </Button >
      </div >
    ));
    return dom;
  }

  onSwipedLeftHandler() {
    const { articles } = this.props;
    const { slide } = this.state;
    const nextSlide = Math.min(slide + 1, articles.length - 1);
    this.setState({
      slide: nextSlide,
      start: nextSlide === 0,
      end: nextSlide === articles.length - 1,
    });
  }

  onSwipedRightHandler() {
    const { slide } = this.state;
    const { articles } = this.props;
    const nextSlide = Math.max(slide - 1, 0);
    this.setState({
      slide: nextSlide,
      start: nextSlide === 0,
      end: nextSlide === articles.length - 1,
    });
  }

  onSwipedHandler() {
    const { disableScrollSnap, disableNext, disablePrev } = this.props;
    if (disableNext || disablePrev) {
      disableScrollSnap(disableNext, disablePrev);
    }
  }

  render() {
    const { frame, showOnFrame, isTouchDevice, color } = this.props;
    const { start, end } = this.state;
    const menuOptions = [{ display: 'publications', value: 'publications' }];
    return (
      <Fragment >
        <Spring
          from={{
            opacity: frame === showOnFrame ? 0 : 1,
            arrowRightOpacity: start ? 0 : 1,
            arrowLeftOpacity: end ? 0 : 1
          }}
          to={{
            opacity: frame === showOnFrame ? 1 : 0,
            arrowRightOpacity: start ? 1 : 0,
            arrowLeftOpacity: end ? 1 : 0
          }}
          immediate={frame !== showOnFrame}
        >
          {props => <div
            className={cx(styles.clinical, sharedStyles.inner)}
            style={{
              opacity: props.opacity,
            }}
          >
            <DropMenu options={menuOptions} selected={menuOptions[0]} triggerClass={styles.menuTrigger} color={color} />
            <Swipeable
              className={styles.carousel}
              innerRef={ref => {
                this.listRef = ref;
              }}
              style={{
                overflow: isTouchDevice ? 'hidden' : 'auto',
              }}
              onSwipedLeft={this.onSwipedLeftHandler}
              onSwipedRight={this.onSwipedRightHandler}
              // onSwiping={this.onSwipingHandler}
              // onSwipedUp={this.onVertivcalSwipeHandler}
              // onSwipedDown={this.onVertivcalSwipeHandler}
              onSwiped={this.onSwipedHandler}
              preventDefaultTouchmoveEvent={true}
              trackTouch={true}
            >
              {this.renderData()}
            </Swipeable >
            <LongArrowAltRight className={cx(styles.arrow)} style={{
              opacity: props.arrowRightOpacity,
              color,
            }} />
            <LongArrowAltLeft className={cx(styles.arrow)} style={{
              opacity: props.arrowLeftOpacity,
              color,
            }} />
          </div >}
        </Spring >
      </Fragment >
    );
  }
}

Clinical.propTypes = {
  frame: PropTypes.number.isRequired,
  themeColor: PropTypes.string.isRequired,
  showOnFrame: PropTypes.number.isRequired,
  disableScrollSnap: PropTypes.func.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disablePrev: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
  disableNext: SnapScroll.selectors.disableNext(state),
  disablePrev: SnapScroll.selectors.disablePrev(state),
  color: services.products.selectors.color(state),
  articles: _orderBy(services.reactor.selectors.collectionData(
    state,
    `publications - ${services.products.selectors.name(state)}`
  ), item => [item.dateTime.toDate()]),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
