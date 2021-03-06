import React, { cloneElement } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import flattenDeep from 'lodash/flattenDeep';
import compact from 'lodash/compact';
import { hashHistory } from 'react-router';
import Routes from '/src/routes';
import actions from './actions';
import selectors from './selectors';
import styles from './styles.scss';

const DIRECTION = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
};

const THRESHHOLD = 1;

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
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      disableScrollSnap: PropTypes.func.isRequired,
      disableNext: PropTypes.bool,
      disablePrev: PropTypes.bool,
      count: PropTypes.func.isRequired,
      setIsLastFrame: PropTypes.func.isRequired,
      pathname: PropTypes.string,
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
      lock: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const children = compact(Array.isArray(nextProps.children) ? flattenDeep(nextProps.children) : [nextProps.children]);
    nextProps.count(children.length || 1);
    return {
      index: nextProps.frame,
      prevPath: DIRECTION[nextProps.frame > prevState.index ? 'FORWARD' : 'REVERSE'],
      children,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { frame, disableScrollSnap, setIsLastFrame } = this.props;
    const { children } = this.state;
    if (frame !== prevProps.frame || children.length !== prevState.children.length) {
      if (frame > 0 && frame < children.length - 1) {
        disableScrollSnap(false, false);
      } else if (frame === 0) {
        disableScrollSnap(false, true);
      } else if (frame === children.length - 1) {
        disableScrollSnap(true, false);
      } else {
        disableScrollSnap(true, true);
      }
      if (frame === children.length - 1) {
        setIsLastFrame(true);
      } else {
        setIsLastFrame(false);
      }
    }
  }

  componentDidMount() {
    const { frame, setIsLastFrame } = this.props;
    const { children } = this.state;
    this.$node.addEventListener('wheel', this.mouseScrollHandler, true);
    this.$node.addEventListener('touchstart', this.touchStartHandler, true);
    this.$node.addEventListener('touchend', this.touchEndHandler, true);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, true);
    if (frame === children.length - 1) {
      setIsLastFrame(true);
    } else {
      setIsLastFrame(false);
    }
  }

  componentWillUnmount() {
    const { disableScrollSnap } = this.props;
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, true);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, true);
    this.$node.removeEventListener('touchend', this.touchEndHandler, true);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, true);
    disableScrollSnap(false, false);
  }

  snap(direction) {
    const { lock } = this.state;
    if (lock) return;
    this.setState({ lock: true });
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
    clearTimeout(this.to);
    const delta = e.wheelDelta || (e.deltaY * -1);
    this.isTouchDevice = false;
    if (Math.abs(delta) > THRESHHOLD) {
      this.snap(delta < 0 ? -1 : 1);
    }
    this.to = setTimeout(() => {
      this.setState({ lock: false });
    }, 100);
  };

  touchStartHandler(e) {
    const { disableScrollSnap } = this.props;
    this.setState({ lock: false });
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

  navigateToFrame(frame) {
    const { pathname } = this.props;
    const splitPath = pathname.split('/');
    splitPath.splice(1, 1, [frame]);
    hashHistory.push(splitPath.join('/'));
  }

  next() {
    const { disableNext } = this.props;
    const { children } = this.state;
    if (disableNext) return;
    const index = Math.min(this.state.index + 1, children.length - 1);
    this.navigateToFrame(index);
  };

  prev() {
    const { disablePrev } = this.props;
    if (disablePrev) return;
    const index = Math.max(0, this.state.index - 1);
    this.navigateToFrame(index);
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
  pathname: Routes.selectors.pathname(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
  count: (...props) => dispatch(actions.count(...props)),
  setIsLastFrame: bool => dispatch(actions.setIsLastFrame(bool)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SnapScroll);
