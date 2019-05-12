import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import styles from './styles.scss';

const TwoColumnLayout = ({ header, enter, exit }) => (
  <div className={styles.twoColumnLayout} >
    <div className={styles.inner}>
      <h1 className={cx(styles.header, { [styles.enter]: enter, [styles.exit]: exit })}>{header}</h1>
    </div>
  </div >
);

TwoColumnLayout.propTypes = {
  header: PropTypes.string.isRequired,
  enter: PropTypes.bool.isRequired,
  exit: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
