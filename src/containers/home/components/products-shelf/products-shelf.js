import React from 'react';
import cx from 'classnames';
// import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Button } from '/src/shared';
import camelCase from 'lodash/camelCase';
import styles from './styles.scss';

const ProductsShelf = () => {
  const navigate = e => {
    const { resetFrame } = this.props;
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase().replace(' ', '-');
    hashHistory.push(camelCase(txt));
    resetFrame();
  };

  return (
    <div className={styles.shelf} >
      <section >
        <h2 >Cardiac</h2 >
        <div className={styles.btnGroup} >
          <Button
            color
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            VEST
          </Button >
          <Button
            color
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            VIOLA
          </Button >
        </div >
      </section >
      <section >
        <h2 >Vascular</h2 >
        <div className={styles.btnGroup} >
          <Button
            color
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            Frame
          </Button
          >
          <Button
            color
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            FrameFR
          </Button >
        </div >
      </section >
    </div >
  );
};

ProductsShelf.propTypes = {};

export default ProductsShelf;
