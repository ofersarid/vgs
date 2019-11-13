import React, { Fragment } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import services from '/src/services';
import { FadeIn, ReadMoreSection, Footnotes } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

const TwoColumnLayout = ({ article, footNotes, isMobile, title, color, name }) => {
  const getHtml = forReader => {
    return (
      <Fragment >
        <p className={cx(styles.article, { [styles.articleForReader]: forReader })} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
        {forReader && <Footnotes footNotes={footNotes} />}
      </Fragment >
    );
  };

  return (
    <FadeIn spread >
      <section className={cx(layout.inner)} >
        {isMobile ? (
          <ReadMoreSection
            html={getHtml(false)}
            forceShowTrigger={footNotes.length > 0}
            more={(
              <Fragment >
                <h1 style={{ color }} >{name}</h1 >
                <h2 style={{ color }} >{title}</h2 >
                {getHtml(true)}
              </Fragment >
            )}
          />
        ) : (
          <Fragment >
            <p className={styles.article} dangerouslySetInnerHTML={{ __html: article.replace(/\n\r?/g, '<br />') }} />
            <Footnotes footNotes={footNotes} />
          </Fragment >
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
  name: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
  isMobile: services.device.selectors.type(state) === 'mobile',
  name: services.products.selectors.name(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(TwoColumnLayout);
