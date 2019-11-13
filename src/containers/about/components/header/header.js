import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import services from '/src/services';
import { SnapScroll } from '/src/shared';
import styles from './styles.scss';

const Header = ({ index, frame, text, isMobile }) => {
  const forward = frame >= index;

  const resolveSpring = () => {
    return frame !== index ? useSpring({
      x: forward ? 30 : -30,
      o: 0,
    }) : useSpring({
      x: 0,
      o: 1,
    });
  };

  const { o, x } = resolveSpring();

  return (
    <h2 className={styles.header} >
      <animated.span className={styles.label} style={{
        opacity: o,
        transform: isMobile ? x.interpolate(x => `translateX(${-x}px)`) : x.interpolate(x => `translateY(${x}px)`),
      }} >
        {text}
      </animated.span >
    </h2 >
  );
};

Header.propTypes = {
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isMobile: services.device.selectors.type(state) === 'mobile',
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Header);
