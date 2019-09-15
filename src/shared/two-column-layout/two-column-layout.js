import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import { FadeIn } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
// import Footnotes from '../footnotes/footnotes';

const TwoColumnLayout = ({ article, footNotes, isMobile }) => { // eslint-disable-line
  return (
    <FadeIn spread >
      <section className={cx(layout.inner)} >
        <p className={styles.article} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
        {/*{isMobile && <Footnotes footNotes={footNotes} />}*/}
        {/*{!isMobile && <Footnotes footNotes={footNotes} />}*/}
      </section >
    </FadeIn >
  );
};

TwoColumnLayout.propTypes = {
  article: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
