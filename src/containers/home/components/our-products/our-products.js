import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import { FadeIn } from '/src/shared';
import cx from 'classnames';
import layout from '/src/shared/styles/layout.scss';
import artTablet from '/src/assets/home_products_art_mobile.svg';
import artDesktop from '/src/assets/home_products_art_desktop.svg';
import { hashHistory } from 'react-router';
import ProductsShelf from '../products-shelf/products-shelf';
import styles from './styles.scss';

class OurProducts extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  goToProductsCarousel() {
    hashHistory.push('our-products');
  }

  resolveArt() {
    const { isTouchDevice } = this.props;
    if (isTouchDevice) {
      return artTablet;
    } else {
      return artDesktop;
    }
  }

  render() {
    const { text } = this.props;
    return (
      <FadeIn spread >
        <img src={this.resolveArt()} className={styles.art} />
        <div className={cx(styles.ourProducts, layout.inner)} >
          <div
            className={styles.text}
            dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
          />
          <ProductsShelf />
        </div >
      </FadeIn >
    );
  }
}

OurProducts.propTypes = {
  text: PropTypes.string.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isTouchDevice: Device.selectors.isTouchDevice(state),
}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(OurProducts);
