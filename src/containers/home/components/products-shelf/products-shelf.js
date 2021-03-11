import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from '/src/shared';
import services from '/src/services';
import { compose } from 'redux';
import { connect } from 'react-redux';
import utils from '/src/utils';
import styles from './styles.scss';

const ProductsShelf = ({ color, data, children }) => {
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
    <Carousel
      displayVolume={resolveVolume()}
      className={styles.shelf}
      color={color}
      navLocation='bottom'
      navClassName={styles.carouselNav}
      prevBtnTxt={utils.isMobile() ? undefined : 'BACK'}
      nextBtnTxt={utils.isMobile() ? undefined : 'MORE'}
    >
      {children}
    </Carousel>
  );
};

ProductsShelf.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.object,
  children: PropTypes.any
};

const mapStateToProps = (state) => ({
  color: services.vgs.selectors.color(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  ProductsShelf
);
