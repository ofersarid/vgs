import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import Routes from '/src/routes';
import Device from '/src/components/device';
import { toggleFullScreen } from '/src/utils';
import FrameIndicator from './components/frame-indicator';
import styles from './styles.scss';
import logo from './assets/logo_blue.svg';
import vgs from './assets/vgs_blue.svg';
import SideMenu from './components/side-menu';
import Card from './components/card';
import { logoGreen, vgsGreen } from './assets';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      orientation: window.screen.orientation,
    };
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.onOrientationchange, false);
    this.onOrientationchange();
  }

  onOrientationchange() {
    const or = window.screen.orientation;
    let orientation;
    if ((or && or.angle === 0) || window.matchMedia('(orientation: portrait)').matches) {
      orientation = 'portrait';
    } else {
      orientation = 'landscape';
    }
    this.setState({ orientation });
  }

  render() {
    const show = this.props.pathname !== '/product';
    const { isMobile } = this.props;
    const { orientation } = this.state;
    return (
      <Spring
        from={{ opacity: show ? 0 : 1 }}
        to={{ opacity: show ? 1 : 0 }}
      >
        {springs => (orientation === 'landscape' && isMobile) ? <Card
          logo={logoGreen}
          underLogo={vgsGreen}
          address="24 Raul Wallenberg st."
          city="TEL AVIV"
          state="ISRAEL"
          zip={6971921}
          phone="+972 3 549 9054"
        /> : <div className={styles.container} >
          <ReduxRoutes />
          <div className={styles.logo} onClick={toggleFullScreen} >
            <img className={styles.logoImg} src={logo} />
            <img className={styles.logoText} src={vgs} style={springs} />
          </div >
          <SideMenu />
          <FrameIndicator />
          {this.props.children}
        </div >}
      </Spring >
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  pathname: Routes.selectors.pathname(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Main);
