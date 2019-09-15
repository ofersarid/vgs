import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FadeIn } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const TwoImagesLayout = (
  {
    image1,
    image2,
    img1Description,
    img2Description,
  }) => {
  return (
    <FadeIn spread >
      <section className={cx(styles.inner, sharedStyles.inner)} >
        <div className={styles.container} >
          <img src={image1} className={styles.image} />
          <div className={cx('caption')} >{img1Description}</div >
        </div >
        {/*{isTouchDevice ? null : <div className={styles.spacer}/>}*/}
        <div className={styles.container} >
          <img src={image2} className={styles.image} />
          <div className={cx('caption')} >{img2Description}</div >
        </div >
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
