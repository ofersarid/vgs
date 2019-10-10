import React from 'react';
import { SnapScroll } from '/src/shared';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import services from '/src/services';
import utils from '/src/utils';
import { Spring, config } from 'react-spring/renderprops';
import R from '/src/assets/R.svg';
import Rechter from '/src/assets/Rechter.svg';
import styles from './styles.scss';

const Footer = ({ isLastFrame, color }) => (
  <Spring
    from={{ opacity: isLastFrame ? 0 : 1, transform: `translateY(${isLastFrame ? '100%' : '0%'})` }}
    to={{ opacity: isLastFrame ? 1 : 0, transform: `translateY(${isLastFrame ? '0%' : '100%'})` }}
    config={config.slow}
    immediate={!isLastFrame}
  >
    {springs => <div style={{
      ...springs,
      background: color,
    }} className={styles.footer} >
      <span >&copy;2019 VGS. Last update, Sep 2019.</span >
      <span className={styles.right}>Produced by
        <img src={utils.isMobile() ? R : Rechter }/>
      </span >
    </div >}
  </Spring >
);

Footer.propTypes = {
  isLastFrame: PropTypes.bool.isRequired,
  color: PropTypes.string,
};

const mapStateToProps = state => ({
  isLastFrame: SnapScroll.selectors.isLastFrame(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Footer);
