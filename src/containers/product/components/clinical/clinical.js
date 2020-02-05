import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _sortBy from 'lodash/sortBy';
import moment from 'moment';
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
    const dom = _sortBy(articles, item => item.dateTime.toDate()).reverse().map(m => (
      <div className={cx(styles.outerWrapper)} key={m.id} >
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
          <div className={styles.divider} />
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
    const { color } = this.props;
    const menuOptions = [{ display: 'publications', value: 'publications' }];
    return (
      <FadeIn spread >
        <div className={cx(styles.clinical, layout.inner)} >
          <DropMenu options={menuOptions} selected={menuOptions[0]} triggerClass={styles.menuTrigger} color={color} />
          <Carousel
            displayVolume={this.resolveVolume()}
            className={styles.clinicalCarousel}
            color={color}
            navLocation="bottom"
            prevBtnTxt="NEW"
            nextBtnTxt="OLD"
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
  articles: PropTypes.arrayOf(PropTypes.shape({
    dateTime: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isTablet: services.device.selectors.type(state) === 'tablet',
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
