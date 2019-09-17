import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import { SnapScroll, FadeInOut, FadeIn } from '/src/shared';
import services from '/src/services';
import camelCase from 'lodash/camelCase';
import homeCoverPicMobile from '/src/assets/home_cover_art_mobile.jpg';
import homeCoverPicTablet from '/src/assets/home_cover_art_tablet.jpg';
import homeCoverPicDesktop from '/src/assets/home_cover_art_desktop.jpg';
import Device from '/src/shared/device';
import layout from '/src/shared/styles/layout.scss';
import ourProductsArtMobile from '/src/assets/home_products_art_mobile.svg';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import OurProducts from './components/our-products/our-products';
// import GlobalImpact from './components/global-impact/global-impact';
import Header from './components/header/header';
import ProductsShelf from './components/products-shelf/products-shelf';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.setColor('#005728');
    autoBind(this);
  }

  componentDidMount() {
    const { updateFrameIndex, lastFrame } = this.props;
    updateFrameIndex(lastFrame);
  }

  componentWillUnmount() {
    const { updateLastFrame, frame } = this.props;
    updateLastFrame(frame, 'home');
  }

  navigate(e) {
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase().replace(' ', '-');
    hashHistory.push(camelCase(txt));
  }

  resolvePic() {
    const { isMobile, isTouchDevice } = this.props;
    if (isMobile) {
      return homeCoverPicMobile;
    } else if (isTouchDevice) {
      return homeCoverPicTablet;
    }
    return homeCoverPicDesktop;
  }

  render() {
    const { data, isMobile, frame } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.grayBg} />
        <FadeInOut show={frame < 2} className={styles.bgWrap} spread >
          <div className={styles.coverPic} style={{ backgroundImage: `url(${this.resolvePic()})` }} />
        </FadeInOut >
        {/*<Header index={2} text="GLOBAL IMPACT" />*/}
        <Header index={2} text={isMobile ? 'ABOUT OUR PRODUCTS' : 'OUR PRODUCTS'} />
        <Header index={3} text="OUR PRODUCTS" />
        <SnapScroll >
          <Cover
            footer={{
              title: data.eventTitle,
              dateFrom: data.eventDateFrom,
              dateTo: data.eventDateTo,
              address: data.eventAddress,
              linkTo: data.eventLinkTo,
            }}
          />
          <SingleParagraph
            text={isMobile ? data.synopsisMobile : data.synopsis} />
          {/*<GlobalImpact*/}
          {/*  regions={[{*/}
          {/*    pic: data.globalImpactImage1,*/}
          {/*    label: data.globalImpactImageSubtitle1,*/}
          {/*  }, {*/}
          {/*    pic: data.globalImpactImage2,*/}
          {/*    label: data.globalImpactImageSubtitle2,*/}
          {/*  }, {*/}
          {/*    pic: data.globalImpactImage3,*/}
          {/*    label: data.globalImpactImageSubtitle3,*/}
          {/*  }, {*/}
          {/*    pic: data.globalImpactImage4,*/}
          {/*    label: data.globalImpactImageSubtitle4,*/}
          {/*  }]}*/}
          {/*  text={data.globalImpactBody} />*/}
          {isMobile && (
            <FadeIn className={cx(layout.inner, styles.homeParagraph)} >
              <p
                dangerouslySetInnerHTML={{ __html: data.ourProductsBodyMobile.replace(/\n\r?/g, '<br />') }}
              />
            </FadeIn >
          )}
          {isMobile && (
            <Fragment >
              <img src={ourProductsArtMobile} className={styles.ourProductsArt} />
              <FadeIn className={layout.inner} >
                <ProductsShelf />
              </FadeIn >
            </Fragment >
          )}
          {!isMobile && (
            <OurProducts
              text={data.ourProductsBody} />
          )}
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

Home.propTypes = {
  frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  updateFrameIndex: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  updateLastFrame: PropTypes.func.isRequired,
  lastFrame: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
  lastFrame: services.vgs.selectors.lastFrame(state, 'home'),
  isMobile: Device.selectors.isMobile(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateFrameIndex: index => dispatch(SnapScroll.actions.updateFrameIndex(index)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
