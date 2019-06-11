import React, { PureComponent, Fragment } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import animateScrollTo from 'animated-scroll-to';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { SnapScroll } from '/src/components';
import { Swipeable } from 'react-swipeable';
import { LongArrowAltRight } from 'styled-icons/fa-solid/LongArrowAltRight';
import { LongArrowAltLeft } from 'styled-icons/fa-solid/LongArrowAltLeft';
import IndexHeader from '../index-header/index-header';
import styles from './styles.scss';
// import ReactSwipe from 'react-swipe';
import mock from './clinical.mock';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
      slide: 0,
    };
    autoBind(this);
    this.slidesRefs = [];
    mock.forEach(item => {
      this.slidesRefs.push(React.createRef());
    });
  }

  componentDidMount() {
    this.listRef.addEventListener('mouseenter', this.preventOuterScroll, false);
    this.listRef.addEventListener('mouseleave', this.enableOuterScroll, false);
  }

  componentWillUnmount() {
    this.listRef.removeventListener('mouseenter', this.preventOuterScroll, false);
    this.listRef.removeventListener('mouseleave', this.enableOuterScroll, false);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { slide } = this.state;
    // this.listRef.scrollLeft = this.getSlideScrollPosition();
    animateScrollTo(this.slidesRefs[slide].current, { element: this.listRef, horizontal: true });
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
    const { slide } = this.state;
    const dom = mock.map((m, i) => (
      <div ref={this.slidesRefs[i]} className={cx(styles.outerWrapper, {
        [styles.disable]: slide !== i,
        [styles.toFront]: slide + 1 === i || slide - 1 === i || slide === i
      })} key={m.id} >
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
    const { slide } = this.state;
    this.setState({ slide: Math.min(slide + 1, mock.length - 1) });
  }

  onSwipedRightHandler() {
    const { slide } = this.state;
    this.setState({ slide: Math.max(slide - 1, 0) });
  }

  // getSlideScrollPosition() {
  //   const { slide } = this.state;
  //   const $current = this.slidesRefs[slide].current;
  //   return $current ? $current.offsetLeft : 0;
  // };
  //
  // getPrevSlideScrollPosition() {
  //   const { slide } = this.state;
  //   const $current = this.slidesRefs[Math.max(0, slide - 1)].current;
  //   return $current ? $current.offsetLeft : 0;
  // }

  onSwipingHandler() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(true, true);
  }

  onSwipedHandler() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(false, false);
  }

  render() {
    const { frame, index } = this.props;
    const { slide } = this.state;
    return (
      <Fragment >
        <IndexHeader index={index} header="Clinical" />
        <Spring
          from={{ opacity: frame === index ? 0 : 1, arrowRightOpacity: slide === 0 ? 0 : 1, arrowLeftOpacity: slide === mock.length - 1 ? 0 : 1 }}
          to={{ opacity: frame === index ? 1 : 0, arrowRightOpacity: slide === 0 ? 1 : 0, arrowLeftOpacity: slide === mock.length - 1 ? 1 : 0 }}
          immediate={frame !== index}
        >
          {props => <div
            className={styles.clinical}
            style={{
              opacity: props.opacity,
            }}
          >
            <Swipeable
              className={styles.carousel}
              innerRef={ref => {
                this.listRef = ref;
              }}
              onSwipedLeft={this.onSwipedLeftHandler}
              onSwipedRight={this.onSwipedRightHandler}
              onSwiping={this.onSwipingHandler}
              onSwiped={this.onSwipedHandler}
              onMouseEnter={() => {
                this.props.disableScrollSnap(true, true);
              }}
              preventDefaultTouchmoveEvent
            >
              {this.renderData()}
            </Swipeable >
            <LongArrowAltRight className={cx(styles.arrow)} style={{
              opacity: props.arrowRightOpacity,
            }} />
            <LongArrowAltLeft className={cx(styles.arrow)} style={{
              opacity: slide === mock.length - 1 ? props.arrowLeftOpacity : 0,
            }} />
          </div >}
        </Spring >
      </Fragment >
    );
  }
}

Clinical.propTypes = {
  frame: PropTypes.number.isRequired,
  themeColor: PropTypes.oneOf(['blue']).isRequired,
  index: PropTypes.number.isRequired,
  disableScrollSnap: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
