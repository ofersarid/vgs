import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import autoBind from 'auto-bind';
import services from '/src/services';
import styles from './styles.scss';
import { Button, FadeIn, MediaLoader, RatioBox, ReadMoreSection } from '/src/shared';
import sharedStyles from '../../styles.scss';
import Footnotes from '../footnotes/footnotes';

class ImgTxtBtn extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isLoaded: false,
    };
  }

  componentWillUnmount() {
    const { enableBizCard, youtube } = this.props;
    if (youtube) {
      enableBizCard();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  mediaReady() {
    this.setState({ isLoaded: true });
  }

  onYouTubeReady() {
    const { disableBizCard } = this.props;
    this.mediaReady();
    disableBizCard();
  }

  render() {
    const {
      imgSubTitle, img, youtube, txt, color, title,
      pdfSrc, themeColor, footNotes, orientation, isMobile
    } = this.props;
    const { isLoaded } = this.state;
    return (
      <FadeIn spread >
        <div className={cx(styles.container, sharedStyles.inner)} >
          {img && !isMobile && (
            <Fragment >
              <RatioBox ratio={2 / 3} className={styles.img} >
                <MediaLoader src={img} />
              </RatioBox >
              {imgSubTitle && <div className={cx(styles.title)} >{imgSubTitle}</div >}
            </Fragment >
          )}
          {youtube && (
            <RatioBox ratio={isMobile ? 1 : 2 / 3} className={cx(styles.img)} >
              <YouTubePlayer
                url={youtube}
                playing={isLoaded}
                config={{
                  youtube: {
                    playerVars: { rel: 0 },
                    preload: true,
                  }
                }}
                onReady={this.onYouTubeReady}
                controls
                width="100%"
                height="100%"
                className={cx(styles.youtube, styles.inner, {
                  [styles.ready]: isLoaded,
                  [styles.fullScreen]: isMobile && orientation === 'landscape',
                })}
              />
            </RatioBox >
          )}
          {(orientation === 'portrait' && isMobile) && (
            <ReadMoreSection
              maxLines={youtube ? 0 : 10}
              btnTxt="About this video"
              html={(
                <Fragment >
                  {youtube ? null : <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />}
                  {pdfSrc && (
                    <Button
                      tag="a"
                      textColor="white"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={pdfSrc}
                      waveColor="white"
                      className={cx(styles.btn)}
                      style={{
                        background: themeColor,
                      }}
                    >
                      PRODUCT PDF
                    </Button >
                  )}
                </Fragment >
              )}
              more={(
                <Fragment >
                  <h1 style={{ color }} >{title}</h1 >
                  <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />
                  <Footnotes footNotes={footNotes} />
                </Fragment >
              )}
            />
          )}
          {!isMobile && (
            <Fragment >
              <div className={cx(styles.rightCol)} >
                <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />
                {pdfSrc && (
                  <Button
                    tag="a"
                    textColor="white"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pdfSrc}
                    waveColor="white"
                    className={cx(styles.btn)}
                    style={{
                      background: themeColor,
                    }}
                  >
                    PRODUCT PDF
                  </Button >
                )}
              </div >
              <Footnotes footNotes={footNotes} />
            </Fragment >
          )}
        </div >
      </FadeIn >
    );
  }
}

ImgTxtBtn.propTypes = {
  img: PropTypes.string,
  youtube: PropTypes.string,
  imgSubTitle: PropTypes.string,
  txt: PropTypes.string.isRequired,
  footNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  pdfSrc: PropTypes.string,
  themeColor: PropTypes.string.isRequired,
  disableBizCard: PropTypes.func.isRequired,
  enableBizCard: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  isMobile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orientation: Device.selectors.orientation(state),
  isMobile: Device.selectors.isMobile(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  disableBizCard: () => dispatch(services.vgs.actions.disableBizCard()),
  enableBizCard: () => dispatch(services.vgs.actions.enableBizCard()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
