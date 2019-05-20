import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import inertia from 'wheel-inertia';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import styles from './styles.scss';
import actions from './actions';
import selectors from './selectors';

class ScrollableArea extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.$el = React.createRef();
    this.state = {
      hasOverflow: false,
    };
    this.enable = true;
  }

  componentDidMount() {
    if (this.checkOverflow(this.$el)) {
      this.$el.current.addEventListener('wheel', this.wheelHandler, false);
      inertia.addCallback(() => {
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { frame } = this.props;
    if (frame !== prevProps.frame) {
      const $current = this.$el.current;
      $current.scrollTo(0, 0);
    }
  }

  componentWillUnmount() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(false, false);
    this.$el.current.removeEventListener('wheel', this.wheelHandler);
  }

  checkOverflow() {
    const $current = this.$el.current;
    const hasOverflow = $current.clientWidth < $current.scrollWidth || $current.clientHeight < $current.scrollHeight;
    this.setState({ hasOverflow });
    return hasOverflow;
  }

  handleScrollSnap(e) {
    const { disableScrollSnap } = this.props;
    const { hasOverflow } = this.state;
    const $current = e.currentTarget;
    if (hasOverflow) {
      if ($current.clientHeight + $current.scrollTop === $current.scrollHeight) {
        // e.preventDefault();
        disableScrollSnap(false, true);
      } else if ($current.scrollTop === 0) {
        // e.preventDefault();
        disableScrollSnap(true, false);
      } else {
        disableScrollSnap(true, true);
        e.stopPropagation();
      }
    }
  };

  wheelHandler(e) {
    const delta = e.wheelDelta;
    inertia.update(delta);
  };

  mouseLeaveHandler() {
    const { disableScrollSnap } = this.props;
    if (this.hasOverflow) {
      disableScrollSnap(false, false);
    }
  }

  render() {
    const { children, className } = this.props;
    const { hasOverflow } = this.state;
    return (
      <div
        ref={this.$el}
        className={cx(styles.scrollableArea, className, { [styles.hasOverflow]: hasOverflow })}
        onMouseLeave={this.mouseLeaveHandler}
        onTouchStart={this.handleScrollSnap}
        onTouchEnd={this.handleScrollSnap}
        onScroll={this.hasOverflow ? this.handleScrollSnap : undefined}
      >{children}</div >
    );
  }
}

ScrollableArea.propTypes = {
  disableScrollSnap: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableArea);
