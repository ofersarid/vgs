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
import { SnapScroll, Button } from '/src/shared';
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
    const { frame, footer, themeColor, name, description, art, showOnFrame } = this.props;
    const { reverseAnimation } = this.state;
    const forward = frame === showOnFrame;
    const justOneDay = _isEqual(footer.dateFrom, footer.dateTo);
    return (
      <Spring
        from={{ opacity: forward ? 0 : 1 }}
        to={{ opacity: forward ? 1 : 0 }}
        immediate={frame !== 0}
      >
        {props => <div
          className={styles.cover}
          style={{
            opacity: props.opacity,
          }}
        >
          <h1 className={styles.header} >
            <div style={{ color: themeColor }} >{name}</div >
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\n\r?/g, '<br />') }} />
          </h1 >
          <img src={art} className={styles.art} />
          {footer ? (
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
          ) : null}
        </div >}
      </Spring >
    );
  }
}

Cover.propTypes = {
  frame: PropTypes.number.isRequired,
  art: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
  showOnFrame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
