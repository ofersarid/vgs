import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import { SnapScroll } from '/src/components/index';
import styles from './styles.scss';
// import spring from './spring-config';

const TwoColumnLayout = ({ index, frame, header }) => {
  const forward = frame > index;

  const resolveSpring = () => {
    return frame !== index ? useSpring({
      y: forward ? -100 : 100,
      o: 0,
      from: {
        y: 0,
        o: 1,
      },
    }) : useSpring({
      y: 0,
      o: 1,
      from: {
        y: forward ? 100 : -100,
        o: 0,
      },
    });
  };

  const { o, y } = resolveSpring();

  return (
    <div className={styles.twoColumnLayout} >
      <div className={styles.inner} >
        <animated.h1 className={styles.header} style={{
          opacity: o,
          transform: y.interpolate(y => `translateY(${y}%)`),
        }} >{header}</animated.h1 >
      </div >
    </div >
  );
};

TwoColumnLayout.propTypes = {
  header: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  prevFrame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
