import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';
import { FadeIn, MediaLoader, RatioBox, Carousel } from '/src/shared';
import utils from '/src/utils';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

const TwoImagesLayout = ({ pics, color }) => {
  const resolveVolume = () => {
    switch (true) {
      case utils.isMobile():
        return 1;
      default:
        return 2;
    }
  };

  return (
    <FadeIn className={cx(layout.inner, styles.inner)}>
      <Carousel
        displayVolume={resolveVolume()}
        className={styles.carousel}
        color={color}
        navLocation='bottom'
      >
        {pics
          .filter((pic) => pic.pic !== undefined)
          .map((pic) => (
            <div key={pic.pic} className={styles.itemWrapper}>
              <RatioBox ratio={2 / 3} className={styles.container}>
                <MediaLoader src={pic.pic} />
              </RatioBox>
              <LinesEllipsisLoose
                text={pic.desc}
                maxLine='4'
                lineHeight='1.5em'
                className={cx('caption', styles.caption)}
              />
            </div>
          ))}
      </Carousel>
    </FadeIn>
  );
};

TwoImagesLayout.propTypes = {
  color: PropTypes.string.isRequired,
  pics: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TwoImagesLayout;
