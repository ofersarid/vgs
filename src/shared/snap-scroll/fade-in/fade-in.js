import React from 'react';
import { compose } from 'redux';
import { Spring } from 'react-spring/renderprops-universal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SnapScroll } from '/src/shared';
import styles from './styles.scss';

const FadeIn = ({ frame, showOnFrame, children }) => {
  const forward = frame === showOnFrame;
  return (
    <Spring
      from={{ opacity: forward ? 0 : 1 }}
      to={{ opacity: forward ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {spring => <div
        className={styles.spread}
        style={{
          opacity: spring.opacity,
        }}
      >
        {children}
      </div >}
    </Spring >
  );
};

FadeIn.propTypes = {
  frame: PropTypes.number.isRequired,
  showOnFrame: PropTypes.number.isRequired,
  children: PropTypes.any,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(FadeIn);
