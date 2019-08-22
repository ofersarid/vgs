import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, IndexHeader } from '/src/shared';
import {
  TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, ImgTxtBtn, Summary, TwoImagesLayout, Downloads
} from './components';
import Device from '/src/shared/device';
import services from '/src/services';
import frameSummeryPic from '/src/assets/frame_summery.png';
import violaSummeryPic from '/src/assets/viola_summery.png';

// import { firestoreConnect } from 'react-redux-firebase';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.didMount = false;
    props.setColor(this.resolveColor());
  }

  componentDidMount() {
    this.didMount = true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.name !== this.props.name) {
      this.props.setColor(this.resolveColor());
    }
  }

  resolveSummeryPic() {
    const { name } = this.props;
    switch (name) {
      case 'FRAME':
        return frameSummeryPic;
      case 'VIOLA':
        return violaSummeryPic;
      default:
        return '';
    }
  }

  resolveColor() {
    const { name } = this.props;
    switch (name) {
      case 'FRAME':
        return '#0272BA';
      case 'VIOLA':
        return '#662D91';
      default:
        return '';
    }
  }

  render() {
    const { color, data, name, art, orientation, isMobile } = this.props;
    if (!data) {
      return null;
    }
    let countPublishedScreen = 1;
    return (
      <Fragment >
        {(orientation === 'landscape' && isMobile) ? null : (
          <Fragment >
            {data.screen1Published && <IndexHeader index={countPublishedScreen++} header={data.screen1Title} />}
            {data.screen2Published && <IndexHeader index={countPublishedScreen++} header={data.screen2Title} />}
            {data.screen3Published && <IndexHeader index={countPublishedScreen++} header={data.screen3Title} />}
            {data.screen4Published && <IndexHeader index={countPublishedScreen++} header={data.screen4Title} />}
            {data.screen5Published && <IndexHeader index={countPublishedScreen++} header={data.screen5Title} />}
            {data.screen6Published && <IndexHeader index={countPublishedScreen++} header={data.screen6Title} />}
            {data.screen7Published && <IndexHeader index={countPublishedScreen++} header={data.screen7Title} />}
            <IndexHeader index={countPublishedScreen} header="Clinical" />
          </Fragment >
        )}
        <SnapScroll >
          <Cover
            art={art}
            themeColor={color}
            name={name}
            description={data.coverTagLine}
            footer={{
              title: data.eventTitle,
              dateFrom: data.eventDateFrom,
              dateTo: data.eventDateTo,
              address: data.eventAddress,
              linkTo: data.eventLinkTo,
            }}
          />
          {data.screen1Published && (
            <TwoColumnLayout
              article={data.screen1Body}
              footNotes={[data.screen1Footnote1, data.screen1Footnote2, data.screen1Footnote3]}
            />
          )}
          {data.screen2Published && (
            <ImgTxtBtn
              img={data.screen2Image}
              txt={data.screen2Body}
              footNotes={[data.screen2Footnote1, data.screen2Footnote2, data.screen2Footnote3]}
              pdfSrc={data.screen2PDF}
              imgSubTitle={data.screen2ImageSubtitle}
              themeColor={color}
            />
          )}
          {data.screen3Published && (
            <ImgTxtBtn
              youtube={data.screen3Videolink}
              txt={data.screen3Body}
              footNotes={[data.screen3Footnote1, data.screen3Footnote2, data.screen3Footnote3]}
              themeColor={color}
            />
          )}
          {data.screen4Published && (
            <ThreeColumnLayout
              data={[data.screen4Bullet1, data.screen4Bullet2, data.screen4Bullet3, data.screen4Bullet4, data.screen4Bullet5, data.screen4Bullet6]}
            />
          )}
          {data.screen5Published && (
            <TwoImagesLayout
              image1={data.screen5Image1}
              image2={data.screen5Image2}
              img1Description={data.screen5Image1Subtitle}
              img2Description={data.screen5Image2Subtitle}
            />
          )}
          {data.screen6Published && (
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
          {data.screen7Published && (
            <Summary
              art={this.resolveSummeryPic()}
              data={[data.screen7Bullet1, data.screen7Bullet2, data.screen7Bullet3, data.screen7Bullet4]} />
          )}
          <Clinical themeColor={color} />
        </SnapScroll >
      </Fragment >
    );
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
  data: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  setColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state),
  data: services.reactor.selectors.pageData(state, services.products.selectors.name(state)),
  name: services.products.selectors.name(state),
  art: services.products.selectors.art(state),
  isMobile: Device.selectors.isMobile(state),
  orientation: Device.selectors.orientation(state),
});

const mapDispatch = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatch),
)(Product);