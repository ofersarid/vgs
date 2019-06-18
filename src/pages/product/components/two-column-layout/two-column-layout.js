import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/components/device';
import { SnapScroll, ScrollableArea } from '/src/components';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const TwoColumnLayout = ({ showOnFrame, frame, article, footNotes, isMobile }) => {
  return (
    <Spring
      from={{ opacity: frame === showOnFrame ? 0 : 1 }}
      to={{ opacity: frame === showOnFrame ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {styleProps => <section className={cx(styles.content, sharedStyles.inner)} style={{
        opacity: styleProps.opacity,
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
      </section >}
    </Spring >
  );
};

TwoColumnLayout.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  article: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
