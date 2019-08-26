import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import camelCase from 'lodash/camelCase';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';

import { SnapScroll, Header, Carousel, FadeIn, RatioBox, MediaLoader, Button } from '/src/shared';
import Device from '/src/shared/device';
import layout from '/src/shared/styles/layout.scss';
import services from '/src/services';

import styles from './styles.scss';
import { Spring } from 'react-spring/renderprops-universal';

const resolveLineHeight = (deviceType) => {
  switch (deviceType) {
    case 'tablet':
    case 'desktop':
      return 37;
    default:
      return 24;
  }
};

const CarouselItem = ({ label, description, pic, className, deviceType }) => (
  <div className={cx(className, styles.innerWrapper)} >
    <label >{label}&trade;</label >
    <LinesEllipsisLoose
      text={description}
      maxLine='4'
      lineHeight={resolveLineHeight(deviceType)}
      className={styles.description}
    />
    <RatioBox ratio={1 / 2} className={styles.imgBox} >
      <MediaLoader src={pic} />
    </RatioBox >
    <Button
      color
      onClick={() => {
        hashHistory.push(camelCase(label));
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
  deviceType: PropTypes.string.isRequired,
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
    const { data, deviceType } = this.props;
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
              {activeTab === 'cardiac' && (
                <CarouselItem
                  deviceType={deviceType}
                  wrapperClass={styles.item}
                  label="Viola"
                  className={styles.viola}
                  description={data.violaDescription}
                  pic={data.violaPic} />
              )}
              {activeTab === 'cardiac' && (
                <CarouselItem
                  deviceType={deviceType}
                  wrapperClass={styles.item}
                  label="Vest"
                  className={styles.vest}
                  description={data.vestDescription}
                  pic={data.vestPic} />
              )}
              {activeTab === 'vascular' && (
                <CarouselItem
                  deviceType={deviceType}
                  wrapperClass={styles.item}
                  label="Frame"
                  className={styles.frame}
                  description={data.frameDescription}
                  pic={data.framePic} />
              )}
              {activeTab === 'vascular' && (
                <CarouselItem
                  deviceType={deviceType}
                  wrapperClass={cx(styles.item)}
                  label="Frame FR"
                  className={styles.frameFr}
                  description={data.frameFRDescription}
                  pic={data.frameFRPic} />
              )}
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
  deviceType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  data: services.reactor.selectors.pageData(state, 'our products'),
  deviceType: Device.selectors.deviceType(state),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(OurProducts);
