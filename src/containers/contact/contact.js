import React, { Fragment, PureComponent } from 'react'; // eslint-disable-line
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Device from '/src/shared/device';
import utils from '/src/utils'; // eslint-disable-line
import { SnapScroll, IndexHeader, TwoColumnLayout, ReadMoreSection } from '/src/shared'; // eslint-disable-line
import services from '/src/services';
import Cover from './components/cover/cover'; // eslint-disable-line
import cx from 'classnames'; // eslint-disable-line
import styles from '../product/components/img-txt-btn/styles.scss'; // eslint-disable-line
import layout from '/src/shared/styles/layout.scss'; // eslint-disable-line

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class Contact extends PureComponent {
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
    updateLastFrame(frame, 'contact.js');
  }

  render() {
    const { data, isMobile, color } = this.props; // eslint-disable-line
    return <div></div>;
  }
}

Contact.propTypes = {
  // frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  setColor: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  updateFrameIndex: PropTypes.func.isRequired,
  updateLastFrame: PropTypes.func.isRequired,
  frame: PropTypes.number.isRequired,
  lastFrame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'distributors'),
  isMobile: Device.selectors.isMobile(state),
  lastFrame: services.vgs.selectors.lastFrame(state, 'contact'),
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
  updateFrameIndex: index => dispatch(SnapScroll.actions.updateFrameIndex(index)),
  updateLastFrame: (frame, context) => dispatch(services.vgs.actions.updateLastFrame(frame, context)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Contact);
