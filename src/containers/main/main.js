import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import Routes from '/src/routes';
import Device from '/src/shared/device';
import { hashHistory } from 'react-router';
import services from '/src/services';
import FrameIndicator from './components/frame-indicator';
import styles from './styles.scss';
import vgs from './assets/vgs_blue.svg';
import SideMenu from './components/side-menu';
import Card from './components/card';
import { logoGreen, vgsGreen } from './assets';
import cx from 'classnames';
import { Button } from '/src/shared';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    props.setColor('#005728');
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.onOrientationchange, false);
    this.onOrientationchange();
  }

  onOrientationchange() {
    const { setOrientation } = this.props;
    const angle = window.screen.orientation ? window.screen.orientation.angle : window.orientation;
    setOrientation(angle === 0 ? 'portrait' : 'landscape');
  }

  goToHome() {
    hashHistory.push('home');
  }

  resolveWaveColor() {
    const { color } = this.props;
    if (!color) {
      return 'gray';
    }
    switch (color.toLowerCase()) {
      case '#0272ba':
        return 'blue';
      case '#662d91':
        return 'purple';
      default:
        return 'gray';
    }
  }

  render() {
    const show = this.props.pathname !== '/product';
    const { isMobile, pathname, logo, bizCard, orientation } = this.props;

    return (
      <Fragment >
        <Device />
        <ReduxRoutes >
          <Spring
            from={{ opacity: show ? 0 : 1 }}
            to={{ opacity: show ? 1 : 0 }}
          >
            {springs => (bizCard && orientation === 'landscape' && isMobile) ? <Card
              logo={logoGreen}
              underLogo={vgsGreen}
              address="24 Raul Wallenberg st."
              city="TEL AVIV"
              state="ISRAEL"
              zip={6971921}
              phone="+972 3 549 9054"
            /> : <div className={styles.container} >
              {(orientation === 'landscape' && isMobile)
                ? null
                : (
                  <Fragment>
                    <Button
                      waveColor="gray"
                      className={cx(styles.logo)}
                      tag="a"
                      onClick={this.goToHome}
                      target="_blank"
                    >
                      <img className={styles.logoImg} src={logo} />
                    </Button >
                    {!['viola', 'frame'].includes(pathname.split('/').pop()) &&
                    <img className={styles.logoText} src={vgs} style={springs} />}
                  </Fragment>
                )}
              {(orientation === 'landscape' && isMobile) ? null : <SideMenu />}
              {(orientation === 'landscape' && isMobile) ? null : <FrameIndicator />}
              {this.props.children}
            </div >}
          </Spring >
        </ReduxRoutes >
      </Fragment >
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string,
  color: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  resourceList: PropTypes.shape({
    collections: PropTypes.arrayOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
  bizCard: PropTypes.bool.isRequired,
  setOrientation: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  setColor: PropTypes.func.isRequired,
};

Main.defaultProps = {
  logo: logoGreen,
};

const mapStateToProps = state => ({
  pathname: Routes.selectors.pathname(state),
  isMobile: Device.selectors.isMobile(state),
  logo: services.products.selectors.logo(state),
  resourceList: services.reactor.selectors.resourceList(state),
  bizCard: services.vgs.selectors.bizCard(state),
  orientation: services.vgs.selectors.orientation(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  setOrientation: orientation => dispatch(services.vgs.actions.setOrientation(orientation)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  services.reactor.connect,
)(Main);