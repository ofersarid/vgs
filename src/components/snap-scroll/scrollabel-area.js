import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import inertia from 'wheel-inertia';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import styles from './styles.scss';
import actions from './actions';
import { SnapScroll } from '../index';

class ScrollableArea extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.$el = React.createRef();
    this.hasOverflow = false;
    this.id = `scroll-area-${props.index}`;
  }

  componentDidMount() {
    this.hasOverflow = this.checkOverflow(this.$el);
    if (this.hasOverflow) {
      this.$el.current.addEventListener('wheel', this.wheelHandler, false);
      inertia.addCallback(() => {});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { frame } = this.props;
    if (frame !== prevProps.frame) {
      const $current = document.getElementById(this.id);
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
    return $current.clientWidth < $current.scrollWidth || $current.clientHeight < $current.scrollHeight;
  }

  handleScrollSnap(e) {
    const { disableScrollSnap } = this.props;
    const $current = document.getElementById(this.id);
    if (this.hasOverflow) {
      if ($current.clientHeight + $current.scrollTop === $current.scrollHeight) {
        // e.preventDefault();
        disableScrollSnap(false, true);
      } else if ($current.scrollTop === 0) {
        // e.preventDefault();
        disableScrollSnap(true, false);
      } else {
        disableScrollSnap(true, true);
      }
    }
  };

  wheelHandler(e) {
    const delta = e.wheelDelta;
    inertia.update(delta);
  };

  render() {
    const { children, className } = this.props;
    return (
      <div
        ref={this.$el}
        id={this.id}
        className={cx(styles.scrollableArea, className)}
        onMouseEnter={this.handleScrollSnap}
        onMouseLeave={this.handleScrollSnap}
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
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableArea);
