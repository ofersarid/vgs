import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, Layout } from '/src/components/index';
import Device from '/src/components/device/index';
import types from '../types';
import dataMock from './data.mock';
import donut from './donut.png';

// import { firestoreConnect } from 'react-redux-firebase';

class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.didMount = false;
  }

  componentDidMount() {
    this.didMount = true;
  }

  render() {
    return (
      <SnapScroll >
        <Layout.ProductCover
          art={donut}
          themeColor="blue"
          name="Frame"
          description="EXTERNAL SUPPORT TECHNOLOGHY FOR PERIPHERAL VASCULAR RECONSTRUCTION"
          footer={{
            title: 'AATS 98th Annual Meeting in San Diego',
            dateFrom: new Date(),
            dateTo: new Date(),
            address: '62 Hadarim street pardess hanna',
            linkTo: 'home/danny',
          }}
        />
        {dataMock.map(d => {
          return <Layout.TwoColumnLayout
            key={d.title}
            header={d.title}
            footNotes={d.footNotes}
            article={d.article}
          />;
        })}
      </SnapScroll >
    );
  }
}

Home.propTypes = types.page;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  // contacts: Collections.selectors.collection(state, '8gFxx830klmI0HDeOIEU'),
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
)(Home);
