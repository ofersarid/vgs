import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import { SnapScroll, ScrollableArea } from '/src/components/index';
import styles from './styles.scss';

const TwoColumnLayout = ({ index, frame, header, firstLook, article, footNotes }) => {
  const forward = frame >= index;

  const resolveSpring = () => {
    return frame !== index ? useSpring({
      y: forward ? -100 : 100,
      x: forward ? 300 : -300,
      o: 0,
      from: {
        y: 0,
        x: 0,
        o: 1,
      },
    }) : useSpring({
      y: 0,
      x: 0,
      o: 1,
      from: {
        y: forward ? 100 : -100,
        x: forward ? -100 : 100,
        o: 0,
      },
    });
  };

  const { o, x } = resolveSpring();

  return (frame > 0 || !firstLook) ? (
    <div className={styles.twoColumnLayout} >
      <div className={styles.inner} >
        <h2 className={styles.header} >
          <animated.span className={styles.index} style={{
            opacity: o,
            transform: x.interpolate(x => `translateX(${x}%)`),
          }} >0{index}</animated.span >
          <animated.span className={styles.label} style={{
            opacity: o,
            // transform: y.interpolate(y => `translateY(${y}%)`),
          }} >{header}</animated.span >
        </h2 >
        <animated.section className={styles.content} style={{ opacity: o }} >
          <ScrollableArea index={index}>
            <div className={styles.article}>
              {article}
            </div>
            <ol className={styles.footNotes}>
              {footNotes.map((note, i) => <li key={i}>{note}</li>)}
            </ol>
          </ScrollableArea>
        </animated.section>
      </div >
    </div >
  ) : null;
};

TwoColumnLayout.propTypes = {
  header: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  firstLook: PropTypes.bool.isRequired,
  article: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  firstLook: SnapScroll.selectors.firstLook(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
