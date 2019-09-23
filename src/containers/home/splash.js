import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import { RatioBox, MediaLoader, Button } from '/src/shared';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import services from '/src/services';
import styles from './styles.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Splash extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    if (props.src) {
      props.showSplash();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { src, showSplash } = this.props;
    if (src !== prevProps.src) {
      showSplash();
    }
  }

  render() {
    const { src, splash, hideSplash } = this.props;
    return (
      <Spring
        from={{ opacity: splash ? 0 : 1, transform: `translateX(${splash ? 100 : 0}%)` }}
        to={{ opacity: splash ? 1 : 0, transform: `translateX(${splash ? 0 : 100}%)` }}
        delay={splash ? 1500 : 0}
        reset={splash}
      >
        {springs => <div className={cx(styles.splash)} style={springs} >
          <RatioBox ratio={1.5} className={styles.art} >
            <MediaLoader src={src} />
          </RatioBox >
          <Button
            onClick={hideSplash}
            withBorder
            className={styles.closeSplashBtn}
          >
            CLOSE
          </Button >
        </div >}
      </Spring >
    );
  }
}

Splash.propTypes = {
  src: PropTypes.string,
  splash: PropTypes.bool.isRequired,
  showSplash: PropTypes.func.isRequired,
  hideSplash: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  splash: services.vgs.selectors.splash(state),
});

const mapDispatchToProps = (dispatch) => ({
  showSplash: () => dispatch(services.vgs.actions.showSplash()),
  hideSplash: () => dispatch(services.vgs.actions.hideSplash()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Splash);
