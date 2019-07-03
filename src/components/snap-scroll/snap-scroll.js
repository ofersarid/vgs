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
      start: PropTypes.number,
      frame: PropTypes.number.isRequired,
      indexChanged: PropTypes.func,
      updateFrameIndex: PropTypes.func.isRequired,
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      customTransition: PropTypes.string,
      disableScrollSnap: PropTypes.func.isRequired,
      disableNext: PropTypes.bool.isRequired,
      disablePrev: PropTypes.bool.isRequired,
      count: PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      start: 0,
      indexChanged: f => f,
      orientation: 'vertical',
      customTransition: null,
    };
  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.xDown = null;
    this.children = flattenDeep(props.children);
    this.state = {
      index: this.getStartIndex(),
      direction: DIRECTION.FORWARD,
    };
    this.lock = false;
    inertia.addCallback(this.snap);
    props.disableScrollSnap(props.frame === this.children.length - 1, props.frame === 0);
  }

  componentDidUpdate(prevProps) {
    const { frame, disableScrollSnap } = this.props;
    if (frame === 0 && frame !== prevProps.frame) {
      disableScrollSnap(false, false);
    }
    if (frame !== prevProps.frame) {
      disableScrollSnap(frame === this.children.length - 1, frame === 0);
    }
  }

  componentDidMount() {
    const { indexChanged, updateFrameIndex, count, children } = this.props;
    this.$node.addEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.addEventListener('touchstart', this.touchStartHandler, false);
    this.$node.addEventListener('touchend', this.touchEndHandler, false);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, false);
    // Fire initial indexChanged();
    indexChanged(this.state.index);
    updateFrameIndex(this.state.index);
    count(Array.isArray(children) ? flattenDeep(children).length : 1);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, false);
    this.$node.removeEventListener('touchend', this.touchEndHandler, false);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, false);
  }

  getStartIndex(props) {
    const { start } = props || this.props;
    // Returns 0 if the start prop is undefined or out of bounds.
    return !this.children.length ? 0 : (start < 0 || start >= this.children.length) ? 0 : start;
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
    if (disableNext) return;
    const index = Math.min(this.state.index + 1, this.children.length - 1);
    this.setState({
      index,
      direction: DIRECTION.FORWARD,
    }, () => {
      this.props.indexChanged(index);
      this.props.updateFrameIndex(index);
    });
  };

  prev() {
    const { disablePrev } = this.props;
    console.log('prev');
    if (disablePrev) return;
    const index = Math.max(0, this.state.index - 1);
    this.setState({
      index,
      direction: DIRECTION.REVERSE,
    }, () => {
      this.props.indexChanged(index);
      this.props.updateFrameIndex(index);
    });
  };

  renderChildren() {
    const { frame } = this.props;
    return this.children[frame];
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
