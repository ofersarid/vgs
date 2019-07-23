import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/shared';
import {
  TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, IndexHeader, ImgTxtBtn, Summary, TwoImagesLayout, Downloads
} from './components';
import Device from '/src/shared/device';
import services from '/src/services';

// import { firestoreConnect } from 'react-redux-firebase';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.didMount = false;
  }

  componentDidMount() {
    this.didMount = true;
  }

  render() {
    const { color, data, name, art } = this.props;
    if (data) console.log(data.coverTagLine);
    return data ? (
      <Fragment >
        <IndexHeader index={1} header={data.screen1Title} color={color} />
        <IndexHeader index={2} header={data.screen2Title} color={color} />
        <IndexHeader index={3} header={data.screen3Title} color={color} />
        <IndexHeader index={4} header="Key Features" color={color} />
        <IndexHeader index={5} header="Two Pictures Layout" color={color} />
        <IndexHeader index={6} header="Summary" color={color} />
        <IndexHeader index={7} header="Downloads" color={color} />
        <IndexHeader index={8} header="Clinical" />
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
            showOnFrame={0}
          />
          <TwoColumnLayout
            article={data.screen1Body}
            footNotes={[data.screen1Footnote1, data.screen1Footnote2, data.screen1Footnote3]}
            showOnFrame={1}
          />
          <ImgTxtBtn
            img={data.screen2Image}
            txt={data.screen2Body}
            footNotes={[data.screen2Footnote1, data.screen2Footnote2, data.screen2Footnote3]}
            pdfSrc={data.screen2PDF}
            imgSubTitle={data.screen2ImageSubtitle}
            showOnFrame={2}
            themeColor={color}
          />
          <ImgTxtBtn
            youtube={data.screen3Videolink}
            txt={data.screen3Body}
            footNotes={[data.screen3Footnote1, data.screen3Footnote2, data.screen3Footnote3]}
            showOnFrame={3}
            themeColor={color}
          />
          <ThreeColumnLayout showOnFrame={4} data={[{
            id: '1',
            text: 'A variety of models'
          }, {
            id: '2',
            text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
          }, {
            id: '3',
            text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
          }, {
            id: '4',
            text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
          }, {
            id: '5',
            text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
          }, {
            id: '6',
            text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
          }]} />
          <TwoImagesLayout
            showOnFrame={5}
            image1="https://www.deadlineclaims.com/wp-content/uploads/2017/02/placeholder-image.jpg"
            image2="https://www.deadlineclaims.com/wp-content/uploads/2017/02/placeholder-image.jpg"
            img1Description="A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models"
            img2Description="A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models"
          />
          <Summary showOnFrame={6} />
          <Downloads
            showOnFrame={7}
            image="https://www.deadlineclaims.com/wp-content/uploads/2017/02/placeholder-image.jpg"
            imageTitle="Example Title"
            brochure="http://www.africau.edu/images/default/sample.pdf"
            ifu="http://www.africau.edu/images/default/sample.pdf"
            patientCard="http://www.africau.edu/images/default/sample.pdf"
            instructions="http://www.africau.edu/images/default/sample.pdf"
            themeColor={color}

          />
          <Clinical showOnFrame={8} themeColor={color} />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  art: PropTypes.string.isRequired,
  data: PropTypes.object,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
  color: services.products.selectors.color(state),
  data: services.reactor.selectors.pageData(state, services.products.selectors.name(state)),
  name: services.products.selectors.name(state),
  art: services.products.selectors.art(state),
});

export default compose(
  connect(mapStateToProps, {}),
)(Product);

// const schema = [{
//   key: 'coverTagLine',
//   label: 'Cover tagline',
//   maxChars: 70,
//   required: true,
//   type: 'multi-line-preserve-lines',
//   validateWith: 'min-max',
// }, {
//   key: 'eventTitle',
//   label: 'Main event title',
//   maxChars: 60,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'eventDateFrom',
//   label: 'Date - Start',
//   required: true,
//   type: 'date',
//   validateWith: 'date-time',
// }, {
//   key: 'eventDateTo',
//   label: 'Date - End',
//   required: true,
//   type: 'date',
//   validateWith: 'date-time',
// }, {
//   key: 'eventAddress',
//   label: 'Location',
//   maxChars: 30,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'eventLinkTo',
//   label: 'URL link',
//   required: true,
//   type: 'link',
//   validateWith: 'link',
// }, {
//   key: 'screen1Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen1Body',
//   label: 'Body',
//   maxChars: 950,
//   required: true,
//   type: 'multi-line-preserve-lines',
//   validateWith: 'min-max',
// }, {
//   key: 'screen1Footnote1',
//   label: 'Footnote 1',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen1Footnote2',
//   label: 'Footnote 2',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen1Footnote3',
//   label: 'Footnote 3',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen2Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, { key: 'screen2Image', label: 'Image', required: true, type: 'image', }, {
//   key: 'screen2ImageSubtitle',
//   label: 'Image subtitle',
//   maxChars: 50,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen2Body',
//   label: 'Body',
//   maxChars: 450,
//   required: true,
//   type: 'multi-line-preserve-lines',
//   validateWith: 'min-max',
// }, { key: 'screen2PDF', label: 'PDF', required: true, type: 'pdf', }, {
//   key: 'screen2Footnote1',
//   label: 'Footnote 1',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen2Footnote2',
//   label: 'Footnote 2',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen2Footnote3',
//   label: 'Footnote 3',
//   maxChars: 250,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// },
// {
//   key: 'screen3Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen3Videolink',
//   label: 'YOUTUBE link',
//   required: true,
//   type: 'link',
//   validateWith: 'link',
// }, {
//   key: 'screen3Body',
//   label: 'Body',
//   maxChars: 950,
//   required: true,
//   type: 'multi-line-preserve-lines',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet1',
//   label: 'Bullet 1',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet2',
//   label: 'Bullet 2',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet3',
//   label: 'Bullet 3',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet4',
//   label: 'Bullet 4',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet5',
//   label: 'Bullet 5',
//   maxChars: 170,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen4Bullet6',
//   label: 'Bullet 6',
//   maxChars: 170,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen5Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, { key: 'screen5Image1', label: 'Image 1', required: true, type: 'image', }, {
//   key: 'screen5Image1Subtitle',
//   label: 'Image subtitle',
//   maxChars: 50,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, { key: 'screen5Image2', label: 'Image 2', required: true, type: 'image', }, {
//   key: 'screen5Image2Subtitle',
//   label: 'Image subtitle',
//   maxChars: 50,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen6Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, { key: 'screen6Image', label: 'Image 2', required: true, type: 'image', }, {
//   key: 'screen6ImageSubtitle',
//   label: 'Image subtitle',
//   maxChars: 50,
//   required: false,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, { key: 'brochure', label: 'Brochure PDF', required: false, type: 'pdf', }, {
//   key: 'ifu',
//   label: 'IFU PDF',
//   required: false,
//   type: 'pdf',
// }, { key: 'patientCard', label: 'Patiend card PDF', required: false, type: 'pdf', }, {
//   key: 'instructions',
//   label: 'Reprocessing instructions PDF',
//   required: false,
//   type: 'pdf',
// }, {
//   key: 'screen7Title',
//   label: 'Screen title',
//   maxChars: 50,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen7Bullet1',
//   label: 'Bullet 1',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen7Bullet2',
//   label: 'Bullet 2',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen7Bullet3',
//   label: 'Bullet 3',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }, {
//   key: 'screen7Bullet4',
//   label: 'Bullet 4',
//   maxChars: 170,
//   required: true,
//   type: 'multi-line',
//   validateWith: 'min-max',
// }];
