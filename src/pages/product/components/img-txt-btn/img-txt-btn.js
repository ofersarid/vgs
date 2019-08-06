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
import { ScrollableArea, Button, FadeIn } from '/src/shared';
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

  componentDidMount() {
    const { disableBizCard, youtube } = this.props;
    if (youtube) {
      disableBizCard();
    }
  }

  componentWillUnmount() {
    const { enableBizCard, youtube } = this.props;
    if (youtube) {
      enableBizCard();
    }
  }

  mediaReady() {
    this.setState({ isLoaded: true });
  }

  onYouTubeReady(event) {
    this.mediaReady();
  }

  render() {
    const {
      imgSubTitle, img, youtube, txt,
      pdfSrc, themeColor, footNotes, orientation, isMobile
    } = this.props;
    const { isLoaded } = this.state;
    return (
      <FadeIn>
        <ScrollableArea disableScroll={isMobile && orientation === 'landscape'} className={cx(styles.container, sharedStyles.inner)} >
          <div className={cx(styles.img)} >
            {img && <img src={img} className={styles.inner} onLoad={this.mediaReady} />}
            {imgSubTitle && <div className={cx(styles.title)} >{imgSubTitle}</div >}
            {youtube && (
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
            )}
          </div >
          {(orientation === 'landscape' && isMobile) ? null : (
            <Fragment>
              <div className={cx(styles.rightCol)} >
                <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />
                {pdfSrc && (
                  <Button
                    tag="a"
                    color
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
            </Fragment>
          )}
        </ScrollableArea >
      </FadeIn>
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
};

const mapStateToProps = state => ({
  orientation: Device.selectors.orientation(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({
  disableBizCard: () => dispatch(services.vgs.actions.disableBizCard()),
  enableBizCard: () => dispatch(services.vgs.actions.enableBizCard()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
