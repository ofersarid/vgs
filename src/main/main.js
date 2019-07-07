import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import Routes from '/src/routes';
import Device from '/src/components/device';
import { toggleFullScreen } from '/src/utils';
import services from '/src/services';
import FrameIndicator from './components/frame-indicator';
import styles from './styles.scss';
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
    const angle = window.screen.orientation ? window.screen.orientation.angle : window.orientation;
    this.setState({ orientation: angle === 0 ? 'portrait' : 'landscape' });
  }

  render() {
    const show = this.props.pathname !== '/product';
    const { isMobile, pathname, logo } = this.props;
    const { orientation } = this.state;
    return (
      <Fragment >
        <ReduxRoutes />
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
            <div className={styles.logo} onClick={toggleFullScreen} >
              <img className={styles.logoImg} src={logo} />
              {!['viola', 'frame'].includes(pathname.split('/').pop()) && <img className={styles.logoText} src={vgs} style={springs} />}
            </div >
            <SideMenu />
            <FrameIndicator />
            {this.props.children}
          </div >}
        </Spring >
      </Fragment >
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  logo: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  pathname: Routes.selectors.pathname(state),
  isMobile: Device.selectors.isMobile(state),
  logo: services.products.selectors.logo(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Main);
