import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Button, Carousel, RatioBox, MediaLoader } from '/src/shared';
import services from '/src/services';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GitBranch } from 'styled-icons/feather/GitBranch';
import { Heart } from 'styled-icons/evil/Heart';
import utils from '/src/utils';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';
import styles from './styles.scss';

const GOLDEN_RATIO = 1 / 1.6;

const ProductsShelf = ({ color, data }) => {
  const navigate = to => {
    hashHistory.push(to);
  };

  const resolveVolume = () => {
    switch (true) {
      case utils.isMobile():
        return 1;
      case utils.isTablet():
        return 2;
      default:
        return 3;
    }
  };

  return data ? (
    <Carousel
      displayVolume={resolveVolume()}
      className={styles.shelf}
      color={color}
      navLocation="bottom"
      prevBtnTxt={utils.isMobile() ? undefined : 'BACK'}
      nextBtnTxt={utils.isMobile() ? undefined : 'MORE'}
    >
      <div key="item-vest" className={styles.outerWrapper} >
        <Button
          className={cx(styles.innerWrapper, styles.vest)}
          onClick={() => navigate('/vest/0')}
          waveColor="red"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >VEST</span >
            <span className={styles.headerRight} >
              <p >Cardiac</p >
              <Heart />
            </span >
          </section >
          <RatioBox ratio={GOLDEN_RATIO} className={styles.img} >
            <MediaLoader src={data['vestPic--pic']} />
          </RatioBox >
          <LinesEllipsisLoose
            text={data.vestDescription}
            maxLine='2'
            lineHeight='1.5em'
            className={styles.p}
          />
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-frameFR" >
        <Button
          className={cx(styles.innerWrapper, styles.frameFr)}
          onClick={() => navigate('/frameFr/0')}
          waveColor="lagoon"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >FRAME FR</span >
            <span className={styles.headerRight} >
              <p >Vascular</p >
              <GitBranch />
            </span >
          </section >
          <RatioBox ratio={GOLDEN_RATIO} className={styles.img} >
            <MediaLoader src={data['frameFRPic--pic']} />
          </RatioBox >
          <LinesEllipsisLoose
            text={data.frameFRDescription}
            maxLine='2'
            lineHeight='1.5em'
            className={styles.p}
          />
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-frame" >
        <Button
          className={cx(styles.innerWrapper, styles.frame)}
          onClick={() => navigate('/frame/0')}
          waveColor="blue"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >FRAME</span >
            <span className={styles.headerRight} >
              <p >Vascular</p >
              <GitBranch />
            </span >
          </section >
          <RatioBox ratio={GOLDEN_RATIO} className={styles.img} >
            <MediaLoader src={data['framePic--pic']} />
          </RatioBox >
          <LinesEllipsisLoose
            text={data.frameDescription}
            maxLine='2'
            lineHeight='1.5em'
            className={styles.p}
          />
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-viola" >
        <Button
          className={cx(styles.innerWrapper, styles.viola)}
          onClick={() => navigate('/viola/0')}
          waveColor="purple"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >VIOLA</span >
            <span className={styles.headerRight} >
              <p >Cardiac</p >
              <Heart />
            </span >
          </section >
          <RatioBox ratio={GOLDEN_RATIO} className={styles.img} >
            <MediaLoader src={data['violaPic--pic']} />
          </RatioBox >
          <LinesEllipsisLoose
            text={data.violaDescription}
            maxLine='2'
            lineHeight='1.5em'
            className={styles.p}
          />
        </Button >
      </div >
    </Carousel >
  ) : null;
};

ProductsShelf.propTypes = {
  color: PropTypes.string.isRequired,
  data: PropTypes.object,

};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductsShelf);
