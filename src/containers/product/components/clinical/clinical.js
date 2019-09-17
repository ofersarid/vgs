import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
import Device from '/src/shared/device';
import { SnapScroll, FadeIn, DropMenu, Button } from '/src/shared';
import services from '/src/services';
import utils from '/src/utils';
import layout from '/src/shared/styles/layout.scss';
import styles from './styles.scss';
import Carousel from '../../../../shared/carousel/carousel';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderData() {
    const { articles, color } = this.props;
    const dom = articles.map((m, i) => (
      <div className={cx(styles.outerWrapper)} key={m.link} >
        <Button
          className={styles.innerWrapper}
          tag="a"
          target="_blank"
          rel="noopener noreferrer"
          href={m.link}
          waveColor={color === '#0272BA' ? 'blue' : 'purple'}
        >
          <h3 className={styles.date} >{moment(m.dateTime.toDate()).format('MMMM Do, YYYY')}</h3 >
          <p className={cx('small', styles.header)} style={{ color }} >{m.description}</p >
          <p className={cx('small', styles.source)} >{m.source}</p >
        </Button >
      </div >
    ));
    return dom;
  }

  resolveVolume() {
    switch (true) {
      case utils.isMobile():
        return 1;
      case utils.isTablet():
        return 2;
      default:
        return 3;
    }
  }

  render() {
    const { color, isMobile, isTablet } = this.props;
    const menuOptions = [{ display: 'publications', value: 'publications' }];
    return (
      <FadeIn spread >
        <div className={cx(styles.clinical, layout.inner)} >
          <DropMenu options={menuOptions} selected={menuOptions[0]} triggerClass={styles.menuTrigger} color={color} />
          <Carousel
            displayVolume={this.resolveVolume()}
            className={styles.clinicalCarousel}
            color={color}
            navLocation={isMobile || isTablet ? 'bottom' : 'horizontal'}
            prevBtnTxt="New"
            nextBtnTxt="Old"
          >
            {this.renderData()}
          </Carousel >
        </div >
      </FadeIn >
    );
  }
}

Clinical.propTypes = {
  themeColor: PropTypes.string.isRequired,
  disableScrollSnap: PropTypes.func.isRequired,
  isTablet: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  disableNext: PropTypes.bool.isRequired,
  disablePrev: PropTypes.bool.isRequired,
  articles: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isTablet: Device.selectors.isTablet(state),
  isMobile: Device.selectors.isMobile(state),
  disableNext: SnapScroll.selectors.disableNext(state),
  disablePrev: SnapScroll.selectors.disablePrev(state),
  color: services.vgs.selectors.color(state),
  articles: _sortBy(services.reactor.selectors.collectionData(
    state,
    `publications - ${services.products.selectors.name(state)}`
  ), item => item.dateTime.toDate()).reverse(),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
