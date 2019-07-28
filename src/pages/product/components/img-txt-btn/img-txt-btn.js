import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import autoBind from 'auto-bind';
import services from '/src/services';
import styles from './styles.scss';
import { Spring } from 'react-spring/renderprops-universal';
import { SnapScroll, ScrollableArea, Button } from '/src/shared';
// import activityIndicator from '/src/svg-loaders/ball-triangle.svg';
// import ReactSVG from 'react-svg';
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

  onYouTubePlay() {
    const { disableBizCard } = this.props;
    disableBizCard();
  }

  onYouTubeReady(event) {
    this.mediaReady();
  }

  render() {
    const {
      imgSubTitle, showOnFrame, frame, img, youtube, txt,
      pdfSrc, themeColor, footNotes, orientation, isMobile
    } = this.props;
    const { isLoaded } = this.state;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        immediate={frame !== showOnFrame}
      >
        {styleProps => <ScrollableArea
          // hideOverflow
          className={cx(styles.container, sharedStyles.inner)}
          style={{
            opacity: styleProps.opacity,
          }}
        >
          <div className={cx(styles.img)} >
            {img && <img src={img} className={styles.inner} onLoad={this.mediaReady} />}
            {imgSubTitle && <div className={cx(styles.title)} >{imgSubTitle}</div >}
            {youtube && (
              <YouTube
                videoId={youtube.split('v=')[1]}
                opts={{
                  playerVars: {
                    rel: 0,
                  }
                }}
                onReady={this.onYouTubeReady}
                onPlay={this.onYouTubePlay}
                className={cx(styles.youtube, styles.inner, {
                  [styles.ready]: isLoaded,
                  [styles.fullScreen]: orientation === 'landscape',
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
        </ScrollableArea >}
      </Spring >
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
  frame: PropTypes.number.isRequired,
  showOnFrame: PropTypes.number.isRequired,
  disableBizCard: PropTypes.func.isRequired,
  enableBizCard: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  orientation: services.vgs.selectors.orientation(state),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({
  disableBizCard: () => dispatch(services.vgs.actions.disableBizCard()),
  enableBizCard: () => dispatch(services.vgs.actions.disableBizCard()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
