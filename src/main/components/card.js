import React, { PureComponent } from 'react';
import { config, Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
// import cx from 'classnames';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from '../styles.scss';
import mobileIcon from './mobile_icon.svg';
import { logoGreen, vgsGreen } from '../assets';

class Card extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
      orientation: window.screen.orientation,
    };
    autoBind(this);
  }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  render() {
    const { reverseAnimation } = this.state;
    return (
      <Spring
        from={{ opacity: 0, twist: 'rotate(90deg) scaleX(-1)', delayOpacity: 0 }}
        to={{ opacity: 1, twist: 'rotate(0deg) scaleX(1)', delayOpacity: 1 }}
        config={key => {
          switch (key) {
            case 'delayOpacity':
              return Object.assign({}, config.default, { duration: 2000, delay: 300 });
            default:
              return config.slow;
          }
        }}
      >
        {cardSpring => <div className={styles.bizCard} >
          <div className={styles.contentBox} >
            <img src={logoGreen} className={styles.cardLogo} style={{
              transform: cardSpring.twist,
              opacity: cardSpring.opacity,
            }} />
            <img src={vgsGreen} className={styles.cardLogoTxt} style={{ opacity: cardSpring.delayOpacity }} />
            <div className={styles.info} style={{ opacity: cardSpring.delayOpacity }} >
              <div >24 Raul Wallenberg st.</div >
              <div >TEL AVIV, ISRAEL 6971921</div >
              <div >+972 3 549 9054</div >
            </div >
          </div >
          <Spring
            from={{ rotate: 'rotate(0deg)' }}
            to={{ rotate: 'rotate(-90deg)' }}
            reset
            reverse={reverseAnimation}
            onRest={this.reverseAnimation}
          >
            {imgSpring => <img
              src={mobileIcon}
              style={{
                transform: `${imgSpring.rotate} translate(50%, 0%)`,
                opacity: cardSpring.delayOpacity,
              }}
              className={styles.mobileIcon} />}
          </Spring >
        </div >}
      </Spring >
    );
  }
}

Card.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Card);
