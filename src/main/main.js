import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring/renderprops';
import ReduxRoutes from '/src/routes/components/redux-routes/redux-routes';
import Routes from '/src/routes';
import FrameIndicator from './components/frame-indicator';
import styles from './styles.scss';
import logo from './logo.svg';
import vgs from './vgs.svg';
import SideMenu from './components/side-menu';

class Main extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const show = this.props.pathname !== '/product';
    return (
      <Spring
        from={{ opacity: show ? 0 : 1 }}
        to={{ opacity: show ? 1 : 0 }}
      >
        {springs => <div className={styles.container} >
          <ReduxRoutes />
          <div className={styles.logo} >
            <img className={styles.logoImg} src={logo} />
            <img className={styles.logoText} src={vgs} style={springs}/>
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
};

const mapStateToProps = state => ({
  pathname: Routes.selectors.pathname(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Main);
