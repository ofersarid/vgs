import React from 'react';
import PropTypes from 'prop-types';
import ImageAsync from 'react-image-async';
import cx from 'classnames';

import { FadeIn } from '/src/shared';
import Puff from '/src/assets/puff.svg';

import styles from './styles.scss';

const MediaLoader = ({ src, cover, className }) => (
  <div className={cx(styles.mediaLoader, className)}>
    <ImageAsync src={src} >
      {({ loaded }) => loaded
        ? <FadeIn spread config="slow" ><img src={src} className={cx(styles.src, { [styles.cover]: cover })} /></FadeIn >
        : <img src={Puff} className={styles.activity} />}
    </ImageAsync >
  </div>
);

MediaLoader.propTypes = {
  src: PropTypes.string.isRequired,
  cover: PropTypes.bool,
  className: PropTypes.string,
};

export default MediaLoader;
