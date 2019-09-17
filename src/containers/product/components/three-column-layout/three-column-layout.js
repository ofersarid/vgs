import React, { Fragment } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FadeIn, ReadMoreSection } from '/src/shared';
import services from '/src/services';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import Device from '../../../../shared/device';
import { compose } from 'redux';

const ThreeColumnLayout = ({ data, isMobile, color, title, name }) => {
  const renderBullets = (howMany) => {
    return data.slice(0, howMany).map(item => item ? (
      <p key={item} className={styles.listItem} >{item}</p >
    ) : null);
  };

  return (
    <FadeIn spread >
      <section className={cx(styles.content, layout.inner)} >
        <div className={styles.list} >
          <ReadMoreSection
            html={renderBullets(isMobile ? 3 : 6)}
            more={(
              <Fragment >
                <h1 style={{ color }}>{name}</h1>
                <h2 style={{ color }} >{title}</h2 >
                {renderBullets(6)}
              </Fragment >
            )}
            forceShowTrigger
            btnTxt="MORE FEATURES"
          />
        </div >
      </section >
    </FadeIn >
  );
};

ThreeColumnLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
  color: services.vgs.selectors.color(state),
  name: services.products.selectors.name(state),
});

const mapDispatch = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatch),
)(ThreeColumnLayout);
