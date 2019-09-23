import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Device from '/src/shared/device';
import utils from '/src/utils';
import { SnapScroll, IndexHeader, TwoColumnLayout, ReadMoreSection } from '/src/shared';
import services from '/src/services';
import Cover from './components/cover/cover';
import cx from 'classnames';
import styles from '../product/components/img-txt-btn/styles.scss';
import layout from '/src/shared/styles/layout.scss';

class About extends PureComponent {
  constructor(props) {
    super(props);
    props.setColor('#005728');
    props.updateFrameIndex(0);
  }

  render() {
    const { data, isMobile, color } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <IndexHeader index={1} header="ABOUT VGS" hideIndex />
        {/*<Header index={3} text="GLOBAL IMPACT" />*/}
        <SnapScroll >
          <Cover txt={isMobile ? data.coverBodyMobile : data.coverBody} />
          {utils.isMobile() ? (
            <ReadMoreSection
              maxLines={12}
              html={
                <section className={cx(layout.inner)} >
                  <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: data.aboutBodyMobile.replace(/\n\r?/g, '<br />') }} />
                </section >
              }
              more={(
                <Fragment >
                  <h1 style={{ color }} >VGS</h1 >
                  <h2 style={{ color }} >ABOUT</h2 >
                  <p className={cx(styles.txt)} dangerouslySetInnerHTML={{ __html: data.aboutBody.replace(/\n\r?/g, '<br />') }} />
                </Fragment >
              )}
            />
          ) : (
            <TwoColumnLayout
              article={data.aboutBody}
            />
          )}
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
  frame: PropTypes.number.isRequired,
  lastFrame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'about'),
  isMobile: Device.selectors.isMobile(state),
  lastFrame: services.vgs.selectors.lastFrame(state, 'about'),
  frame: SnapScroll.selectors.frame(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
  updateFrameIndex: index => dispatch(SnapScroll.actions.updateFrameIndex(index)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(About);
