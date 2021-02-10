import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { FadeIn } from '/src/shared';

import styles from './styles.scss';

const MediaLoader = ({ src, cover, className, preferWidth, contained }) => (
  <div className={cx(styles.mediaLoader, className)}>
    <FadeIn spread config='slow'>
      <img
        src={src}
        className={cx(styles.src, { [styles.cover]: cover })}
        style={{
          height: preferWidth ? 'auto' : '100%',
          objectFit: contained ? 'contain' : 'cover'
        }}
      />
    </FadeIn>
  </div>
);

MediaLoader.propTypes = {
  src: PropTypes.string.isRequired,
  cover: PropTypes.bool,
  preferWidth: PropTypes.bool,
  contained: PropTypes.bool,
  className: PropTypes.string
};

export default MediaLoader;
