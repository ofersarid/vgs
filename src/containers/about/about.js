import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, IndexHeader, TwoColumnLayout } from '/src/shared';
import services from '/src/services';
import Cover from './components/cover/cover';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class About extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
    props.setColor('#005728');
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <IndexHeader index={1} header="ABOUT VGS" />
        {/*<Header index={3} text="GLOBAL IMPACT" />*/}
        <SnapScroll >
          <Cover txt={data.coverBody} />
          <TwoColumnLayout
            article={data.aboutBody}
            footNotes={[data.aboutBodyFootnote1, data.aboutBodyFootnote2, data.aboutBodyFootnote3]}
          />
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

About.propTypes = {
  // frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'about'),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(About);
