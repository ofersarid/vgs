import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import utils from '/src/utils';
import { SnapScroll, IndexHeader } from '/src/shared';
import isEqual from 'lodash/isEqual';
import services from '/src/services';
import utils from '/src/utils';
import cx from 'classnames';
import layout from '/src/shared/styles/layout.scss';
import HeadOffice from './head-office';
import Distributors from './distributors';
import styles from './styles.scss';

class Contact extends Component {
  constructor(props) {
    super(props);
    props.setColor('#005728');
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return !isEqual(nextProps.data, this.props.data) || nextProps.frame !== this.props.frame;
  }

  render() {
    const { data } = this.props; // eslint-disable-line
    return (
      <Fragment >
        {utils.isMobile() && (
          <Fragment >
            <IndexHeader index={0} header="HEAD OFFICE" hideIndex />
            <IndexHeader index={1} header="DISTRIBUTORS" hideIndex />
          </Fragment >
        )}
        <SnapScroll >
          {utils.isMobile() && <HeadOffice />}
          {utils.isMobile() && <Distributors data={data} />}
          {!utils.isMobile() && (
            <div className={cx(layout.inner, styles.onePager)} >
              <h1 >CONTACT US</h1 >
              <HeadOffice />
              <h2 >DISTRIBUTORS</h2 >
              <Distributors data={data} />
            </div >
          )}
        </SnapScroll >
      </Fragment >
    );
  }
}

Contact.propTypes = {
  data: PropTypes.array,
  setColor: PropTypes.func.isRequired,
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  data: services.reactor.selectors.collectionData(state, 'distributors'),
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({
  setColor: color => dispatch(services.vgs.actions.setColor(color)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Contact);
