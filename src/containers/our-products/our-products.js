import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { SnapScroll, Header, Carousel, FadeIn } from '/src/shared';
import layout from '/src/shared/styles/layout.scss';
import services from '/src/services';
import styles from './styles.scss';
import cx from 'classnames';

// import { firestoreConnect } from 'react-redux-firebase';
// trigger build

class OurProducts extends PureComponent {
  constructor(props) {
    super(props);
    props.resetFrame();
    props.setColor('#005728');
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return data ? (
      <Fragment >
        <Header index={0} text="PRODUCTS" />
        <SnapScroll >
          <FadeIn spread >
            <div className={cx(layout.inner)} >
              <Carousel >
                <div className={styles.item} >
                  Viola
                </div >
                <div className={styles.item} >
                  Vest
                </div >
              </Carousel >
            </div >
          </FadeIn >
        </SnapScroll >
      </Fragment >
    ) : null;
  }
}

OurProducts.propTypes = {
  // frame: PropTypes.number.isRequired,
  data: PropTypes.object,
  resetFrame: PropTypes.func.isRequired,
  setColor: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // frame: SnapScroll.selectors.frame(state),
  data: services.reactor.selectors.pageData(state, 'our products'),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.updateFrameIndex(0)),
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(OurProducts);
