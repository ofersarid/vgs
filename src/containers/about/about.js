import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Device from '/src/shared/device';
import { SnapScroll, IndexHeader, TwoColumnLayout } from '/src/shared';
import services from '/src/services';
import Cover from './components/cover/cover';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class About extends PureComponent {
  constructor(props) {
    super(props);
    props.setColor('#005728');
  }

  componentDidMount() {
    const { updateFrameIndex, lastFrame } = this.props;
    updateFrameIndex(lastFrame);
  }

  componentWillUnmount() {
    const { updateLastFrame, frame } = this.props;
    updateLastFrame(frame, 'about');
  }

  render() {
    const { data, isMobile } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <IndexHeader index={1} header="ABOUT VGS" />
        {/*<Header index={3} text="GLOBAL IMPACT" />*/}
        <SnapScroll >
          <Cover txt={isMobile ? data.coverBodyMobile : data.coverBody} />
          <TwoColumnLayout
            article={isMobile ? data.aboutBodyMobile : data.aboutBody}
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
  setColor: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  updateFrameIndex: PropTypes.func.isRequired,
  updateLastFrame: PropTypes.func.isRequired,
  frame: PropTypes.number.isRequired,
  lastFrame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'about'),
  isMobile: Device.selectors.isMobile(state),
  lastFrame: services.vgs.selectors.lastFrame(state, 'about'),
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
  updateFrameIndex: index => dispatch(SnapScroll.actions.updateFrameIndex(index)),
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(About);
