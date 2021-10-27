import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { compose } from 'redux';
import { SnapScroll, IndexHeader } from '/src/shared';
import {
  TwoColumnLayout,
  ThreeColumnLayout,
  Clinical,
  Cover,
  ImgTxtBtn,
  Summary,
  TwoImagesLayout,
  Downloads
} from './components';
import services from '/src/services';
import frameCoverPic from '/src/assets/frame_cover.png';
import violaCoverPic from '/src/assets/viola_cover.png';
import vestCoverPic from '/src/assets/vest_cover.png';
import frameFrCoverPic from '/src/assets/frame_fr_cover.png';
import frameSummeryPic from '/src/assets/frame_summery.png';
import violaSummeryPic from '/src/assets/viola_summery.png';
import vestSummeryPic from '/src/assets/vest_summery.png';
import frameFrSummeryPic from '/src/assets/frame_fr_summery.png';

class Product extends Component {
  constructor(props) {
    super(props);
    this.didMount = false;
    this.state = {
      product: null
    };
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {
      frame,
      color,
      name,
      data,
      isMobile,
      orientation,
      publications,
      carouselPics,
      education
    } = this.props;
    return (
      frame !== nextProps.frame ||
      color !== nextProps.color ||
      name !== nextProps.name ||
      !isEqual(data, nextProps.data) ||
      !isEqual(publications, nextProps.publications) ||
      !isEqual(education, nextProps.education) ||
      !isEqual(carouselPics, nextProps.carouselPics) ||
      isMobile !== nextProps.isMobile ||
      orientation !== nextProps.orientation
    );
  }

