import React from 'react';
import { connect } from 'react-redux';
import Device from '/src/device/index';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import styles from './styles.scss';
import { websiteMainContainer } from './types';

const Main = props => (
  <div className={styles.container} >
    <ReduxRoutes />
    {props.children}
  </div >
);

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

Main.propTypes = websiteMainContainer;

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Main);
