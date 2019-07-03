import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/components';
import { TwoColumnLayout, Clinical, Cover, IndexHeader, ImgTxtBtn } from './components';
import Device from '/src/components/device';
import mock from './mocks/data.mock';

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
    return (
      <Fragment>
        <IndexHeader index={1} header="About" />
        <IndexHeader index={2} header="Key Features" />
        <IndexHeader index={3} header="Clinical" />
        <SnapScroll start={0} >
          <Cover
            art={mock.cover.art}
            themeColor={mock.themeColor}
            name={mock.cover.name}
            description={mock.cover.description}
            footer={mock.cover.footer}
            showOnFrame={0}
          />
          <TwoColumnLayout
            key={mock.about.title}
            header={mock.about.title}
            footNotes={mock.about.footNotes}
            article={mock.about.article}
            showOnFrame={1}
          />
          <ImgTxtBtn
            img={mock.keyFeatures.img}
            txt={mock.keyFeatures.txt}
            footNotes={mock.keyFeatures.footNotes}
            pdfSrc={mock.keyFeatures.pdfSrc}
            title={mock.keyFeatures.title}
            showOnFrame={2}
            themeColor={mock.themeColor}
          />
          <Clinical showOnFrame={3} themeColor={mock.themeColor} articles={mock.clinical} />
        </SnapScroll >
      </Fragment>
    );
  }
}

Product.propTypes = {
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
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
