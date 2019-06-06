import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import { SnapScroll, ScrollableArea } from '/src/components';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';
import IndexHeader from '../index-header/index-header';

const TwoColumnLayout = ({ index, frame, header, firstLook, article, footNotes, isMobile }) => {
  const resolveSpring = () => {
    return frame !== index ? useSpring({
      o: 0,
      from: {
        o: 1,
      },
    }) : useSpring({
      y: 0,
      x: 0,
      o: 1,
      from: {
        o: 0,
      },
    });
  };

  const { o } = resolveSpring();

  return (frame > 0 || !firstLook) ? (
    <div className={styles.twoColumnLayout} >
      <IndexHeader index={index} header={header} />
      <div className={sharedStyles.inner} >
        <animated.section className={styles.content} style={{
          opacity: o,
        }} >
          <ScrollableArea >
            <div className={styles.article} >
              {article}
            </div >
            {isMobile && (
              <ol className={styles.footNotes} >
                {footNotes.map((note, i) => <li key={i} >{note}</li >)}
              </ol >
            )}
          </ScrollableArea >
          {!isMobile && (
            <ol className={styles.footNotes} >
              {footNotes.map((note, i) => <li key={i} >{note}</li >)}
            </ol >
          )}
        </animated.section >
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
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  firstLook: SnapScroll.selectors.firstLook(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
