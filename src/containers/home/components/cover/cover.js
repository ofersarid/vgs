import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventFooter, MediaLoader } from '/src/shared';
import homeCoverPicMobile from '/src/assets/home_cover_art_mobile.jpg';
import homeCoverPicTablet from '/src/assets/home_cover_art_tablet.jpg';
import homeCoverPicDesktop from '/src/assets/home_cover_art_desktop.jpg';
import Device from '/src/shared/device';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  resolvePic() {
    const { isMobile, isTouchDevice } = this.props;
    if (isMobile) {
      return homeCoverPicMobile;
    } else if (isTouchDevice) {
      return homeCoverPicTablet;
    }
    return homeCoverPicDesktop;
  }

  render() {
    const { footer } = this.props;
    return (
      <div className={styles.cover} >
        <MediaLoader src={this.resolvePic()} preferWidth />
        {/*<div className={styles.coverPic} style={{ backgroundImage: `url(${this.resolvePic()})` }} />*/}
        <div className={styles.header} >
          VASCULAR<br />
          GRAFT<br />
          SOLUTIONS
        </div >
        {footer ? <EventFooter footer={footer} /> : null}
      </div >
    );
  }
}

Cover.propTypes = {
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
  isMobile: PropTypes.bool.isRequired,
  isTouchDevice: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
  isTouchDevice: Device.selectors.isTouchDevice(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
