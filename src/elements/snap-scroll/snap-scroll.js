import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import inertia from 'wheel-inertia';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import actions from './actions';

import './styles.scss';

const DIRECTION = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
};

const TRANSITIONS = [
  'move-top-bottom',
  'move-top-bottom-stagger',
  'scale-down-top-bottom',
  'scale-down-up',
  'fold-top-bottom',
  'cube-top-bottom'
];

const Wrapper = ({ children }) => (
  <div className="wrapper" >
    <div className="inner" >
      {children}
    </div >
  </div >
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
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
      transition: PropTypes.oneOf(TRANSITIONS),
      orientation: PropTypes.oneOf(['vertical', 'horizontal']),
      customTransition: PropTypes.string,
      customDuration: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
      start: 0,
      indexChanged: f => f,
      transition: TRANSITIONS[0],
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
    this.timer = null;
    inertia.addCallback(this.snap);
  }

  componentDidMount() {
    this.$node.addEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.addEventListener('touchstart', this.touchStartHandler, false);
    this.$node.addEventListener('touchmove', this.touchMoveHandler, false);

    // Fire initial indexChanged();
    this.props.indexChanged(this.state.index);
    this.props.updateFrameIndex(this.state.index);
  }

  componentWillUnmount() {
    this.$node.removeEventListener('wheel', this.mouseScrollHandler, false);
    this.$node.removeEventListener('touchstart', this.touchStartHandler, false);
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
    this.xDown = e.touches[0].clientX;
    this.yDown = e.touches[0].clientY;
  };

  touchMoveHandler(e) {
    e.preventDefault();
    let xUp = e.touches[0].clientX;
    let delta = (this.xDown - xUp);
    inertia.update(delta);
    this.xDown = null;
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

    const isArray = Array.isArray(children);

    return isArray
      ? children.map((child, key) => {
        return (
          <Wrapper key={key} >{child}</Wrapper >
        );
      }) : <Wrapper >{children}</Wrapper >;
  }

  render() {
    return (
      <div className="snap-scroll" ref={el => {
        this.$node = el;
      }} >
        {this.renderPages()}
      </div >
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateFrameIndex: (...props) => dispatch(actions.updateFrameIndex(...props)),
});

export default compose(
  connect(() => ({}), mapDispatchToProps),
  // firestoreConnect(() => ([{
  //   collection: 'collections',
  //   doc: 'xB6QKYKm7tnXl2QNjjfF',
  //   subcollections: [{
  //     collection: 'data',
  //     // where: [['active', '==', true]],
  //     // orderBy: ['name', 'desc'],
  //   }],
  // }])),
)(SnapScroll);
