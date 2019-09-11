import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, FadeInOut } from '/src/shared';
import services from '/src/services';
import homeCoverPic from '/src/assets/home_cover.jpg';
import Device from '/src/shared/device';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import OurProducts from './components/our-products/our-products';
// import GlobalImpact from './components/global-impact/global-impact';
import Header from './components/header/header';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
    props.setColor('#005728');
  }

  render() {
    const { data, frame, isMobile } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.grayBg} />
        <FadeInOut show={frame < 2} className={styles.bgWrap} spread >
          <div className={styles.coverPic} style={{ backgroundImage: `url(${homeCoverPic})` }} />
          <div className={styles.gradientOverLay} />
        </FadeInOut >
        {/*<Header index={2} text="GLOBAL IMPACT" />*/}
        <Header index={2} text="OUR PRODUCTS" />
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
          <OurProducts
            text={data.ourProductsBody} />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

Home.propTypes = {
  frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
