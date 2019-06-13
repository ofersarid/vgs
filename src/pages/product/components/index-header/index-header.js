import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import { SnapScroll } from '/src/components';
import styles from './styles.scss';

const IndexHeader = ({ index, frame, header, isMobile }) => {
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
    <h2 className={styles.header} >
      <animated.span className={styles.index} style={{
        opacity: o,
        transform: isMobile ? x.interpolate(x => `translateX(${x}%)`) : x.interpolate(x => `translateY(${-x}%)`),
      }} >0{index}</animated.span >
      <animated.span className={styles.label} style={{
        opacity: o,
      }} >
        <animated.span className={styles.divider} style={{
          opacity: o,
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
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(IndexHeader);
