import React, { Fragment } from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import services from '/src/services';
import { SnapScroll } from '/src/shared';
import styles from './styles.scss';

const IndexHeader = ({ index, frame, header, hideIndex, color }) => {
  const forward = frame >= index;

  const resolveSpring = () => {
    return frame !== index
      ? useSpring({
          x: forward ? 30 : -30,
          o: 0
        })
      : useSpring({
          x: 0,
          o: 1
        });
  };

  const { o, x } = resolveSpring();

  return (
    <h2 className={styles.header} style={{ color: color }}>
      {!hideIndex && (
        <Fragment>
          <animated.span
            className={styles.index}
            style={{
              opacity: o,
              transform: x.interpolate((x) => `translateY(${-x}px)`)
            }}
          >
            0{index}
          </animated.span>
          <div
            className={styles.divider}
            style={{
              backgroundColor: color,
              opacity: frame === index ? 1 : 0
            }}
          />
        </Fragment>
      )}
      <animated.span
        className={styles.label}
        style={{
          opacity: o,
          transform: x.interpolate((x) => `translateY(${-x}px)`)
        }}
      >
        {header}
      </animated.span>
    </h2>
  );
};

IndexHeader.propTypes = {
  header: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  hideIndex: PropTypes.bool
};

const mapStateToProps = (state) => ({
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state)
});

const mapDispatchToProps = (dispatch) => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(IndexHeader);
