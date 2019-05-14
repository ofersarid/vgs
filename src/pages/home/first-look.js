import React from 'react';
import { connect } from 'react-redux';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { SnapScroll } from '/src/components/index';
import styles from './styles.scss';

const FirstLook = ({ frame }) => {
  const forward = frame === 0;

  const resolveSpring = () => {
    return forward ? useSpring({
      o: 1,
      from: {
        o: 0,
      },
    }) : useSpring({
      o: 0,
      from: {
        o: 1,
      },
    });
  };

  const { o } = resolveSpring();

  return (
    <animated.div
      className={styles.firstLook}
      style={{
        opacity: o,
      }}
    >
      <h1>FirstLook</h1>
    </animated.div >
  );
};

FirstLook.propTypes = {
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(FirstLook);
