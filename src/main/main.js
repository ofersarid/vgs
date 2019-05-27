import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Device from '/src/components/device/index';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import styles from './styles.scss';
import { websiteMainContainer } from './types';
import logo from './logo.svg';

class Main extends PureComponent {
  render() {
    return (
      <div className={styles.container} >
        <ReduxRoutes />
        <img src={logo} className={styles.logo}/>
        {this.props.children}
      </div >
    );
  }
}

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
});

Main.propTypes = websiteMainContainer;

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Main);
