import React from 'react';
import { SnapScroll } from '/src/shared';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import services from '/src/services';
import utils from '/src/utils';
import cx from 'classnames';
import R from '/src/assets/R.svg';
import Rechter from '/src/assets/Rechter.svg';
import styles from './styles.scss';

const Footer = ({ isLastFrame, color, footerData }) => (
  <div
    style={{ background: color }}
    className={cx(styles.footer, { [styles.show]: isLastFrame })}
  >
    <span>{footerData ? footerData.copyRight : ''}</span>
    <span className={styles.right}>
      Produced by
      <img src={utils.isMobile() ? R : Rechter} />
    </span>
  </div>
);

Footer.propTypes = {
  isLastFrame: PropTypes.bool.isRequired,
  color: PropTypes.string,
  footerData: PropTypes.any
};

const mapStateToProps = (state) => ({
  isLastFrame: SnapScroll.selectors.isLastFrame(state),
  color: services.vgs.selectors.color(state),
  footerData: services.reactor.selectors.pageData(state, 'footer')
});

const mapDispatchToProps = (dispatch) => ({}); // eslint-disable-line

export default compose(connect(mapStateToProps, mapDispatchToProps))(Footer);
