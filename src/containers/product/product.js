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
import { compact } from 'lodash';

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
            {product.screen1Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen1Title}
              />
            )}
            {product.screen2Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen2Title}
              />
            )}
            {product.screen3Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen3Title}
              />
            )}
            {product.screen4Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen4Title}
              />
            )}
            {product.screen5Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen5Title}
              />
            )}
            {product.screen6Published === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.screen6Title}
              />
            )}
            {product.keyFeaturesPublished === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header='Key Features'
              />
            )}
            {product.imageGalleryPublished === 'Publish' && (
              <IndexHeader
                index={countPublishedScreen++}
                header={product.imageGalleryTitle}
              />
            )}
            {product.downloadsPublished === 'Publish' && (
              <IndexHeader index={countPublishedScreen++} header='Downloads' />
            )}
            {product.summaryPublished === 'Publish' && (
              <IndexHeader index={countPublishedScreen++} header='Summary' />
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
          {[3, 4, 5, 6].map((i) => {
            if (product[`screen${i}Published`] === 'Publish') {
              return (
                <ImgTxtBtn
                  youtube={product[`screen${i}Videolink`]}
                  txt={product[`screen${i}Body`]}
                  readeMoreTxt={product[`screen${i}Body`]}
                  themeColor={color}
                  title={product[`screen${i}Title`]}
                />
              );
            }
            return null;
          })}
          {/* {product.screen3Published === 'Publish' && (
            <ImgTxtBtn
              youtube={product.screen3Videolink}
              txt={product.screen3Body}
              readeMoreTxt={product.screen3Body}
              themeColor={color}
              title={product.screen3Title}
            />
          )}
          {product.screen4Published === 'Publish' && (
            <ImgTxtBtn
              youtube={product.screen4Videolink}
              txt={product.screen4Body}
              readeMoreTxt={product.screen4Body}
              footNotes={[
                product.screen4Footnote1,
                product.screen4Footnote2,
                product.screen4Footnote3
              ]}
              themeColor={color}
              title={product.screen4Title}
            />
          )} */}
          {product.keyFeaturesPublished === 'Publish' && (
            <ThreeColumnLayout
              data={compact([
                product.keyFeature1,
                product.keyFeature2,
                product.keyFeature3,
                product.keyFeature4,
                product.keyFeature5,
                product.keyFeature6
              ])}
              title='Key Features'
            />
          )}
          {product.imageGalleryPublished === 'Publish' && (
            <TwoImagesLayout
              pics={compact([
                {
                  pic: product.imageGalleryPic1,
                  desc: product.imageGalleryDescription1
                },
                {
                  pic: product.imageGalleryPic2,
                  desc: product.imageGalleryDescription2
                },
                {
                  pic: product.imageGalleryPic3,
                  desc: product.imageGalleryDescription3
                },
                {
                  pic: product.imageGalleryPic4,
                  desc: product.imageGalleryDescription4
                },
                {
                  pic: product.imageGalleryPic5,
                  desc: product.imageGalleryDescription5
                },
                {
                  pic: product.imageGalleryPic6,
                  desc: product.imageGalleryDescription6
                }
              ])}
              color={color}
              orientation={orientation}
            />
          )}
          {product.downloadsPublished === 'Publish' && (
            <Downloads
              image={product.downloadsPic}
              brochure={product.downloadsBrochure}
              ifu={product.downloadsIFU}
              patientCard={product.downloadsPatientCard}
              instructions={product.downloadsInstructions}
              themeColor={color}
            />
          )}
          {product.summaryPublished === 'Publish' && (
            <Summary
              art={product.summaryPic}
              data={compact([
                product.summaryBullet1,
                product.summaryBullet2,
                product.summaryBullet3,
                product.summaryBullet4
              ])}
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
