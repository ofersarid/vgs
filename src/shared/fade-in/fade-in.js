import React from 'react';
import cx from 'classnames';
import { Spring, config as conf } from 'react-spring/renderprops-universal';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const FadeIn = ({ children, slideFrom, spread, className, config }) => {
  const resolveOrientation = () => {
    switch (slideFrom) {
      case 'right':
      case 'left':
      default:
        return 'X';
    }
  };
  return (
    <Spring
      from={{ opacity: 0, x: slideFrom ? 10 : 0 }}
      to={{ opacity: 1, x: 0 }}
      config={conf[config]}
    >
      {spring => <div
        className={cx(className, { [styles.spread]: spread })}
        style={{
          opacity: spring.opacity,
          transform: `translate${resolveOrientation()}(${slideFrom === 'left' ? '-' : ''}${spring.x}%)`,
        }}
      >
        {children}
      </div >}
    </Spring >
  );
};

FadeIn.propTypes = {
  children: PropTypes.any,
  slideFrom: PropTypes.oneOfType(['right', 'left']),
  spread: PropTypes.bool,
  className: PropTypes.string,
  config: PropTypes.oneOf(['default', 'slow', 'gentle', 'wobbly', 'stiff', 'slow', 'molasses']),
};

FadeIn.defaultProps = {
  spread: false,
  config: 'default',
};

export default FadeIn;
