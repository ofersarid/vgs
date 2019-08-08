import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, FadeInOut } from '/src/shared';
import services from '/src/services';
import homeCoverPic from '/src/assets/home_cover.jpg';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import OurProducts from './components/our-products/our-products';
import GlobalImpact from './components/global-impact/global-impact';
import Header from './components/header/header';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
  }

  render() {
    const { data, frame } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.grayBg} />
        <FadeInOut show={frame < 2} className={styles.bgWrap}>
          <div className={styles.coverPic} style={{ backgroundImage: `url(${homeCoverPic})` }} />
          <div className={styles.gradientOverLay} />
        </FadeInOut >
        <Header index={2} text="OUR PRODUCTS" />
        <Header index={3} text="GLOBAL IMPACT" />
        <SnapScroll >
          <Cover
            tagLine={data.coverTagLine}
            footer={{
              title: data.eventTitle,
              dateFrom: data.eventDateFrom,
              dateTo: data.eventDateTo,
              address: data.eventAddress,
              linkTo: data.eventLinkTo,
            }}
          />
          <SingleParagraph
            text="Lorem ipsum dolor sit amet, homero sadipscing est in. Dolore deserunt consectetuer in ius, ex est eius invidunt. Id nam vidit veniam pertinax. Vel tantas nominati eu. His diam quot scripserit in, omnium iuvaret senserit vim an. His cu latine incorrupte accommodare, semper vocent eligendi pro an. Mucius imperdiet reformidans cu sea, sed inani nulla zril ad. Graeci sapientem ne pro. Primis labore his ex. Vim ne brute indoctum. Elaboraret instructior voluptatibus ad vis, pro ex paulo prompta." />
          <OurProducts
            link="https://www.google.com"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." />
          <GlobalImpact
            regions={[{}, {}, {}]}
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

Home.propTypes = {
  frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'home'),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(3)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
