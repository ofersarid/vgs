import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import services from '/src/services';
import Device from '/src/shared/device';
import { SnapScroll } from '/src/shared';
import styles from './styles.scss';

const IndexHeader = ({ index, frame, header, isMobile, color }) => {
  const forward = frame >= index;

  const resolveSpring = () => {
    return frame !== index ? useSpring({
      x: forward ? 300 : -300,
      o: 0,
    }) : useSpring({
      x: 0,
      o: 1,
    });
  };

  const { o, x } = resolveSpring();

  return (
    <h2 className={styles.header} style={{ color: color }}>
      <animated.span className={styles.index} style={{
        opacity: o,
        transform: isMobile ? x.interpolate(x => `translateX(${x}%)`) : x.interpolate(x => `translateY(${-x}%)`),
      }} >0{index + 1}</animated.span >
      <animated.span className={styles.label} style={{
        opacity: o,
      }} >
        <animated.span className={styles.divider} style={{
          opacity: o,
          backgroundColor: color,
        }} />
        {header}
      </animated.span >
    </h2 >
  );
};

IndexHeader.propTypes = {
  header: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
  color: services.products.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(IndexHeader);
