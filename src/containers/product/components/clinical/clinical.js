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
import { PlayCircle as Play } from 'styled-icons/boxicons-regular/PlayCircle';
import { DocumentText as PDF } from 'styled-icons/typicons/DocumentText';
import { FilePaper2 as Publication } from 'styled-icons/remix-line/FilePaper2';
import styles from './styles.scss';
import Carousel from '../../../../shared/carousel/carousel';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      type: 'publications',
    };
  }

  renderData() {
    const { articles, color } = this.props;
    const { type } = this.state;
    let dom = <div className={styles.empty} >No articles published yet</div >;
    if (articles[type] && articles[type].length) {
      switch (type) {
        case 'publications':
          dom = _sortBy(articles.publications, item => item.dateTime.toDate()).reverse().map(m => (
            <div className={cx(styles.outerWrapper)} key={m.id} >
              <Button
                className={styles.innerWrapper}
                tag="a"
                target="_blank"
                rel="noopener noreferrer"
                href={m.link}
              >
                <h3 className={styles.date} >
                  <Publication />
                  <span className={styles.txt} >{moment(m.dateTime.toDate()).format('MMMM Do, YYYY')}</span>
                </h3 >
                <p className={cx('small', styles.header)} style={{ color }} >{m.description}</p >
                <div className={styles.divider} />
                <p className={cx('small', styles.source)} >{m.source}</p >
              </Button >
            </div >
          ));
          break;
        case 'education':
          dom = _sortBy(articles.education, item => item.date.toDate()).reverse().map(item => (
            <div className={cx(styles.outerWrapper)} key={item.id} >
              <Button
                className={styles.innerWrapper}
                tag="a"
                target="_blank"
                rel="noopener noreferrer"
                href={item.youtube || item.pdf}
              >
                <h3 className={styles.date} >
                  {item.youtube ? <Play /> : <PDF />}
                  <span className={styles.txt}>{moment(item.date.toDate()).format('MMMM Do, YYYY')}</span>
                </h3 >
                <p className={cx('small', styles.header)} style={{ color }} >{item.title}</p >
                <div className={styles.divider} />
                <p className={cx('small', styles.source)} >{item.subtitle}</p >
              </Button >
            </div >
          ));
          break;
        default:
          break;
      }
    }
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

  changeType(type) {
    this.setState({ type: type.toLowerCase() });
  }

  render() {
    const { color } = this.props;
    const { type } = this.state;
    const menuOptions = ['publications', 'education'];
    return (
      <FadeIn spread >
        <div className={cx(styles.clinical, layout.inner)} >
          <DropMenu
            options={menuOptions}
            selected={type}
            triggerClass={styles.menuTrigger}
            color={color}
            onChange={this.changeType}
          />
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
  articles: PropTypes.shape({
    publications: PropTypes.array,
    education: PropTypes.array,
  }).isRequired,
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
