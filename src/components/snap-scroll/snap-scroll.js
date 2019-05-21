import React, { cloneElement } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import inertia from 'wheel-inertia';
// import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import actions from './actions';
import selectors from './selectors';
import styles from './styles.scss';

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
      firstLook: PropTypes.func.isRequired,
      disableScrollSnap: PropTypes.func.isRequired,
      disableNext: PropTypes.bool.isRequired,
      disablePrev: PropTypes.bool.isRequired,
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

  // Returns 0 if the start prop is undefined or out of bounds.
  getStartIndex() {
    const { start, children } = this.props;
    return !children.length ? 0 : (start >= 0 && start < children.length) ? Math.floor(start) : 0;
  }

  constructor(props) {
    super(props);
    autoBind(this);
    this.xDown = null;
    this.state = {
      index: this.getStartIndex(),
      direction: DIRECTION.FORWARD,
    };
    this.lock = false;
    inertia.addCallback(this.snap);
  }

  componentDidUpdate(prevProps) {
    const { frame, disableScrollSnap } = this.props;
    if (frame === 0 && frame !== prevProps.frame) {
      disableScrollSnap(false, false);
    }
  }

  componentDidMount() {
    this.$node.addEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.addEventListener('touchstart', this.touchStartHandler, false);
    this.$node.addEventListener('touchend', this.touchEndHandler, false);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, false);

    // Fire initial indexChanged();
    this.props.indexChanged(this.state.index);
    this.props.updateFrameIndex(this.state.index);
    this.props.firstLook(true);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, false);
    this.$node.removeEventListener('touchend', this.touchEndHandler, false);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, false);
  }

  snap(direction) {
    this.lock = true;
    this.props.firstLook(false);
    if (this.to) {
      clearTimeout(this.to);
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
    if (!this.isTouchDevice) {
      this.to = setTimeout(() => {
        this.lock = false;
      }, 300);
    }
  }

  mouseScrollHandler(e) {
    const delta = e.wheelDelta;
    if (this.lock) return;
    inertia.update(delta);
  };

  touchStartHandler(e) {
    const { disableScrollSnap } = this.props;
    this.yDown = e.touches[0].clientY;
    disableScrollSnap(false, false);
    this.isTouchDevice = true;
  };

  touchEndHandler(e) {
    this.lock = false;
    this.yDown = null;
  }

  touchMoveHandler(e) {
    // const { disableNext, disablePrev } = this.props;
    if (this.lock) return;
    let yUp = e.touches[0].clientY;
    let delta = (this.yDown - yUp);
    e.preventDefault();
    if (Math.abs(delta) > THRESHHOLD) {
      // if ((delta > 0 && !disableNext) ||
      //   (delta > 0 && !disablePrev) ||
      //   (!disableNext && !disablePrev)) {
      // }
      this.snap(delta > 0 ? -1 : 1);
    }
  };

  next() {
    const { disableNext } = this.props;
    if (disableNext) return;
    const index = Math.min(this.state.index + 1, this.props.children.length - 1);
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

  renderPages() {
    const { children, frame } = this.props;
    // const { index } = this.state;

    const isArray = Array.isArray(children);

    return isArray
      ? children.map((child, key) => {
        return (
          <Wrapper key={key} frame={frame} index={key} >{child}</Wrapper >
        );
      }) : <Wrapper >{children}</Wrapper >;
  }

  render() {
    return (
      <div className={styles.snapScroll} ref={el => {
        this.$node = el;
      }} >
        {this.renderPages()}
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
  firstLook: (...props) => dispatch(actions.firstLook(...props)),
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SnapScroll);
