import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, TwoColumnLayout } from '/src/components/index';
import Device from '/src/components/device/index';
import FirstLook from './first-look';
import types from '../types';

// import { firestoreConnect } from 'react-redux-firebase';

const footer = '<ol><li>item - 1</li><li>item - 2</li></ol>';

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
        <TwoColumnLayout header="Frame 1" index={1} footer={footer} />
        <TwoColumnLayout header="Frame 2" index={2} footer={footer} />
        <TwoColumnLayout header="Frame 3" index={3} footer={footer} />
        <TwoColumnLayout header="Frame 4" index={4} footer={footer} />
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
