import React from 'react';
import { Spring } from 'react-spring/renderprops-universal';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const FadeIn = ({ children }) => {
  return (
    <Spring
      from={{ opacity: 0 }}
      to={{ opacity: 1 }}
    >
      {spring => <div
        className={styles.spread}
        style={{
          opacity: spring.opacity,
        }}
      >
        {children}
      </div >}
    </Spring >
  );
};

FadeIn.propTypes = {
  children: PropTypes.any,
};

export default FadeIn;
