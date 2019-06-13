import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import Device from '/src/components/device/index';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import FrameIndicator from './components/frame-indicator';
import styles from './styles.scss';
import { websiteMainContainer } from './types';
import logo from './logo.svg';
import SideMenu from './components/side-menu';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className={styles.container} >
        <ReduxRoutes />
        <div className={styles.logo}>
          <img src={logo} />
        </div>
        <SideMenu />
        <FrameIndicator />
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
