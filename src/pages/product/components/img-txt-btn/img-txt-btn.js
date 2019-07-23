import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import styles from './styles.scss';
import { Spring } from 'react-spring/renderprops-universal';
import { SnapScroll, ScrollableArea, Button } from '/src/shared';
import Device from '/src/shared/device';
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

  hideSpinner() {
    this.setState({ isLoaded: true });
  }

  render() {
    const { imgSubTitle, showOnFrame, frame, img, youtube, txt, pdfSrc, themeColor, footNotes, isTouchDevice } = this.props;
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
            {img && isTouchDevice && <img src={img} className={styles.inner} onLoad={this.hideSpinner} />}
            {img && !isTouchDevice && <div style={{ backgroundImage: `url(${img})` }} className={styles.inner} />}
            {imgSubTitle && <div className={cx(styles.title)} >{imgSubTitle}</div >}
            {youtube && (
              <iframe
                src={`https://www.youtube.com/embed/${youtube.split('v=')[1]}?loop=1&modestbranding=1&showinfo=0&theme=light&disablekb=1`}
                width="560" height="315" frameBorder="0"
                onLoad={this.hideSpinner}
                style={{
                  opacity: isLoaded ? 1 : 0,
                }}
              />
            )}
          </div >
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
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
