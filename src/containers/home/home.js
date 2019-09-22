import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import { SnapScroll, FadeIn, IndexHeader } from '/src/shared';
import services from '/src/services';
import camelCase from 'lodash/camelCase';
import Device from '/src/shared/device';
import layout from '/src/shared/styles/layout.scss';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import OurProducts from './components/our-products/our-products';
import ProductsShelf from './components/products-shelf/products-shelf';
import styles from './styles.scss';

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

  render() {
    const { data, isMobile } = this.props;
    return data ? (
      <Fragment >
        {/*<Header index={2} text="GLOBAL IMPACT" />*/}
        <IndexHeader index={1} header="VISIONARY SURGICAL TECHNOLOGY" hideIndex />
        <IndexHeader index={2} header={isMobile ? 'ABOUT OUR PRODUCTS' : 'OUR PRODUCTS'} hideIndex />
        <IndexHeader index={3} header="OUR PRODUCTS" hideIndex />
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
            <FadeIn className={cx(layout.inner, styles.homeInner)} >
              <p
                dangerouslySetInnerHTML={{ __html: data.ourProductsBodyMobile.replace(/\n\r?/g, '<br />') }}
              />
            </FadeIn >
          )}
          {isMobile && (
            <FadeIn className={cx(layout.inner, styles.homeInner)} >
              <ProductsShelf />
            </FadeIn >
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
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
  lastFrame: services.vgs.selectors.lastFrame(state, 'home'),
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateFrameIndex: index => dispatch(SnapScroll.actions.updateFrameIndex(index)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
