import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Button } from '/src/shared';
import camelCase from 'lodash/camelCase';
import styles from './styles.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import services from '../../../../services';

const ProductsShelf = ({ updateLastFrame }) => {
  const navigate = e => {
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase().replace(' ', '-');
    const CCtext = camelCase(txt);
    hashHistory.push(CCtext);
    updateLastFrame(0, CCtext);
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
  updateLastFrame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductsShelf);
