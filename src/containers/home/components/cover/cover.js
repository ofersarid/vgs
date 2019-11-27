import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventFooter } from '/src/shared';
import homeCoverPicMobile from '/src/assets/home_cover_art_mobile.jpg';
import homeCoverPicTablet from '/src/assets/home_cover_art_tablet.jpg';
import homeCoverPicDesktop from '/src/assets/home_cover_art_desktop.jpg';
import services from '/src/services';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  resolvePic() {
    const { isMobile, isTablet } = this.props;
    if (isMobile) {
      return homeCoverPicMobile;
    } else if (isTablet) {
      return homeCoverPicTablet;
    }
    return homeCoverPicDesktop;
  }

  render() {
    const { footer } = this.props;
    return (
      <div className={styles.cover} >
        <img src={this.resolvePic()} />
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
  isTablet: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: services.device.selectors.type(state) === 'mobile',
  isTablet: services.device.selectors.type(state) === 'mobile',
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
