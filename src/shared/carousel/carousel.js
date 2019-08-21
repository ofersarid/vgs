import React, { PureComponent, Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compact from 'lodash/compact';
import flattenDeep from 'lodash/flattenDeep';
import { Swipeable } from 'react-swipeable';
import { LongArrowAltRight } from 'styled-icons/fa-solid/LongArrowAltRight';
import { LongArrowAltLeft } from 'styled-icons/fa-solid/LongArrowAltLeft';

import Device from '/src/shared/device';
import { SnapScroll } from '/src/shared';
import services from '/src/services';

import styles from './styles.scss';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
      slide: 0,
      start: true,
      end: false,
      children: [],
    };
    autoBind(this);
    this.slidesRefs = [];

    this.onScrollHandlerDB = debounce(this.onScrollHandler, 250);
  }

  static getDerivedStateFromProps(nextProps) {
    const children = compact(Array.isArray(nextProps.children) ? flattenDeep(nextProps.children) : [nextProps.children]);
    return {
      children,
    };
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
    this.updateSlidesRef();
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
    const { slide, children } = this.state;
    const { isTouchDevice } = this.props;
    // this.listRef.scrollLeft = this.getSlideScrollPosition();
    if (isTouchDevice && slide !== prevState.slide) {
      animateScrollTo(this.slidesRefs[slide].current, { element: this.listRef, horizontal: true });
    }
    if (!isEqual(children, prevState.children)) {
      this.updateSlidesRef();
    }
  }

  updateSlidesRef() {
    const { children } = this.state;
    this.slidesRefs = [];
    children.forEach(() => {
      this.slidesRefs.push(React.createRef());
    });
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
    const { children } = this.state;
    const dom = children.map((child, i) => (
      <div ref={this.slidesRefs[i]} className={cx(styles.outerWrapper)} key={i} >
        {child}
      </div >
    ));
    return dom;
  }

  onSwipedLeftHandler() {
    const { slide, children } = this.state;
    const nextSlide = Math.min(slide + 1, children.length - 1);
    this.setState({
      slide: nextSlide,
      start: nextSlide === 0,
      end: nextSlide === children.length - 1,
    });
  }

  onSwipedRightHandler() {
    const { slide, children } = this.state;
    const nextSlide = Math.max(slide - 1, 0);
    this.setState({
      slide: nextSlide,
      start: nextSlide === 0,
      end: nextSlide === children.length - 1,
    });
  }

  onSwipedHandler() {
    const { disableScrollSnap, disableNext, disablePrev } = this.props;
    if (disableNext || disablePrev) {
      disableScrollSnap(disableNext, disablePrev);
    }
  }

  render() {
    const { isTouchDevice, color } = this.props;
    const { start, end } = this.state;
    return (
      <Spring
        from={{
          arrowRightOpacity: start ? 0 : 1,
          arrowLeftOpacity: end ? 0 : 1
        }}
        to={{
          arrowRightOpacity: start ? 1 : 0,
          arrowLeftOpacity: end ? 1 : 0
        }}
      >
        {props => <Fragment >
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
        </Fragment >}
      </Spring >
    );
  }
}

Carousel.propTypes = {
  disableScrollSnap: PropTypes.func.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disablePrev: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  isTouchDevice: Device.selectors.isTouchDevice(state),
  disableNext: SnapScroll.selectors.disableNext(state),
  disablePrev: SnapScroll.selectors.disablePrev(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
