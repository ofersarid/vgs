import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import cx from 'classnames';
import ReadMoreSection from '../read-more-section/read-more-section';
import PropTypes from 'prop-types';
import services from '/src/services';
import styles from './styles.scss';

const Terms = ({ color, logo, data, btnTxt, txtColor, btnClass }) => data ? (
  <ReadMoreSection
    forceShowTrigger
    more={(
      <div className={styles.policyContainer} >
        <div className={styles.innerContent} >
          <h1 style={{ color }} >PRIVACY POLICY</h1 >
          <div dangerouslySetInnerHTML={{ __html: data.terms.replace(/\n\r?/g, '<br />') }} />
        </div >
        <div className={styles.leftCol} >
          <div style={{ color }} className={styles.header} >Privacy<br />Policy</div >
          <img className={styles.logoImg} src={logo} />
        </div >
      </div >
    )}
    btnTxt={btnTxt}
    btnTxtColor={txtColor}
    btnClass={cx(styles.policy, btnClass)}
  />
) : null;

Terms.propTypes = {
  color: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
  data: PropTypes.object,
  btnTxt: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  txtColor: PropTypes.string,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
  logo: services.products.selectors.logo(state),
  data: services.reactor.selectors.pageData(state, 'privacy policy'),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Terms);
