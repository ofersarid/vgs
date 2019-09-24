import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { connect } from 'react-redux';
import 'babel-polyfill';
import services from '/src/services';
import styles from './styles.scss';
import cx from 'classnames';
import { Button } from '/src/shared';

const Reader = ({ isOpen, content, close, color }) => {
  const resolveSpring = () => {
    return useSpring({
      y: isOpen ? 0 : 100,
    });
  };

  const { y } = resolveSpring();

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollTop = 0;
  }, []);

  if (isOpen && ref.current.scrollTop) {
    ref.current.scrollTop = 0;
  }

  return (
    <animated.div className={styles.reader} style={{
      transform: y.interpolate(y => `translateY(${y}%)`)
    }} >
      <div className={styles.content} ref={ref} >
        {content}
      </div>
      <Button
        className={cx(styles.closeBtn)}
        onClick={() => {
          close();
        }}
        style={{
          background: color,
        }}
      >
        BACK
      </Button >
    </animated.div >
  );
};

Reader.propTypes = {
  content: PropTypes.any,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isOpen: services.reader.selectors.isOpen(state),
  content: services.reader.selectors.content(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(services.reader.actions.close()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reader);
