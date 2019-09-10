import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import Device from '/src/shared/device';
import { SnapScroll, FadeIn, DropMenu, Button } from '/src/shared';
import services from '/src/services';
import sharedStyles from '../../styles.scss';
import styles from './styles.scss';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // reverseAnimation: false,
      // slide: 0,
      // start: true,
      // end: false
    };
    autoBind(this);
    // this.slidesRefs = [];
    // props.articles.forEach(item => {
    //   this.slidesRefs.push(React.createRef());
    // });

    // this.onScrollHandlerDB = debounce(this.onScrollHandler, 250);
  }

  componentDidMount() {
    // this.listRef.addEventListener('mouseenter', this.touchStartHandler, false);
    // this.listRef.addEventListener('mouseleave', this.touchEndHandler, false);
    // this.listRef.addEventListener('scroll', this.onScrollHandlerDB, false);
    // this.listRef.addEventListener('wheel', this.onWheelHandler, false);
    // this.listRef.addEventListener('touchstart', this.touchStartHandler, false);
    // this.listRef.addEventListener('touchend', this.touchEndHandler, false);
    // this.listRef.scrollLeft = 0;
    // this.setState({
    //   start: this.listRef.clientWidth < this.listRef.scrollWidth,
    // });
  }

  componentWillUnmount() {
    // this.listRef.removeEventListener('mouseenter', this.touchStartHandler, false);
    // this.listRef.removeEventListener('mouseleave', this.touchEndHandler, false);
    // this.listRef.removeEventListener('touchstart', this.touchStartHandler, false);
    // this.listRef.removeEventListener('touchend', this.touchEndHandler, false);
    // this.listRef.removeEventListener('wheel', this.onWheelHandler, false);
    // this.listRef.removeEventListener('scroll', this.onScrollHandlerDB, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // const { slide } = this.state;
    // const { isTouchDevice } = this.props;
    // this.listRef.scrollLeft = this.getSlideScrollPosition();
    // if (isTouchDevice && slide !== prevState.slide) {
    //   animateScrollTo(this.slidesRefs[slide].current, { element: this.listRef, horizontal: true });
    // }
  }

  // touchStartHandler(e) {
  //   const { disableScrollSnap } = this.props;
  //   e.stopPropagation();
  //   e.preventDefault();
  //   disableScrollSnap(true, true);
  // }
  //
  // touchEndHandler(e) {
  //   const { disableScrollSnap } = this.props;
  //   e.stopPropagation();
  //   e.preventDefault();
  //   disableScrollSnap(false, false);
  // }

  // onScrollHandler() {
  //   const { disableScrollSnap } = this.props;
  //   const { slide } = this.state;
  //   disableScrollSnap(true, true);
  //   if (this.listRef.scrollLeft + this.listRef.clientWidth >= this.listRef.scrollWidth - 10) {
  //     // end reached
  //     this.setState({ end: true, start: false });
  //   } else if (this.listRef.scrollLeft === 0) {
  //     // start reached
  //     this.setState({ start: true, end: false });
  //   } else if (slide !== 1) {
  //     // somewhere in the middle
  //     this.setState({ start: false, end: false });
  //   }
  // }

  // onWheelHandler(e) {
  //   const deltaY = e.wheelDeltaY;
  //   e.preventDefault();
  //   if (Math.abs(deltaY) > 0) this.listRef.scrollLeft -= deltaY;
  // }

  // reverseAnimation() {
  //   const { reverseAnimation } = this.state;
  //   this.setState({ reverseAnimation: !reverseAnimation });
  // }

  resolveWaveColor() {
    const { color } = this.props;
    switch (color) {
      case '#0272BA':
        return 'blue';
      default:
        return 'gray';
    }
  }

  renderData() {
    const { articles, color, isMobile, colorName } = this.props;
    const displayed = articles.slice(0, isMobile ? 2 : 3);
    const dom = displayed.map(m => (
      <div className={cx(styles.outerWrapper)} key={m.link} >
        <Button
          className={styles.innerWrapper}
          tag="a"
          target="_blank"
          rel="noopener noreferrer"
          href={m.link}
          waveColor={colorName}
        >
          <div className={styles.date} >{moment(m.dateTime.toDate()).format('MMMM Do, YYYY')}</div >
          <div className={styles.header} style={{ color }} >{m.description}</div >
          {!isMobile && <div className={styles.source} >{m.source}</div >}
        </Button >
      </div >
    ));
    return dom;
  }

  // onSwipedLeftHandler() {
  //   const { articles } = this.props;
  //   const { slide } = this.state;
  //   const nextSlide = Math.min(slide + 1, articles.length - 1);
  //   this.setState({
  //     slide: nextSlide,
  //     start: nextSlide === 0,
  //     end: nextSlide === articles.length - 1,
  //   });
  // }
  //
  // onSwipedRightHandler() {
  //   const { slide } = this.state;
  //   const { articles } = this.props;
  //   const nextSlide = Math.max(slide - 1, 0);
  //   this.setState({
  //     slide: nextSlide,
  //     start: nextSlide === 0,
  //     end: nextSlide === articles.length - 1,
  //   });
  // }
  //
  // onSwipedHandler() {
  //   const { disableScrollSnap, disableNext, disablePrev } = this.props;
  //   if (disableNext || disablePrev) {
  //     disableScrollSnap(disableNext, disablePrev);
  //   }
  // }

  render() {
    const { color, colorName } = this.props;
    const menuOptions = [{ display: 'publications', value: 'publications' }];
    return (
      <FadeIn spread >
        <div className={cx(styles.clinical, sharedStyles.inner)} >
          <DropMenu options={menuOptions} selected={menuOptions[0]} triggerClass={styles.menuTrigger} color={color} />
          {this.renderData()}
          <Button
            className={styles.readMoreBtn}
            onClick={this.onClick}
            waveColor={colorName}
            style={{
              color,
            }}
          >
            See All
          </Button >
        </div >
      </FadeIn >
    );
  }
}

Clinical.propTypes = {
  themeColor: PropTypes.string.isRequired,
  disableScrollSnap: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disablePrev: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  openReader: PropTypes.func.isRequired,
  setReader: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
  disableNext: SnapScroll.selectors.disableNext(state),
  disablePrev: SnapScroll.selectors.disablePrev(state),
  color: services.vgs.selectors.color(state),
  colorName: services.vgs.selectors.colorName(state),
  articles: _sortBy(services.reactor.selectors.collectionData(
    state,
    `publications - ${services.products.selectors.name(state)}`
  ), item => item.dateTime.toDate()).reverse(),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
  openReader: () => dispatch(services.reader.actions.open()),
  setReader: content => dispatch(services.reader.actions.set(content)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
