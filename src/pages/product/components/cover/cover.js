import React, { PureComponent } from 'react';
import { Spring, config } from 'react-spring/renderprops';
import { hashHistory } from 'react-router';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { RightArrowAlt } from 'styled-icons/boxicons-regular/RightArrowAlt';
import { SnapScroll, Button } from '/src/components';
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
    const navigate = () => {
      hashHistory.push(footer.linkTo);
    };
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
            <div >{description}</div >
          </h1 >
          <img src={art} className={styles.art} />
          {footer ? (
            <Button
              waveColor="white"
              className={cx(styles.footer)}
              style={{ background: themeColor }}
              onClick={navigate}
            >
              <div className={styles.text}>
                <div className={styles.title} >{footer.title}</div >
                <div className={styles.date} >
                  {moment(footer.dateFrom).format('MMMM Do')} &mdash;&nbsp;
                  {moment(footer.dateTo).format('MMMM Do')}
                </div >
              </div >
              <Spring
                from={{ transform: 'translate(50%, -50%)' }}
                to={{ transform: 'translate(70%, -50%)' }}
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
    dateFrom: PropTypes.instanceOf(Date).isRequired,
    dateTo: PropTypes.instanceOf(Date).isRequired,
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
