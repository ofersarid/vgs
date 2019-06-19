import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import styles from './styles.scss';
import { Spring } from 'react-spring/renderprops-universal';
import { SnapScroll, ScrollableArea } from '/src/components';
import Device from '/src/components/device';
import sharedStyles from '../../styles.scss';

class ImgTxtBtn extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { showOnFrame, frame, img, txt, pdfSrc, themeColor, isMobile, footNotes, isTouchDevice } = this.props;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        immediate={frame !== showOnFrame}
      >
        {styleProps => <ScrollableArea
          hideOverflow
          className={cx(styles.container, sharedStyles.inner)}
          style={{
            opacity: styleProps.opacity,
          }}
        >
          <div className={cx(styles.img)} >
            {isTouchDevice ? <img src={img.src} className={styles.inner} />
              : <div style={{ backgroundImage: `url(${img.src})` }} className={styles.inner} />
            }
            <div className={cx(styles.title)} >{img.title}</div >
          </div >
          <div className={cx(styles.rightCol)} >
            <p className={cx(styles.txt)} >{txt}</p >
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={pdfSrc}
              className={cx('ripple waves-light', styles.btn)}
              style={{
                background: themeColor,
              }}
            >
              PRODUCT PDF
            </a >
          </div >
          {isMobile && (
            <ol className={styles.footNotes} >
              {footNotes.map((note, i) => <li key={i} >{note}</li >)}
            </ol >
          )}
          {!isMobile && (
            <ol className={styles.footNotes} >
              {footNotes.map((note, i) => <li key={i} >{note}</li >)}
            </ol >
          )}
        </ScrollableArea >}
      </Spring >
    );
  }
}

ImgTxtBtn.propTypes = {
  img: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  txt: PropTypes.string.isRequired,
  footNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  pdfSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  frame: PropTypes.number.isRequired,
  showOnFrame: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  isMobile: Device.selectors.isMobile(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