  componentDidMount() {
    const { setColor, products } = this.props;
    this.didMount = true;
    if (products) {
      setColor(this.resolveColor());
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { name, setColor, products } = this.props;
    if (prevProps.name !== name) {
      setColor(this.resolveColor());
      this.setState({ product: this.resolveProduct() });
    }
    if (prevProps.products !== undefined && products) {
      setColor(this.resolveColor());
      this.setState({ product: this.resolveProduct() });
    }
  }

  resolveSummeryPic() {
    const { name } = this.props;
    switch (name) {
      case 'FRAME':
        return frameSummeryPic;
      case 'VIOLA':
        return violaSummeryPic;
      case 'VEST':
        return vestSummeryPic;
      case 'FRAME FR':
        return frameFrSummeryPic;
      default:
        return '';
    }
  }

  resolveColor() {
    const { name, products } = this.props;
    return products.find((itm) => itm.productName.toUpperCase() === name)
      .producColor;
  }

  resolveProduct() {
    const { name, products } = this.props;
    return products.find((itm) => itm.productName.toUpperCase() === name);
  }

  render() {
    const {
      color,
      data,
      name,
      orientation,
      isDesktop,
      publications,
      carouselPics,
      isMobile,
      education,
      products
    } = this.props;

    const { product } = this.state;

    console.log(product);

    if (!data) {
      return null;
    }

    let countPublishedScreen = 1;

    return !product ? null : (
      <Fragment>
        {orientation === 'landscape' && !isDesktop ? null : (
          <Fragment>
            {data.screen1Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen1Title}
              />
            )}
            {data.screen2Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen2Title}
              />
            )}
            {data.IFUVideoPublished === 'Publish' ? (
              <IndexHeader index={countPublishedScreen++} header='IFU VIDEO' />
            ) : null}
            {data.screen3Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen3Title}
              />
            )}
            {data.screen4Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen4Title}
              />
            )}
            {data.screen5Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen5Title}
              />
            )}
            {data.screen6Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen6Title}
              />
            )}
            {data.screen7Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={data.screen7Title}
              />
            )}
            <IndexHeader index={countPublishedScreen} header='Clinical' />
          </Fragment>
        )}
        <SnapScroll>
          <Cover
            art={product.coverImage}
            themeColor={color}
            name={product.productName}
            description={product.coverTagLine}
            footer={{
              title: product.eventTitle,
              dateFrom: product.eventDateFrom,
              dateTo: product.eventDateTo,
              address: product.eventAddress,
              linkTo: product.eventLinkTo
            }}
            footnote={product.coverFootnote}
          />
          {product.screen1Published === 'Publish' && (
            <TwoColumnLayout
              article={product.screen1Body}
              footNotes={[
                product.screen1Footnote1,
                product.screen1Footnote2,
                product.screen1Footnote3
              ]}
              title={product.screen1Title}
            />
          )}
          {product.screen2Published === 'Publish' && (
            <ImgTxtBtn
              img={product.screen2Image}
              txt={isMobile ? product.screen2BodyMobile : product.screen2Body}
              readeMoreTxt={product.screen2Body}
              footNotes={[
                product.screen2Footnote1,
                product.screen2Footnote2,
                product.screen2Footnote3
              ]}
              imgSubTitle={data.screen2ImageSubtitle}
              themeColor={color}
              title={product.screen2Title}
            />
          )}
          {data.IFUVideoPublished === 'Publish' && (
            <ImgTxtBtn
              youtube={data.IFUVideoLink}
              txt={data.IFUVideoBody}
              readeMoreTxt={data.IFUVideoBody}
              themeColor={color}
              title='IFU VIDEO'
            />
          )}
          {data.screen3Published === 'Publish' && (
            <ImgTxtBtn
              youtube={data.screen3Videolink}
              txt={data.screen3Body}
              readeMoreTxt={data.screen3Body}
              footNotes={[
                data.screen3Footnote1,
                data.screen3Footnote2,
                data.screen3Footnote3
              ]}
              themeColor={color}
              title={data.screen3Title}
            />
          )}
          {data.screen4Published === 'Publish' && (
            <ThreeColumnLayout
              data={[
                data.screen4Bullet1,
                data.screen4Bullet2,
                data.screen4Bullet3,
                data.screen4Bullet4,
                data.screen4Bullet5,
                data.screen4Bullet6
              ]}
              title={data.screen4Title}
            />
          )}
          {carouselPics && carouselPics.length && (
            <TwoImagesLayout
              pics={carouselPics}
              color={color}
              orientation={orientation}
            />
          )}
          {data.screen6Published === 'Publish' && (
            <Downloads
              image={data.screen6Image}
              imageTitle={data.screen6ImageSubtitle}
              brochure={data.brochure}
              ifu={data.ifu}
              patientCard={data.patientCard}
              instructions={data.instructions}
              themeColor={color}
            />
          )}
          {data.screen7Published === 'Publish' && (
            <Summary
              art={this.resolveSummeryPic()}
              data={[
                data.screen7Bullet1,
                data.screen7Bullet2,
                data.screen7Bullet3,
                data.screen7Bullet4
              ]}
            />
          )}
          <Clinical
            themeColor={color}
            articles={{
              publications,
              education
            }}
          />
        </SnapScroll>
      </Fragment>
    );
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object,
  isDesktop: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  setColor: PropTypes.func.isRequired,
  publications: PropTypes.arrayOf(PropTypes.object),
  education: PropTypes.arrayOf(PropTypes.object),
  carouselPics: PropTypes.arrayOf(PropTypes.object),
  products: PropTypes.any
};

const mapStateToProps = (state) => ({
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state),
  data: services.reactor.selectors.pageData(
    state,
    services.products.selectors.name(state)
  ),
  name: services.products.selectors.name(state),
  isDesktop: services.device.selectors.type(state) === 'desktop',
  isMobile: services.device.selectors.type(state) === 'mobile',
  orientation: services.device.selectors.orientation(state),
  publications: services.reactor.selectors.collectionData(
    state,
    `publications - ${services.products.selectors.name(state)}`
  ),
  education: services.reactor.selectors.collectionData(
    state,
    `education - ${services.products.selectors.name(state)}`
  ),
  carouselPics: services.reactor.selectors.collectionData(
    state,
    `${services.products.selectors.name(state)} - carousel pics`
  ),
  products: services.reactor.selectors.collectionData(state, 'products')
});

const mapDispatch = (dispatch) => ({
  setColor: (color) => dispatch(services.vgs.actions.setColor(color))
});

export default compose(connect(mapStateToProps, mapDispatch))(Product);
