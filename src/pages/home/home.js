import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/shared';
// import {
//   TwoColumnLayout, ThreeColumnLayout, Clinical, Cover, IndexHeader, ImgTxtBtn, Summary, TwoImagesLayout, Downloads
// } from './components';
import Device from '/src/shared/device';
import services from '/src/services';
import homeCoverPic from '/src/assets/home_cover.jpg';
import Cover from './components/cover/cover';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';

class Home extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { data, orientation, isMobile } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.coverPic} style={{ backgroundImage: `url(${homeCoverPic})` }} >
          <div className={styles.gradientOverLay} />
          <SnapScroll >
            <Cover
              tagLine={data.coverTagLine}
              footer={{
                title: data.eventTitle,
                dateFrom: data.eventDateFrom,
                dateTo: data.eventDateTo,
                address: data.eventAddress,
                linkTo: data.eventLinkTo,
              }}
              showOnFrame={0}
            />
          </SnapScroll >
        </div >
      </Fragment >
    ) : null;
  }
}

Home.propTypes = {
  frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
  isMobile: Device.selectors.isMobile(state),
  orientation: services.vgs.selectors.orientation(state),
});

export default compose(
  connect(mapStateToProps, {}),
)(Home);
