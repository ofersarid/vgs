import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FadeIn, MediaLoader, RatioBox } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

const TwoImagesLayout = (
  {
    image1,
    image2,
    img1Description,
    img2Description,
  }) => {
  return (
    <FadeIn spread >
      <section className={cx(layout.inner, styles.inner)} >
        <RatioBox ratio={2 / 3} className={styles.container} >
          <MediaLoader src={image1} />
          <div className={cx('caption', styles.caption)} >{img1Description}</div >
        </RatioBox>
        {/*{isTouchDevice ? null : <div className={styles.spacer}/>}*/}
        <RatioBox ratio={2 / 3} className={styles.container} >
          <MediaLoader src={image2} />
          <div className={cx('caption', styles.caption)} >{img2Description}</div >
        </RatioBox >
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
};

export default TwoImagesLayout;
