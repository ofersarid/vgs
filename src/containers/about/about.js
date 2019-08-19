import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll } from '/src/shared';
import services from '/src/services';
import Cover from './components/cover/cover';
// import Header from './components/header/header';
import styles from './styles.scss';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class About extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <div className={styles.grayBg} />
        {/*<Header index={2} text="OUR PRODUCTS" />*/}
        {/*<Header index={3} text="GLOBAL IMPACT" />*/}
        <SnapScroll >
          <Cover txt={data.coverBody} />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

About.propTypes = {
  // frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'about'),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(About);
