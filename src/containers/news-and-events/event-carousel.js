import React from 'react';
import cx from 'classnames';
import moment from 'moment';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import sortBy from 'lodash/sortBy';
import { Carousel, Button } from '/src/shared';
// import { CalendarEvent } from 'styled-icons/boxicons-regular/CalendarEvent';
import { Megaphone } from 'styled-icons/octicons/Megaphone';
import { GlassCheers } from 'styled-icons/fa-solid/GlassCheers';
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

  const dataSorted = sortBy(data, d => d.date.toDate()).reverse();
  return (
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
          <div className={cx(styles.outerWrapper)} key={item.id} >
            <Button
              className={styles.innerWrapper}
              tag="a"
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              waveColor={color === '#0272BA' ? 'blue' : 'purple'}
            >
              <h3 className={styles.date} >
                {item.type === 'Event' ? <GlassCheers /> : <Megaphone />}
                {moment(item.date.toDate()).format('MMMM Do, YYYY')}
              </h3 >
              <p className={cx('small', styles.header)} style={{ color }} >{item.body}</p >
              <div className={styles.divider} />
              <p className={cx('small', styles.source)} >{item.source}</p >
            </Button >
          </div >
        );
      })}
    </Carousel >
  );
};

EventCarousel.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.array,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EventCarousel);
