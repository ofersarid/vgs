import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, TwoColumnLayout } from '/src/components/index';
import Device from '/src/components/device/index';
import types from '../types';
// import { firestoreConnect } from 'react-redux-firebase';

const Home = ({ frame }) => {
  return (
    <SnapScroll
      customTransition="my-transition"
      customDuration={{
        enter: 300,
        exit: 300,
      }}
    >
      <TwoColumnLayout header="Welcome VGS" enter={frame === 0} exit={frame === 1} />
      <TwoColumnLayout header="Frame 1.1" enter={frame === 1} exit={frame === 2} />
      <TwoColumnLayout header="Frame 1.2" enter={frame === 2} exit={frame === 3} />
      <TwoColumnLayout header="Frame 1.3" enter={frame === 3} exit={frame === 4} />
    </SnapScroll >
  );
};

Home.propTypes = types.page;

const mapStateToProps = state => ({
  deviceType: Device.selectors.deviceType(state),
  deviceOrientation: Device.selectors.deviceOrientation(state),
  frame: SnapScroll.selectors.frame(state),
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
