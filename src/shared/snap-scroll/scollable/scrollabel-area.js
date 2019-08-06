import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import services from '/src/services';
import styles from './styles.scss';
import actions from '../actions';
import selectors from '../selectors';

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
    this.checkOverflow(this.$el);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { frame, orientation } = this.props;
    const $current = this.$el.current;
    if (frame !== prevProps.frame) {
      $current.scrollTo(0, 0);
    }
    if (orientation !== prevProps.orientation) {
      this.checkOverflow(this.$el);
    }
  }

  componentWillUnmount() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(false, false);
  }

  checkOverflow() {
    const { disableScroll } = this.props;
    const $current = this.$el.current;
    const hasOverflow = disableScroll ? false : $current.clientWidth < $current.scrollWidth || $current.clientHeight < $current.scrollHeight;
    this.setState({ hasOverflow });
    return hasOverflow;
  }

  handleScrollSnap(e) {
    const { disableScrollSnap } = this.props;
    const { hasOverflow } = this.state;
    const $current = e.currentTarget;
    e.stopPropagation();
    if (hasOverflow) {
      if (Math.ceil($current.clientHeight + $current.scrollTop) >= $current.scrollHeight) {
        disableScrollSnap(false, true);
      } else if ($current.scrollTop === 0) {
        disableScrollSnap(true, false);
      } else {
        disableScrollSnap(true, true);
      }
    }
  };

  mouseLeaveHandler() {
    const { disableScrollSnap } = this.props;
    if (this.hasOverflow) {
      disableScrollSnap(false, false);
    }
  }

  render() {
    const { children, className, isMobile, style } = this.props;
    const { hasOverflow } = this.state;
    return (
      <div
        ref={this.$el}
        className={cx(styles.scrollableArea, className, { [styles.hasOverflow]: hasOverflow })}
        onMouseLeave={this.mouseLeaveHandler}
        onTouchStart={this.handleScrollSnap}
        onTouchEnd={this.handleScrollSnap}
        onScroll={(this.hasOverflow && !isMobile) ? this.handleScrollSnap : undefined}
        style={style}
      >{children}</div >
    );
  }
}

ScrollableArea.propTypes = {
  disableScrollSnap: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  frame: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  style: PropTypes.object,
  disableScroll: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
};

ScrollableArea.defaultProps = {
  horizontal: false,
  onSwipe: noop,
  disableScroll: false
};

const mapStateToProps = state => ({
  frame: selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
  orientation: services.vgs.selectors.orientation(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ScrollableArea);
