import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import styles from './styles.scss';

const Gallery = () => (
  <div className={styles.gallery} >Gallery</div >
);

Gallery.propTypes = {};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
