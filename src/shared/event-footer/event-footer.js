import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import services from '/src/services';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { LocationOn } from 'styled-icons/material/LocationOn';
import moment from 'moment';
import { Button } from '/src/shared';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    // this.state = {
    //   reverseAnimation: false,
    // };
    autoBind(this);
  }

  // reverseAnimation() {
  //   const { reverseAnimation } = this.state;
  //   this.setState({ reverseAnimation: !reverseAnimation });
  // }

  render() {
    const { footer, color } = this.props;
    // const { reverseAnimation } = this.state;
    const justOneDay = _isEqual(footer.dateFrom, footer.dateTo);
    return (
      <Button
        waveColor="white"
        className={cx(styles.footer)}
        style={{ background: color }}
        tag="a"
        href={footer.linkTo}
        target="_blank"
      >
        <p className={cx(styles.text)} >
          <span className={styles.title} >{footer.title}</span >
          <span className={styles.date} >
            {moment(footer.dateFrom.toDate()).format('MMMM Do')}
            {!justOneDay && <span >&nbsp;&mdash;&nbsp;</span >}
            {!justOneDay && moment(footer.dateTo.toDate()).format('MMMM Do')}
          </span >
          <span className={styles.address} >
            <LocationOn />
            <span className={styles.addressText} >{footer.address}</span >
          </span >
        </p >
      </Button >
    );
  }
}

Cover.propTypes = {
  color: PropTypes.string.isRequired,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
