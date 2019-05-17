import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import styles from './styles.scss';
import actions from './actions';

class ScrollableArea extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.$el = React.createRef();
    this.hasOverflow = false;
  }

  componentDidMount() {
    this.hasOverflow = this.checkOverflow(this.$el);
    if (this.hasOverflow) {
      this.$el.current.addEventListener('scroll', this.handleScrollSnap);
    }
  }

  componentWillUnmount() {
    const { disableScrollSnap } = this.props;
    disableScrollSnap(false, false);
    this.$el.current.removeEventListener('scroll', this.handleScrollSnap);
  }

  checkOverflow() {
    const $current = this.$el.current;
    return $current.clientWidth < $current.scrollWidth || $current.clientHeight < $current.scrollHeight;
  }

  handleScrollSnap(e) {
    const { disableScrollSnap } = this.props;
    const $current = this.$el.current;
    if (this.hasOverflow) {
      if ($current.clientHeight + $current.scrollTop === $current.scrollHeight) {
        e.preventDefault();
        disableScrollSnap(false, true);
      } else if ($current.scrollTop === 0) {
        e.preventDefault();
        disableScrollSnap(true, false);
      } else {
        disableScrollSnap(true, true);
      }
    }
  };

  render() {
    const { children, className } = this.props;
    return (
      <div
        ref={this.$el}
        className={cx(styles.scrollableArea, className)}
        onMouseEnter={this.handleScrollSnap}
        onMouseLeave={this.handleScrollSnap}
        onTouchStart={this.handleScrollSnap}
        onTouchEnd={this.handleScrollSnap}
      >{children}</div >
    );
  }
}

ScrollableArea.propTypes = {
  disableScrollSnap: PropTypes.func.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(actions.disable(...props)),
});

export default connect(() => ({}), mapDispatchToProps)(ScrollableArea);
