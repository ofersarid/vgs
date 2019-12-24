import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const FadeIn = ({ children, spread, className }) => {
  return (
    <div className={cx(styles.fadeIn, className, { [styles.spread]: spread })} >
      {children}
    </div >
  );
};

FadeIn.propTypes = {
  children: PropTypes.any,
  spread: PropTypes.bool,
  className: PropTypes.string,
};

FadeIn.defaultProps = {
  spread: false,
};

export default FadeIn;
