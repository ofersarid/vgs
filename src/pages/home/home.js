import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, TwoColumnLayout } from '/src/components/index';
import Device from '/src/components/device/index';
import FirstLook from './first-look';
import types from '../types';

// import { firestoreConnect } from 'react-redux-firebase';

const footNotes = [
  'note 1',
  'note 2',
  'note 3'
];

const article = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed justo sit amet ligula vulputate tincidunt vitae id ligula. Etiam luctus tincidunt malesuada. Nulla consequat vestibulum lacus a porta. Sed vulputate neque quis neque pretium euismod. Nam lacinia finibus velit, et sollicitudin urna mollis id. Morbi neque nisi, viverra laoreet rhoncus in, rutrum vel dolor. Proin nec nulla ut massa gravida molestie. Nam pulvinar elementum lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In tempus dolor mattis velit blandit, in rutrum orci ornare. Morbi euismod in lorem vel tincidunt. Morbi et dapibus nunc.';

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
        <TwoColumnLayout header="Frame 1" footNotes={footNotes} article={article} />
        <TwoColumnLayout header="Frame 2" footNotes={footNotes} article={article} />
        <TwoColumnLayout header="Frame 3" footNotes={footNotes} article={article} />
        <TwoColumnLayout header="Frame 4" footNotes={footNotes} article={article} />
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
