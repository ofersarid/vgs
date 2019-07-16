import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import { SnapScroll, ScrollableArea } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';
import Footnotes from '../footnotes/footnotes';

const TwoImagesLayout = ({
  showOnFrame,
  frame,
  image1,
  image2,
  img1SubTitle,
  img2SubTitle,
  footNotes,
  isMobile }) => {
  return (
    <Spring
      from={{ opacity: frame === showOnFrame ? 0 : 1 }}
      to={{ opacity: frame === showOnFrame ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {styleProps => <section className={cx(sharedStyles.inner)} style={{
        opacity: styleProps.opacity,
      }} >
        <ScrollableArea >
          <img src={image1} className={styles.image} />
          <div className={cx(styles.title)} >{img1SubTitle}</div >
          <img src={image2} className={styles.image} />
          <div className={cx(styles.title)} >{img2SubTitle}</div >
          {isMobile && <Footnotes footNotes={footNotes} />}
        </ScrollableArea >
        {!isMobile && <Footnotes footNotes={footNotes} />}
      </section >}
    </Spring >
  );
};

TwoImagesLayout.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  img1SubTitle: PropTypes.string.isRequired,
  img2SubTitle: PropTypes.string.isRequired,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoImagesLayout);
