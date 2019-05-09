import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/elements';
import Device from '/src/device/index';
import types from '../types';
import './styles.scss';
// import { firestoreConnect } from 'react-redux-firebase';

const Home = props => {
  return (
    <SnapScroll
      customTransition="my-transition"
      customDuration={{
        enter: 300,
        exit: 300,
      }}
    >
      <div style={{
        backgroundColor: 'transparent',
      }} >
        <h1 className="page-header">Welcome VGS</h1 >
      </div >
      <div style={{
        backgroundColor: 'transparent',
      }} >
        <h1 className="page-header">Frame 1.1</h1 >
      </div >
      <div style={{
        backgroundColor: 'transparent',
      }} >
        <h1 className="page-header">Frame 1.2</h1 >
      </div >
      <div style={{
        backgroundColor: 'transparent',
      }} >
        <h1 className="page-header">Frame 1.3</h1 >
      </div >
    </SnapScroll >
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
