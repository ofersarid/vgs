import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll } from '/src/components';
import styles from './styles.scss';

const Cover = ({ frame }) => {
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
      className={styles.cover}
      style={{
        opacity: o,
      }}
    >
      <h1 className={styles.header} >
        <div >Frame</div >
        <div >
          EXTERNAL SUPPORT TECHNOLOGHY FOR PERIPHERAL VASCULAR RECONSTRUCTION
        </div >
      </h1 >
      <img src="" style={styles.image} />
    </animated.div >
  );
};

Cover.propTypes = {
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
