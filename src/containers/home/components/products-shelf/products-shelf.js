import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Button, SnapScroll } from '/src/shared';
import camelCase from 'lodash/camelCase';
import styles from './styles.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ProductsShelf = ({ resetFrame }) => {
  const navigate = e => {
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
            textColor="white"
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            VEST
          </Button >
          <Button
            textColor="white"
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
            textColor="white"
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            FRAME
          </Button
          >
          <Button
            textColor="white"
            waveColor="white"
            className={cx(styles.productBtn)}
            onClick={navigate}
          >
            FRAME FR
          </Button >
        </div >
      </section >
    </div >
  );
};

ProductsShelf.propTypes = {
  resetFrame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductsShelf);
