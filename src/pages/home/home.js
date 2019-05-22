import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, TwoColumnLayout } from '/src/components/index';
import Device from '/src/components/device/index';
import FirstLook from './first-look';
import types from '../types';
import dataMock from './data.mock';

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
        <FirstLook />
        {dataMock.map(d => {
          return <TwoColumnLayout
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
