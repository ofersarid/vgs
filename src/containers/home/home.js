import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import autoBind from 'auto-bind';
import cx from 'classnames';
import { hashHistory } from 'react-router';
import {
  SnapScroll,
  FadeIn,
  IndexHeader,
  Button,
  RatioBox,
  MediaLoader
} from '/src/shared';
import services from '/src/services';
import LinesEllipsisLoose from 'react-lines-ellipsis/lib/loose';
import { GitBranch } from 'styled-icons/feather/GitBranch';
import { Heart } from 'styled-icons/evil/Heart';
import layout from '/src/shared/styles/layout.scss';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import OurProducts from './components/our-products/our-products';
import ProductsShelf from './components/products-shelf/products-shelf';
import styles from './styles.scss';
import Splash from './splash';

const GOLDEN_RATIO = 1 / 1.6;

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.setColor('#005728');
    autoBind(this);
  }

  navigate(to) {
    hashHistory.push(to);
  }

  render() {
    const { data, isMobile, productsData } = this.props;
    return data && productsData ? (
      <Fragment>
        {/*<Header index={2} text="GLOBAL IMPACT" />*/}
        <IndexHeader
          index={1}
          header='VISIONARY SURGICAL TECHNOLOGY'
          hideIndex
        />
        <IndexHeader
          index={2}
          header={isMobile ? 'ABOUT OUR PRODUCTS' : 'OUR PRODUCTS'}
          hideIndex
        />
        <IndexHeader index={3} header='OUR PRODUCTS' hideIndex />
        <IndexHeader index={4} header='OUR PRODUCTS' hideIndex />
        <SnapScroll>
          <Cover
            footer={{
              title: data.eventTitle,
              dateFrom: data.eventDateFrom,
              dateTo: data.eventDateTo,
              address: data.eventAddress,
              linkTo: data.eventLinkTo
            }}
          />
          <SingleParagraph
            text={isMobile ? data.synopsisMobile : data.synopsis}
          />
          {isMobile && (
            <FadeIn className={cx(layout.inner, styles.homeInner)}>
              <p
                dangerouslySetInnerHTML={{
                  __html: data.ourProductsBodyMobile.replace(/\n\r?/g, '<br />')
                }}
              />
            </FadeIn>
          )}
          {isMobile && (
            <FadeIn className={cx(layout.inner, styles.homeInner)}>
              <ProductsShelf>
                <div key='item-vest' className={styles.outerWrapper}>
                  <Button
                    className={cx(styles.innerWrapper, styles.vest)}
                    onClick={() => this.navigate('/vest/0')}
                    waveColor='red'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VEST</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['vestPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.vestDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div key='item-vest2' className={styles.outerWrapper}>
                  <Button
                    className={cx(styles.innerWrapper, styles.vest2)}
                    onClick={() => this.navigate('/vest2/0')}
                    waveColor='red'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VEST 2.0</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['vest2Pic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.vest2Description}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div className={cx(styles.outerWrapper)} key='item-viola'>
                  <Button
                    className={cx(styles.innerWrapper, styles.viola)}
                    onClick={() => this.navigate('/viola/0')}
                    waveColor='purple'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VIOLA</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['violaPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.violaDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
              </ProductsShelf>
            </FadeIn>
          )}
          {isMobile && (
            <FadeIn className={cx(layout.inner, styles.homeInner)}>
              <ProductsShelf>
                <div className={cx(styles.outerWrapper)} key='item-frame'>
                  <Button
                    className={cx(styles.innerWrapper, styles.frame)}
                    onClick={() => this.navigate('/frame/0')}
                    waveColor='blue'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>FRAME</span>
                      <span className={styles.headerRight}>
                        <p>Vascular</p>
                        <GitBranch />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['framePic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.frameDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div className={cx(styles.outerWrapper)} key='item-frameFR'>
                  <Button
                    className={cx(styles.innerWrapper, styles.frameFr)}
                    onClick={() => this.navigate('/frameFr/0')}
                    waveColor='lagoon'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>FRAME FR</span>
                      <span className={styles.headerRight}>
                        <p>Vascular</p>
                        <GitBranch />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['frameFRPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.frameFRDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
              </ProductsShelf>
            </FadeIn>
          )}
          {!isMobile && (
            <OurProducts text={data.ourProductsBody}>
              <ProductsShelf>
                <div key='item-vest' className={styles.outerWrapper}>
                  <Button
                    className={cx(styles.innerWrapper, styles.vest)}
                    onClick={() => this.navigate('/vest/0')}
                    waveColor='red'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VEST</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['vestPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.vestDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div key='item-vest2' className={styles.outerWrapper}>
                  <Button
                    className={cx(styles.innerWrapper, styles.vest2)}
                    onClick={() => this.navigate('/vest2/0')}
                    waveColor='red'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VEST 2.0</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['vest2Pic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.vest2Description}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div className={cx(styles.outerWrapper)} key='item-viola'>
                  <Button
                    className={cx(styles.innerWrapper, styles.viola)}
                    onClick={() => this.navigate('/viola/0')}
                    waveColor='purple'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>VIOLA</span>
                      <span className={styles.headerRight}>
                        <p>Cardiac</p>
                        <Heart />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['violaPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.violaDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
              </ProductsShelf>
            </OurProducts>
          )}
          {!isMobile && (
            <OurProducts text={data.ourProductsBody}>
              <ProductsShelf>
                <div className={cx(styles.outerWrapper)} key='item-frame'>
                  <Button
                    className={cx(styles.innerWrapper, styles.frame)}
                    onClick={() => this.navigate('/frame/0')}
                    waveColor='blue'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>FRAME</span>
                      <span className={styles.headerRight}>
                        <p>Vascular</p>
                        <GitBranch />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['framePic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.frameDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
                <div className={cx(styles.outerWrapper)} key='item-frameFR'>
                  <Button
                    className={cx(styles.innerWrapper, styles.frameFr)}
                    onClick={() => this.navigate('/frameFr/0')}
                    waveColor='lagoon'
                  >
                    <section className={styles.header}>
                      <span className={cx(styles.name)}>FRAME FR</span>
                      <span className={styles.headerRight}>
                        <p>Vascular</p>
                        <GitBranch />
                      </span>
                    </section>
                    <RatioBox ratio={GOLDEN_RATIO} className={styles.img}>
                      <MediaLoader src={productsData['frameFRPic--pic']} />
                    </RatioBox>
                    <LinesEllipsisLoose
                      text={productsData.frameFRDescription}
                      maxLine='2'
                      lineHeight='1.5em'
                      className={styles.p}
                    />
                  </Button>
                </div>
              </ProductsShelf>
            </OurProducts>
          )}
        </SnapScroll>
        {data.splashPublished && <Splash src={data.splash} />}
      </Fragment>
    ) : null;
  }
}

Home.propTypes = {
  frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  productsData: PropTypes.object,
  setColor: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
  productsData: services.reactor.selectors.pageData(state, 'our products'),
  isMobile: services.device.selectors.type(state) === 'mobile'
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setColor: (color) => dispatch(services.vgs.actions.setColor(color))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Home);
