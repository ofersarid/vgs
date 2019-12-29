import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import layout from '/src/shared/styles/layout.scss';
import { Carousel, FadeIn, Button } from '/src/shared';
import services from '/src/services';
import styles from './styles.scss';
import utils from '../../utils';

const EventCarousel = ({ data, color }) => {
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

  const dataSorted = sortBy(data, d => d.date.toDate());
  return (
    <FadeIn className={cx({ [layout.inner]: utils.isMobile(), [styles.inner]: utils.isMobile() })} >
      <Carousel
        displayVolume={resolveVolume()}
        className={styles.carousel}
        color={color}
        navLocation="bottom"
        prevBtnTxt={utils.isMobile() ? undefined : 'BACK'}
        nextBtnTxt={utils.isMobile() ? undefined : 'MORE'}
      >
        {dataSorted.map(item => {
          return (
            <div className={cx(styles.outerWrapper)} key={item.link} >
              <Button
                className={styles.innerWrapper}
                tag="a"
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
                waveColor={color === '#0272BA' ? 'blue' : 'purple'}
              >
                <h3 className={styles.date} >{moment(item.date.toDate()).format('MMMM Do, YYYY')}</h3 >
                <p className={cx('small', styles.header)} style={{ color }} >{item.body}</p >
                <div className={styles.divider} />
                <p className={cx('small', styles.source)} >{item.source}</p >
              </Button >
            </div >
          );
        })}
      </Carousel >
    </FadeIn >
  );
};

EventCarousel.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.array,
};

EventCarousel.defaultProps = {
  data: [],
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventCarousel);
