import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const RatioBox = ({ ratio, className, children, style, image }) => (
  <div className={cx(styles.ratioBox, className)} style={Object.assign({}, {
    paddingTop: `${100 * ratio}%`,
    backgroundImage: image ? `url(${image})` : undefined,
  }, style)}>{children}</div >
);

RatioBox.propTypes = {
  ratio: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  image: PropTypes.string,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(RatioBox);
