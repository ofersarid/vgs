import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FadeIn } from '/src/shared';
import services from '/src/services';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

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
  isMobile: services.device.selectors.type(state) === 'mobile',
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
