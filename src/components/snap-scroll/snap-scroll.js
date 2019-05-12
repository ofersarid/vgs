import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import inertia from 'wheel-inertia';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import actions from './actions';
import selectors from './selectors';
import styles from './styles.scss';

const DIRECTION = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
};

const Wrapper = ({ children, className }) => (
  <div className={cx(styles.wrapper, className)} >
    <div className={styles.inner} >
      {children}
    </div >
  </div >
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

class SnapScroll extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
      ]).isRequired,
      start: PropTypes.number,
      indexChanged: PropTypes.func,
      updateFrameIndex: PropTypes.func.isRequired,
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      customTransition: PropTypes.string,
      customDuration: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      start: 0,
      indexChanged: f => f,
      orientation: 'vertical',
      customTransition: null,
      customDuration: { enter: 1000, exit: 1000 },
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
    this.moving = false;
    inertia.addCallback(this.snap);
  }

  componentDidMount() {
    this.$node.addEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.addEventListener('touchstart', this.touchStartHandler, false);
    this.$node.addEventListener('touchend', this.touchEndHandler, false);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, false);

    // Fire initial indexChanged();
    this.props.indexChanged(this.state.index);
    this.props.updateFrameIndex(this.state.index);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, false);
    this.$node.removeEventListener('touchend', this.touchEndHandler, false);
    this.$node.removeEventListener('touchmove', this.touchMoveHandler, false);
  }

  snap(direction) {
    switch (true) {
      case (direction === -1):
        console.log('trigger next');
        this.next();
        break;
      case (direction === 1):
        this.prev();
        break;
      default:
        break;
    }
  }

  mouseScrollHandler(e) {
    const delta = e.wheelDelta;
    inertia.update(delta);
  };

  touchStartHandler(e) {
    this.yDown = e.touches[0].clientY;
  };

  touchEndHandler(e) {
    this.moving = false;
  }

  touchMoveHandler(e) {
    e.preventDefault();
    if (this.moving) return;
    let yUp = e.touches[0].clientY;
    let delta = (this.yDown - yUp);
    if (delta !== 0) {
      this.moving = true;
      this.snap(delta > 0 ? -1 : 1);
    }
    this.yDown = null;
  };

  next() {
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
    const { children } = this.props;
    const { index } = this.state;

    const isArray = Array.isArray(children);

    return isArray
      ? children.map((child, key) => {
        return (
          <Wrapper key={key} className={cx({ [styles.show]: key === index })} >{child}</Wrapper >
        );
      }) : <Wrapper className={styles.show} >{children}</Wrapper >;
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

const mapDispatchToProps = dispatch => ({
  updateFrameIndex: (...props) => dispatch(actions.updateFrameIndex(...props)),
});

export default compose(
  connect(() => ({}), mapDispatchToProps),
)(SnapScroll);
