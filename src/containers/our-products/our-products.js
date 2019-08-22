import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';

import { SnapScroll, Header, Carousel, FadeIn, RatioBox, MediaLoader, Button } from '/src/shared';
import layout from '/src/shared/styles/layout.scss';
import services from '/src/services';

import styles from './styles.scss';
import { Spring } from 'react-spring/renderprops-universal';

const CarouselItem = ({ label, description, pic, className }) => (
  <div className={cx(className, styles.innerWrapper)} >
    <label >{label}&trade;</label >
    <LinesEllipsisLoose
      text={description}
      maxLine='4'
      lineHeight='24'
      className={styles.description}
    />
    <RatioBox ratio={1 / 2} >
      <MediaLoader src={pic} />
    </RatioBox >
    <Button
      color
      onClick={() => {
        hashHistory.push('our-products');
      }}
      waveColor="white"
      className={cx(styles.btn)}
    >VIEW PRODUCT
    </Button >
  </div >
);

CarouselItem.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  pic: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

class OurProducts extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    props.resetFrame();
    props.setColor('#005728');
    this.state = {
      activeTab: 'vascular',
    };
  }

  switchTab() {
    const { activeTab } = this.state;
    this.setState({ activeTab: activeTab === 'vascular' ? 'cardiac' : 'vascular' });
  }

  render() {
    const { data } = this.props;
    const { activeTab } = this.state;
    return data ? (
      <FadeIn spread >
        <Header index={0} text="PRODUCTS" />
        <SnapScroll >
          <div className={cx(layout.inner, styles.contentWrapper)} >
            <ul className={styles.tabs} >
              <Spring
                from={{ x: 20 }}
                to={{ x: 0 }}
              >
                {spring => <Fragment >
                  <li
                    onClick={this.switchTab}
                    className={cx({
                      [styles.active]: activeTab === 'vascular',
                    })}
                    style={{
                      transform: `translateX(${spring.x}px)`,
                    }}
                  >VASCULAR
                  </li >
                  <li
                    onClick={this.switchTab} className={cx({ [styles.active]: activeTab === 'cardiac' })}
                    style={{
                      transform: `translateX(-${spring.x}px)`,
                    }}
                  >CARDIAC
                  </li >
                </Fragment >}
              </Spring >
            </ul >
            <Carousel className={styles.carousel} >
              <CarouselItem wrapperClass={styles.item} label="Viola" className={styles.viola} description={data.violaDescription} pic={data.violaPic} />
              <CarouselItem wrapperClass={styles.item} label="Vest" className={styles.vest} description={data.vestDescription} pic={data.vestPic} />
              <CarouselItem wrapperClass={styles.item} label="Frame" className={styles.frame} description={data.frameDescription} pic={data.framePic} />
              <CarouselItem wrapperClass={cx(styles.item)} label="Frame FR" className={styles.frameFr} description={data.frameFRDescription} pic={data.frameFRPic} />
            </Carousel >
          </div >
        </SnapScroll >
      </FadeIn >
    ) : null;
  }
}

OurProducts.propTypes = {
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  data: services.reactor.selectors.pageData(state, 'our products'),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(OurProducts);
