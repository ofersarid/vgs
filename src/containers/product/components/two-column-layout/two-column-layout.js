import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import services from '/src/services';
import { FadeIn, ReadMoreSection } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import Footnotes from '../footnotes/footnotes';

const TwoColumnLayout = ({ article, footNotes, isMobile, title, color }) => {
  const getHtml = (
    <Fragment>
      <p className={styles.article} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
      <Footnotes footNotes={footNotes} />
    </Fragment>
  );

  return (
    <FadeIn spread >
      <section className={cx(layout.inner)} >
        {isMobile ? (
          <ReadMoreSection
            html={getHtml}
            more={(
              <Fragment >
                <h1 style={{ color }} >{title}</h1 >
                {getHtml}
              </Fragment >
            )}
          />
        ) : (
          <Fragment>
            <p className={styles.article} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
            <Footnotes footNotes={footNotes} />
          </Fragment>
        )}
      </section >
    </FadeIn >
  );
};

TwoColumnLayout.propTypes = {
  color: PropTypes.string.isRequired,
  article: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string),
  isMobile: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  // deviceType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
  isMobile: Device.selectors.isMobile(state),
  // deviceType: Device.selectors.deviceType(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
