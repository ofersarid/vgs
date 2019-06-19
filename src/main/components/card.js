import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
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
        from={{ opacity: 0, twist: 'rotate(90deg) scaleX(-1)' }}
        to={{ opacity: 1, twist: 'rotate(0deg) scaleX(1)' }}
      >
        {cardSpring => <div className={styles.bizCard} style={cardSpring} >
          <img src={logoGreen} className={styles.logoCard} style={{ transform: cardSpring.twist }} />
          <img src={vgsGreen} className={styles.logoTxtCard} />
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
                transform: `${imgSpring.rotate} translate(50%, 50%)`,
              }}
              className={styles.mobileIcon} />}
          </Spring>
        </div >}
      </Spring >
    );
  }
}

Card.propTypes = {};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Card);
