import React, { cloneElement } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import inertia from 'wheel-inertia';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import actions from './actions';
import selectors from './selectors';
import styles from './styles.scss';
import flattenDeep from 'lodash/flattenDeep';

const DIRECTION = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
};

const THRESHHOLD = 10;

const Wrapper = ({ children, index, frame }) => (
  <div className={cx(styles.wrapper)} style={{ zIndex: frame === index ? 1 : 0 }} >
    <div className={styles.inner} >
      {cloneElement(children, { index })}
    </div >
  </div >
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  frame: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

class SnapScroll extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
      ]).isRequired,
      frame: PropTypes.number.isRequired,
      updateFrameIndex: PropTypes.func.isRequired,
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      disableScrollSnap: PropTypes.func.isRequired,
      disableNext: PropTypes.bool.isRequired,
      disablePrev: PropTypes.bool.isRequired,
      count: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      orientation: 'vertical',
    };
  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.xDown = null;
    this.state = {
      index: 0,
      direction: DIRECTION.FORWARD,
      children: [],
    };
    this.lock = false;
    inertia.addCallback(this.snap);
    // props.disableScrollSnap(props.frame === this.children.length - 1, props.frame === 0);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const children = flattenDeep(nextProps.children);
    nextProps.count(children.length || 1);
    return {
      index: nextProps.frame,
      prevPath: DIRECTION[nextProps.frame > prevState.index ? 'FORWARD' : 'REVERSE'],
      children,
    };
  }

  componentDidUpdate(prevProps) {
    const { frame, disableScrollSnap } = this.props;
    const { children } = this.state;
    if (frame === 0 && frame !== prevProps.frame) {
      disableScrollSnap(false, false);
    }
    if (frame !== prevProps.frame) {
      disableScrollSnap(frame === children.length - 1, frame === 0);
    }
  }

  componentDidMount() {
    const { updateFrameIndex } = this.props;
    this.$node.addEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.addEventListener('touchstart', this.touchStartHandler, false);
    this.$node.addEventListener('touchend', this.touchEndHandler, false);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, false);
    updateFrameIndex(this.state.index);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, false);
    this.$node.removeEventListener('touchend', this.touchEndHandler, false);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, false);
  }

  snap(direction) {
    if (this.lock) return;
    if (this.isTouchDevice) {
      this.lock = true;
    }
    switch (direction) {
      case -1:
        this.next();
        break;
      case 1:
        this.prev();
        break;
      default:
        break;
    }
  }

  mouseScrollHandler(e) {
    const delta = e.wheelDelta;
    this.isTouchDevice = false;
    inertia.update(delta);
  };

  touchStartHandler(e) {
    const { disableScrollSnap } = this.props;
    this.lock = false;
    this.yDown = e.touches[0].clientY;
    disableScrollSnap(false, false);
    this.isTouchDevice = true;
  };

  touchEndHandler(e) {
    this.yDown = null;
  }

  touchMoveHandler(e) {
    let yUp = e.touches[0].clientY;
    let delta = (this.yDown - yUp);
    if (Math.abs(delta) > THRESHHOLD) {
      this.snap(delta > 0 ? -1 : 1);
    }
  };

  next() {
    const { disableNext } = this.props;
    const { children } = this.state;
    if (disableNext) return;
    const index = Math.min(this.state.index + 1, children.length - 1);
    this.props.updateFrameIndex(index);
  };

  prev() {
    const { disablePrev } = this.props;
    if (disablePrev) return;
    const index = Math.max(0, this.state.index - 1);
    this.props.updateFrameIndex(index);
  };

  renderChildren() {
    const { frame } = this.props;
    const { children } = this.state;
    return children[frame];
  }

  render() {
    return (
      <div className={styles.snapScroll} ref={el => {
        this.$node = el;
      }} >
        {this.renderChildren()}
      </div >
    );
  }
}

SnapScroll.selectors = selectors;
SnapScroll.actions = actions;

const mapStateToProps = state => ({
  frame: selectors.frame(state),
  disableNext: selectors.disableNext(state),
  disablePrev: selectors.disablePrev(state),
});

const mapDispatchToProps = dispatch => ({
  updateFrameIndex: (...props) => dispatch(actions.updateFrameIndex(...props)),
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
  count: (...props) => dispatch(actions.count(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SnapScroll);
