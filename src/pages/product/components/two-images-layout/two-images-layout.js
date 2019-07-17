import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import { SnapScroll, ScrollableArea } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const TwoImagesLayout = (
  {
    showOnFrame,
    frame,
    image1,
    image2,
    img1Description,
    img2Description,
    isTouchDevice,
  }) => {
  return (
    <Spring
      from={{ opacity: frame === showOnFrame ? 0 : 1 }}
      to={{ opacity: frame === showOnFrame ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {styleProps => <section className={cx(styles.inner, sharedStyles.inner)} style={{
        opacity: styleProps.opacity,
      }} >
        <ScrollableArea className={styles.content} >
          <div className={styles.container} >
            {isTouchDevice
              ? <img src={image1} className={styles.image} />
              : <div className={styles.image} style={{ backgroundImage: `url(${image1})` }} />
            }
            <div className={cx(styles.title)} >{img1Description}</div >
          </div >
          {isTouchDevice ? null : <div className={styles.spacer}/>}
          <div className={styles.container} >
            {isTouchDevice
              ? <img src={image2} className={styles.image} />
              : <div className={styles.image} style={{ backgroundImage: `url(${image2})` }} />
            }
            <div className={cx(styles.bottom, styles.title)} >{img2Description}</div >
          </div >
        </ScrollableArea >
      </section >}
    </Spring >
  );
};

TwoImagesLayout.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  img1Description: PropTypes.string.isRequired,
  img2Description: PropTypes.string.isRequired,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoImagesLayout);
