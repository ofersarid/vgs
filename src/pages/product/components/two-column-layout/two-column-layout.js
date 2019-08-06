import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import { SnapScroll, ScrollableArea } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import Footnotes from '../footnotes/footnotes';

const TwoColumnLayout = ({ showOnFrame, frame, article, footNotes, isMobile }) => {
  return (
    <Spring
      from={{ opacity: frame === showOnFrame ? 0 : 1 }}
      to={{ opacity: frame === showOnFrame ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {styleProps => <section className={cx(layout.inner)} style={{
        opacity: styleProps.opacity,
      }} >
        <ScrollableArea >
          <div className={styles.article} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
          {isMobile && <Footnotes footNotes={footNotes} />}
        </ScrollableArea >
        {!isMobile && <Footnotes footNotes={footNotes} />}
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
