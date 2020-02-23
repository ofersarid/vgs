import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, VideoAsBg, FadeIn } from '/src/shared';
import isEqual from 'lodash/isEqual';
import services from '/src/services';
import cx from 'classnames';
import layout from '/src/shared/styles/layout.scss';
import bgPic from '/src/assets/news-events-bg.jpg';
import video from '/src/assets/news-events-bg.mp4';
import utils from '/src/utils';
import EventCarousel from './event-carousel';
import styles from './styles.scss';

class NewsAndEvents extends Component {
  constructor(props) {
    super(props);
    props.setColor('#005728');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.data, this.props.data) || nextProps.frame !== this.props.frame;
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return (
      <SnapScroll >
        <FadeIn >
          {!utils.isMobile() && <VideoAsBg src={video} className={styles.video} />}
          <img src={bgPic} className={styles.bgImg} alt="background image" />
          <div className={cx(layout.inner, styles.onePager)} >
            <h2 >NEWS & EVENTS</h2 >
            <div className={styles.carouselWrapper} >
              {data && <EventCarousel data={data} />}
            </div >
          </div >
        </FadeIn >
      </SnapScroll >
    );
  }
}

NewsAndEvents.propTypes = {
  data: PropTypes.array,
  setColor: PropTypes.func.isRequired,
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  data: services.reactor.selectors.collectionData(state, 'news & events'),
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(NewsAndEvents);
