import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import 'babel-polyfill';
import services from '/src/services';
import styles from './styles.scss';

const Reader = ({ isOpen, content }) => {
  const resolveSpring = () => {
    return useSpring({
      y: isOpen ? 0 : 100,
    });
  };

  const { y } = resolveSpring();

  return (
    <animated.div className={styles.reader} style={{
      transform: y.interpolate(y => `translateY(${y}%)`)
    }} >
      {content}
    </animated.div >
  );
};

Reader.propTypes = {
  content: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isOpen: services.reader.selectors.isOpen(state),
  content: services.reader.selectors.content(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
