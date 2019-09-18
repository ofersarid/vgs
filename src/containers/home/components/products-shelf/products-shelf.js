import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { Button, Carousel, RatioBox, MediaLoader } from '/src/shared';
import camelCase from 'lodash/camelCase';
import services from '/src/services';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { GitBranch } from 'styled-icons/feather/GitBranch';
import { Heart } from 'styled-icons/evil/Heart';
import utils from '/src/utils';
import styles from './styles.scss';

const ProductsShelf = ({ updateLastFrame, color, data }) => {
  const navigate = e => {
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].textContent.toLowerCase().replace(' ', '-');
    const CCtext = camelCase(txt);
    hashHistory.push(CCtext);
    updateLastFrame(0, CCtext);
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

  return (
    <Carousel
      displayVolume={resolveVolume()}
      className={styles.shelf}
      color={color}
      navLocation="bottom"
      prevBtnTxt={utils.isMobile() ? undefined : 'BACK'}
      nextBtnTxt={utils.isMobile() ? undefined : 'MORE'}
    >
      <div className={cx(styles.outerWrapper)} key="item-vest" >
        <Button
          className={cx(styles.innerWrapper, styles.vest)}
          onClick={navigate}
          waveColor="red"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >VEST</span >
            <span className={styles.headerRight}>
              <p >Cardiac</p >
              <Heart />
            </span >
          </section >
          <RatioBox ratio={1 / 2} className={styles.img} >
            <MediaLoader src={data.vestPic} />
          </RatioBox >
          <p >
            {data.vestDescription}
          </p >
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-viola" >
        <Button
          className={cx(styles.innerWrapper, styles.viola)}
          onClick={navigate}
          waveColor="purple"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >VIOLA</span >
            <span className={styles.headerRight}>
              <p >Cardiac</p >
              <Heart />
            </span >
          </section >
          <RatioBox ratio={1 / 2} className={styles.img} >
            <MediaLoader src={data.violaPic} />
          </RatioBox >
          <p >
            {data.violaDescription}
          </p >
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-frame" >
        <Button
          className={cx(styles.innerWrapper, styles.frame)}
          onClick={navigate}
          waveColor="blue"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >FRAME</span >
            <span className={styles.headerRight}>
              <p >Vascular</p >
              <GitBranch />
            </span >
          </section >
          <RatioBox ratio={1 / 2} className={styles.img} >
            <MediaLoader src={data.framePic} />
          </RatioBox >
          <p >
            {data.frameDescription}
          </p >
        </Button >
      </div >
      <div className={cx(styles.outerWrapper)} key="item-frameFR" >
        <Button
          className={cx(styles.innerWrapper, styles.frameFr)}
          onClick={navigate}
          waveColor="lagoon"
        >
          <section className={styles.header} >
            <span className={cx(styles.name)} >FRAME FR</span >
            <span className={styles.headerRight}>
              <p >Vascular</p >
              <GitBranch />
            </span >
          </section >
          <RatioBox ratio={1 / 2} className={styles.img} >
            <MediaLoader src={data.frameFRPic} />
          </RatioBox >
          <p >
            {data.frameFRDescription}
          </p >
        </Button >
      </div >
    </Carousel >
  );
};

ProductsShelf.propTypes = {
  updateLastFrame: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  data: PropTypes.object,

};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
  data: services.reactor.selectors.pageData(state, 'our products'),
});

const mapDispatchToProps = dispatch => ({
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductsShelf);
