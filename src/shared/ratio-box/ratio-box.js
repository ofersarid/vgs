import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { compose } from 'redux';
import { connect } from 'react-redux';
import services from '/src/services';
import styles from './styles.scss';

class RatioBox extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.box = React.createRef();
  }

  componentDidMount() {
    this.calculate();
    window.addEventListener('resize', this.calculate);
  }

  calculate() {
    const { ratio } = this.props;
    const width = this.box.current.offsetWidth;
    const height = width * ratio;
    this.box.current.style.height = `${height}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculate);
  }

  render() {
    const { className, children, style } = this.props;
    return (
      <div
        ref={this.box}
        className={cx(styles.ratioBox, className)}
        style={style} >{children}</div >
    );
  }
}

RatioBox.propTypes = {
  ratio: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  orientation: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orientation: services.device.selectors.orientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RatioBox);
