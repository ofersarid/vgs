import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, TwoColumnLayout } from '/src/components/index';
import Device from '/src/components/device/index';
import types from '../types';

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
        <TwoColumnLayout header="Welcome VGS" index={0} />
        <TwoColumnLayout header="Frame 1.1" index={1} />
        <TwoColumnLayout header="Frame 1.2" index={2} />
        <TwoColumnLayout header="Frame 1.3" index={3} />
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
