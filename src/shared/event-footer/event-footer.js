import React, { PureComponent } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import _isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import { LocationOn } from 'styled-icons/material/LocationOn';
import moment from 'moment';
import { RightArrowAlt } from 'styled-icons/boxicons-regular/RightArrowAlt';
import { Button } from '/src/shared';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
    };
    autoBind(this);
  }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  render() {
    const { footer, themeColor } = this.props;
    const { reverseAnimation } = this.state;
    const justOneDay = _isEqual(footer.dateFrom, footer.dateTo);
    return (
      <Button
        waveColor="white"
        className={cx(styles.footer)}
        style={{ background: themeColor }}
        tag="a"
        href={footer.linkTo}
        target="_blank"
      >
        <div className={styles.text}>
          <div className={styles.title} >{footer.title}</div >
          <div className={styles.date} >
            {moment(footer.dateFrom.toDate()).format('MMMM Do')}
            {!justOneDay && <span>&nbsp;&mdash;&nbsp;</span>}
            {!justOneDay && moment(footer.dateTo.toDate()).format('MMMM Do')}
          </div >
          <div className={styles.address}>
            <LocationOn />
            <span className={styles.addressText}>{footer.address}</span>
          </div>
        </div >
        <Spring
          from={{ transform: 'translateX(-10%)' }}
          to={{ transform: 'translateX(10%)' }}
          config={reverseAnimation ? Object.assign({}, config.slow, { duration: 200 }) : config.slow}
          reset
          reverse={reverseAnimation}
          onRest={this.reverseAnimation} >
          {props => <RightArrowAlt className={styles.arrow} style={props} />}
        </Spring >
      </Button >
    );
  }
}

Cover.propTypes = {
  themeColor: PropTypes.string,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
