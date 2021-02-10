import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import { RatioBox, MediaLoader, Button } from '/src/shared';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import services from '/src/services';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import styles from './styles.scss';

class Splash extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    if (props.src) {
      props.showSplash();
    }
  }

  componentDidMount() {
    this.handleStorage();
    this.didMount = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { src, showSplash } = this.props;
    const storedSrc = store.get('splash-got-it');
    if (src && (src !== prevProps.src || src !== storedSrc)) {
      showSplash();
    }
    this.handleStorage();
  }

  handleStorage() {
    const { src } = this.props;
    const storedSrc = store.get('splash-got-it');
    if (src !== storedSrc) {
      store.set('splash-got-it', '');
    }
  }

  gotIt() {
    const { hideSplash, src } = this.props;
    hideSplash();
    store.set('splash-got-it', src);
  }

  render() {
    const { src, splash } = this.props;
    const show = splash && !store.get('splash-got-it');
    return (
      <Spring
        from={{
          opacity: show ? 0 : 1,
          transform: `translateX(${show ? 100 : 0}%)`
        }}
        to={{
          opacity: show ? 1 : 0,
          transform: `translateX(${show ? 0 : 100}%)`
        }}
        delay={show ? 1500 : 0}
        reset={show}
        immediate={!this.didMount}
      >
        {(springs) => (
          <div className={cx(styles.splash)} style={springs}>
            <RatioBox ratio={1.5} className={styles.art}>
              <MediaLoader src={src} contained />
            </RatioBox>
            <Button
              onClick={this.gotIt}
              withBorder
              className={styles.closeSplashBtn}
            >
              Got it!
            </Button>
          </div>
        )}
      </Spring>
    );
  }
}

Splash.propTypes = {
  src: PropTypes.string,
  splash: PropTypes.bool.isRequired,
  showSplash: PropTypes.func.isRequired,
  hideSplash: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  splash: services.vgs.selectors.splash(state)
});

const mapDispatchToProps = (dispatch) => ({
  showSplash: () => dispatch(services.vgs.actions.showSplash()),
  hideSplash: () => dispatch(services.vgs.actions.hideSplash())
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Splash);
