import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/shared';
import {
  TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, IndexHeader, ImgTxtBtn, Summary, TwoImagesLayout
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
        <IndexHeader index={3} header="Key Features" color={color} />
        <IndexHeader index={4} header="Two Pictures Layout" color={color} />
        <IndexHeader index={5} header="Summary" color={color} />
        <IndexHeader index={6} header="Clinical" />
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
          <ThreeColumnLayout showOnFrame={2} data={[{
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
          <ImgTxtBtn
            img={data.screen2Image}
            txt={data.screen2Body}
            footNotes={[data.screen2Footnote1, data.screen2Footnote2, data.screen2Footnote3]}
            pdfSrc={data.screen2PDF}
            imgSubTitle={data.screen2ImageSubtitle}
            showOnFrame={3}
            themeColor={color}
          />
          <TwoImagesLayout
            showOnFrame={4}
            image1="https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/JRe2F6XCHTaBTIFAy0uL7EpkuzG2%2FvFOr1g0ggnoxgGy8wLYj%2Fscreen2Image?alt=media&token=4c8261fd-aefa-4c38-a56c-6725038c949d&noCache=1563270600891"
            image2="https://firebasestorage.googleapis.com/v0/b/reactor-dam.appspot.com/o/JRe2F6XCHTaBTIFAy0uL7EpkuzG2%2FvFOr1g0ggnoxgGy8wLYj%2Fscreen2Image?alt=media&token=4c8261fd-aefa-4c38-a56c-6725038c949d&noCache=1563270600891"
            img1Description="A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models"
            img2Description="A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models"
          />
          <Summary showOnFrame={5} />
          <Clinical showOnFrame={6} themeColor={color} />
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
  data: PropTypes.shape({
    coverTagLine: PropTypes.string.isRequired,
    screen1Title: PropTypes.string.isRequired,
    screen1Body: PropTypes.string.isRequired,
    screen1Footnote1: PropTypes.string,
    screen1Footnote2: PropTypes.string,
    screen1Footnote3: PropTypes.string,
    screen2Title: PropTypes.string.isRequired,
    screen2Image: PropTypes.string.isRequired,
    screen2ImageSubtitle: PropTypes.string,
    screen2Body: PropTypes.string.isRequired,
    screen2PDF: PropTypes.string.isRequired,
    screen2Footnote1: PropTypes.string,
    screen2Footnote2: PropTypes.string,
    screen2Footnote3: PropTypes.string,
  }),
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
  // firestoreConnect(() => ([{
  //   collection: 'collections',
  //   doc: 'xB6QKYKm7tnXl2QNjjfF',
  //   subcollections: [{
  //     collection: 'data',
  //     // where: [['active', '==', true]],
  //     // orderBy: ['name', 'desc'],
  //   }],
  // }])),
)(Product);
