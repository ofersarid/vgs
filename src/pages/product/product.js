import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/components';
import { TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, IndexHeader, ImgTxtBtn, Summary } from './components';
import Device from '/src/components/device';
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
      <Fragment>
        <IndexHeader index={1} header={data.screen1Title} color={color} />
        <IndexHeader index={2} header={data.screen2Title} color={color} />
        <IndexHeader index={3} header="Key Features" color={color} />
        <IndexHeader index={4} header="Summary" color={color} />
        <IndexHeader index={5} header="Clinical" />
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
          <ThreeColumnLayout showOnFrame={2} />
          <ImgTxtBtn
            img={data.screen2Image}
            txt={data.screen2Body}
            footNotes={[data.screen2Footnote1, data.screen2Footnote2, data.screen2Footnote3]}
            pdfSrc={data.screen2PDF}
            imgSubTitle={data.screen2ImageSubtitle}
            showOnFrame={3}
            themeColor={color}
          />
          <Summary showOnFrame={4} />
          <Clinical showOnFrame={5} themeColor={color} />
        </SnapScroll >
      </Fragment>
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
