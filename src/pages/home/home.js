import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/shared';
import services from '/src/services';
import homeCoverPic from '/src/assets/home_cover.jpg';
import Cover from './components/cover/cover';
import SingleParagraph from './components/single-paragraph/single-paragraph';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class Home extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.coverPic} style={{ backgroundImage: `url(${homeCoverPic})` }} >
          <div className={styles.gradientOverLay} />
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
            <SingleParagraph text="Lorem ipsum dolor sit amet, homero sadipscing est in. Dolore deserunt consectetuer in ius, ex est eius invidunt. Id nam vidit veniam pertinax. Vel tantas nominati eu. His diam quot scripserit in, omnium iuvaret senserit vim an. His cu latine incorrupte accommodare, semper vocent eligendi pro an. Mucius imperdiet reformidans cu sea, sed inani nulla zril ad. Graeci sapientem ne pro. Primis labore his ex. Vim ne brute indoctum. Elaboraret instructior voluptatibus ad vis, pro ex paulo prompta." />
          </SnapScroll >
        </div >
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
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Home);
