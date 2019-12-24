import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import layout from '/src/shared/styles/layout.scss';
import { Carousel, FadeIn, Button } from '/src/shared';
import services from '/src/services';
import JSON5 from 'json5';
import { AtSign } from 'styled-icons/feather/AtSign';
import { Globe } from 'styled-icons/feather/Globe';
import { MapPin } from 'styled-icons/feather/MapPin';
import styles from './styles.scss';
import utils from '../../utils';

const HeadOffice = ({ data, color }) => {
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

  return data ? (
    <FadeIn className={cx({ [layout.inner]: utils.isMobile(), [styles.inner]: utils.isMobile() })} >
      <Carousel
        displayVolume={resolveVolume()}
        className={styles.carousel}
        color={color}
        navLocation="bottom"
        prevBtnTxt={utils.isMobile() ? undefined : 'BACK'}
        nextBtnTxt={utils.isMobile() ? undefined : 'MORE'}
      >
        {data.map(item => (
          <div className={styles.item} key={item.distributor} >
            <div className={styles.itemInner} >
              <p className={styles.country} >{item.country}</p >
              <p className={styles.products} >{JSON5.parse(item.products).reduce((reuduced, itm) => {
                if (itm.active) {
                  reuduced.push(itm.view);
                }
                return reuduced;
              }, []).join(' | ')}</p >
              <p >{item.distributor}</p >
              <p >{item.phone}</p >
              <section className={styles.btns} >
                {item.email && (<Button
                  tag="a"
                  withBorder
                  target="_blank"
                  href={`mailto:${item.email}`}
                >
                  <AtSign />
                </Button >)}
                {item.link && (<Button
                  tag="a"
                  withBorder
                  target="_blank"
                  href={item.link}
                >
                  <Globe />
                </Button >)}
                {item.googleLocation && (<Button
                  tag="a"
                  withBorder
                  target="_blank"
                  href={item.googleLocation}
                >
                  <MapPin />
                </Button >)}
              </section >
            </div >
          </div >
        ))}
      </Carousel >
    </FadeIn >
  ) : null;
};

HeadOffice.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.array,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(HeadOffice);
