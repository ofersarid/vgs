import React, { PureComponent, Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import Device from '/src/components/device';
import { SnapScroll, DropMenu } from '/src/components';
import { Swipeable } from 'react-swipeable';
import { LongArrowAltRight } from 'styled-icons/fa-solid/LongArrowAltRight';
import { LongArrowAltLeft } from 'styled-icons/fa-solid/LongArrowAltLeft';
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
    this.listRef.addEventListener('mouseenter', this.preventOuterScroll, false);
    this.listRef.addEventListener('mouseleave', this.enableOuterScroll, false);
    this.listRef.addEventListener('scroll', this.onScrollHandlerDB, false);
    this.listRef.addEventListener('wheel', this.onWheelHandler, false);
    this.setState({
      start: this.listRef.clientWidth < this.listRef.scrollWidth,
    });
  }

  componentWillUnmount() {
    this.listRef.removeEventListener('mouseenter', this.preventOuterScroll, false);
    this.listRef.removeEventListener('mouseleave', this.enableOuterScroll, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { slide } = this.state;
    const { isTouchDevice } = this.props;
    // this.listRef.scrollLeft = this.getSlideScrollPosition();
    if (isTouchDevice) {
      animateScrollTo(this.slidesRefs[slide].current, { element: this.listRef, horizontal: true });
    }
  }

  onScrollHandler() {
    const { slide } = this.state;
    this.preventOuterScroll();
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
    if (Math.abs(deltaY) > 0) this.listRef.scrollLeft += deltaY;
  }

  preventOuterScroll() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(true, true);
  }

  enableOuterScroll() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(false, false);
  }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  renderData() {
    const { articles } = this.props;
    const dom = articles.map((m, i) => (
      <div ref={this.slidesRefs[i]} className={cx(styles.outerWrapper)} key={m.id} >
        <div className={`ripple waves-color ${styles.innerWrapper}`} >
          <div className={styles.date} >{moment(m.date).format('MMMM Do, YYYY')}</div >
          <div className={styles.header} >{m.header}</div >
          <div className={styles.source} >{m.source}</div >
        </div >
      </div >
    ));
    return dom;
  }

  // onChangeHandler(slide) {
  //   this.setState({ slide });
  // }

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

  onSwipingHandler() {
    const { disableScrollSnap, disableNext, disablePrev } = this.props;
    if (!disableNext || !disablePrev) {
      disableScrollSnap(true, true);
    }
  }

  onSwipedHandler() {
    const { disableScrollSnap, disableNext, disablePrev } = this.props;
    if (disableNext || disablePrev) {
      disableScrollSnap(false, false);
    }
  }

  render() {
    const { frame, showOnFrame, isTouchDevice } = this.props;
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
            <DropMenu options={menuOptions} selected={menuOptions[0]} triggerClass={styles.menuTrigger} />
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
              onSwiping={this.onSwipingHandler}
              onSwiped={this.onSwipedHandler}
              preventDefaultTouchmoveEvent
            >
              {this.renderData()}
            </Swipeable >
            <LongArrowAltRight className={cx(styles.arrow)} style={{
              opacity: props.arrowRightOpacity,
            }} />
            <LongArrowAltLeft className={cx(styles.arrow)} style={{
              opacity: props.arrowLeftOpacity,
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
    date: PropTypes.instanceOf(Date).isRequired,
    header: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
  disableNext: SnapScroll.selectors.disableNext(state),
  disablePrev: SnapScroll.selectors.disablePrev(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
