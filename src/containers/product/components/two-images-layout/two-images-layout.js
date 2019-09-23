import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FadeIn, MediaLoader, RatioBox, Carousel } from '/src/shared';
import utils from '/src/utils';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

const TwoImagesLayout = ({ image1, image2, img1Description, img2Description, color }) => {
  const resolveVolume = () => {
    switch (true) {
      case utils.isMobile():
        return 1;
      case utils.isTablet():
        return 2;
      default:
        return 3;
    }
  };

  return (
    <FadeIn spread >
      <section className={cx(layout.inner, styles.inner)} >
        {utils.isMobile() ? (
          <Carousel
            displayVolume={resolveVolume()}
            className={styles.carousel}
            color={color}
            navLocation="bottom"
          >
            <RatioBox ratio={2 / 3} className={styles.container} >
              <MediaLoader src={image1} />
              <div className={cx('caption', styles.caption)} >{img1Description}</div >
            </RatioBox >
            <RatioBox ratio={2 / 3} className={styles.container} >
              <MediaLoader src={image2} />
              <div className={cx('caption', styles.caption)} >{img2Description}</div >
            </RatioBox >
          </Carousel >
        ) : (
          <Fragment >
            <RatioBox ratio={2 / 3} className={styles.container} >
              <MediaLoader src={image1} />
              <div className={cx('caption', styles.caption)} >{img1Description}</div >
            </RatioBox >
            <RatioBox ratio={2 / 3} className={styles.container} >
              <MediaLoader src={image2} />
              <div className={cx('caption', styles.caption)} >{img2Description}</div >
            </RatioBox >
          </Fragment >
        )}
      </section >
    </FadeIn >
  );
};

TwoImagesLayout.propTypes = {
  image1: PropTypes.string.isRequired,
  image2: PropTypes.string.isRequired,
  img1Description: PropTypes.string,
  img2Description: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string.isRequired,
};

export default TwoImagesLayout;
