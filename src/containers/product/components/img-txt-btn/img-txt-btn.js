import React, { Fragment, PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Device from '/src/shared/device';
import autoBind from 'auto-bind';
import services from '/src/services';
import utils from '/src/utils';
import styles from './styles.scss';
import { FadeIn, MediaLoader, RatioBox, ReadMoreSection, Youtube, Footnotes } from '/src/shared';
import layout from '/src/shared/styles/layout.scss';

class ImgTxtBtn extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const { youtube, disableBizCard } = this.props;
    if (youtube) {
      disableBizCard();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { youtube, disableBizCard } = this.props;
    if (youtube) {
      disableBizCard();
    }
  }

  componentWillUnmount() {
    const { enableBizCard } = this.props;
    if (!utils.isDesktop()) {
      enableBizCard();
    }
  }

  render() {
    const {
      imgSubTitle, img, youtube, txt, color, title, name,
      footNotes, orientation, isMobile, readeMoreTxt,
    } = this.props;
    return (
      <FadeIn spread >
        <div className={cx(styles.container, layout.inner)} >
          {img && (
            <Fragment >
              <RatioBox ratio={2 / 3} className={styles.img} >
                <MediaLoader src={img} />
              </RatioBox >
              {imgSubTitle && <div className={cx('caption')} >{imgSubTitle}</div >}
            </Fragment >
          )}
          {youtube && (
            <Youtube
              ratio={isMobile && orientation === 'landscape' ? window.innerWidth / window.innerHeight : 9 / 16}
              className={styles.img}
              url={youtube}
              fullScreen={isMobile && orientation === 'landscape'}
              color={color}
            />
          )}
          {(orientation === 'portrait' && isMobile) && (
            <Fragment >
              <ReadMoreSection
                maxLines={(img || youtube) ? 3 : 10}
                html={<p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />}
                more={(
                  <Fragment >
                    <h1 style={{ color }} >{name}</h1 >
                    <h2 style={{ color }} >{title}</h2 >
                    <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: readeMoreTxt.replace(/\n\r?/g, '<br />') }} />
                    <Footnotes footNotes={footNotes} />
                  </Fragment >
                )}
              />
            </Fragment >
          )}
          {!isMobile && (
            <Fragment >
              <div className={cx(styles.rightCol)} >
                <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />
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
  readeMoreTxt: PropTypes.string,
  footNotes: PropTypes.arrayOf(PropTypes.string).isRequired,
  themeColor: PropTypes.string.isRequired,
  disableBizCard: PropTypes.func.isRequired,
  enableBizCard: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  isMobile: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  orientation: Device.selectors.orientation(state),
  isMobile: Device.selectors.isMobile(state),
  color: services.vgs.selectors.color(state),
  name: services.products.selectors.name(state),
});

const mapDispatchToProps = dispatch => ({
  disableBizCard: () => dispatch(services.vgs.actions.disableBizCard()),
  enableBizCard: () => dispatch(services.vgs.actions.enableBizCard()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ImgTxtBtn);
