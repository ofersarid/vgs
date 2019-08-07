import React from 'react';
import { Spring } from 'react-spring/renderprops-universal';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const FadeInOut = ({ children, show, className }) => {
  return (
    <Spring
      from={{ opacity: show ? 0 : 1 }}
      to={{ opacity: show ? 1 : 0 }}
    >
      {spring => <div
        className={cx(styles.spread, className)}
        style={{
          opacity: spring.opacity,
        }}
      >
        {children}
      </div >}
    </Spring >
  );
};

FadeInOut.propTypes = {
  children: PropTypes.any.isRequired,
  show: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

export default FadeInOut;
