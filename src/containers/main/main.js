import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import Routes from '/src/routes';
import Reader from '/src/services/reader/reader';
import { hashHistory } from 'react-router';
import services from '/src/services';
import utils from '/src/utils';
import cx from 'classnames';
import { Button } from '/src/shared';
import { logoGreen, vgsGreen } from './assets';
import FrameIndicator from './frame-indicator';
import Footer from './footer';
import styles from './styles.scss';
import vgs from './assets/vgs_blue.svg';
import SideMenu from './side-menu';
import Card from './card';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    props.setColor('#005728');
  }

  componentDidMount() {
    const { disableBizCard } = this.props;
    window.addEventListener(
      'orientationchange',
      this.onOrientationchange,
      false
    );
    this.onOrientationchange();
    if (utils.isDesktop() || utils.isWideScreen()) {
      disableBizCard();
    }
  }

  onOrientationchange() {
    const { setOrientation } = this.props;
    const angle = window.screen.orientation
      ? window.screen.orientation.angle
      : window.orientation;
    setOrientation(angle === 0 ? 'portrait' : 'landscape');
  }

  goToHome() {
    hashHistory.push('home/0');
  }

  render() {
    const show = this.props.pathname !== '/product';
    const {
      pathname,
      logo,
      bizCard,
      orientation,
      isDesktop,
      children
    } = this.props;
    return (
      <Fragment>
        <ReduxRoutes>
          {bizCard && orientation === 'landscape' ? (
            <Card
              logo={logoGreen}
              underLogo={vgsGreen}
              address='24 Raul Wallenberg st.'
              city='TEL AVIV'
              state='ISRAEL'
              zip={6971921}
              phone='+972 3 549 9054'
            />
          ) : (
            <div className={styles.container}>
              {orientation === 'landscape' && !isDesktop ? null : (
                <Fragment>
                  <Button
                    waveColor='gray'
                    className={cx(styles.logo)}
                    tag='a'
                    onClick={this.goToHome}
                    target='_blank'
                  >
                    <img className={styles.logoImg} src={logo} />
                    {!['viola', 'frame', 'vest', 'frameFr'].includes(
                      pathname.split('/')[0]
                    ) &&
                      show && <img className={styles.logoText} src={vgs} />}
                  </Button>
                </Fragment>
              )}
              {orientation === 'landscape' && !isDesktop ? null : <SideMenu />}
              {orientation === 'landscape' && !isDesktop ? null : (
                <FrameIndicator />
              )}
              {children}
              <Footer />
            </div>
          )}
        </ReduxRoutes>
        <Reader />
      </Fragment>
    );
  }
}

Main.propTypes = {
  children: PropTypes.any,
  pathname: PropTypes.string,
  isDesktop: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  resourceList: PropTypes.shape({
    collections: PropTypes.arrayOf(PropTypes.string).isRequired,
    pages: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  bizCard: PropTypes.bool.isRequired,
  setOrientation: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  setColor: PropTypes.func.isRequired,
  disableBizCard: PropTypes.func.isRequired
};

Main.defaultProps = {
  logo: logoGreen
};

const mapStateToProps = (state) => ({
  pathname: Routes.selectors.pathname(state),
  isDesktop: services.device.selectors.type(state) === 'desktop',
  logo: services.products.selectors.logo(state),
  resourceList: services.reactor.selectors.resourceList(state),
  bizCard: services.vgs.selectors.bizCard(state),
  orientation: services.vgs.selectors.orientation(state)
});

const mapDispatchToProps = (dispatch) => ({
  setOrientation: (orientation) =>
    dispatch(services.vgs.actions.setOrientation(orientation)),
  setColor: (color) => dispatch(services.vgs.actions.setColor(color)),
  disableBizCard: () => dispatch(services.vgs.actions.disableBizCard())
});

export default compose(
  services.device.HOC,
  connect(mapStateToProps, mapDispatchToProps),
  services.reactor.connect
)(Main);
