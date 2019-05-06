import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Device from '/src/device/index';
import types from '../types';
// import { firestoreConnect } from 'react-redux-firebase';

const Home = props => {
  console.log(props.contacts);
  return (
    <Fragment >
      <h1 >Welcome VGS</h1 >
    </Fragment >
  );
};

Home.propTypes = types;

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
