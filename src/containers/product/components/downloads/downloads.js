import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import { Spring } from 'react-spring/renderprops-universal';
import { SnapScroll, ScrollableArea, Button } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

class Downloads extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      showOnFrame,
      frame,
      image,
      imageTitle,
      brochure,
      ifu,
      patientCard,
      instructions,
      themeColor,
    } = this.props;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        immediate={frame !== showOnFrame}
      >
        {styleProps => <ScrollableArea
          // hideOverflow
          className={cx(styles.container, sharedStyles.inner)}
          style={{
            opacity: styleProps.opacity,
          }}
        >
          <div className={cx(styles.img)} >
            <img src={image} className={styles.inner} />
            <div className={cx(styles.title)} >{imageTitle}</div >
          </div >
          <div className={cx(styles.rightCol)} >
            {brochure && (
              <Button
                tag="a"
                color
                target="_blank"
                rel="noopener noreferrer"
                href={brochure}
                waveColor="white"
                className={cx(styles.btn)}
                style={{
                  background: themeColor,
                }}
              >
                BROCHURE
              </Button >
            )}
            {ifu && (
              <Button
                tag="a"
                color
                target="_blank"
                rel="noopener noreferrer"
                href={ifu}
                waveColor="white"
                className={cx(styles.btn)}
                style={{
                  background: themeColor,
                }}
              >
                IFU
              </Button >
            )}
            {patientCard && (
              <Button
                tag="a"
                color
                target="_blank"
                rel="noopener noreferrer"
                href={patientCard}
                waveColor="white"
                className={cx(styles.btn)}
                style={{
                  background: themeColor,
                }}
              >
                PATIENT CARD
              </Button >
            )}
            {instructions && (
              <Button
                tag="a"
                color
                target="_blank"
                rel="noopener noreferrer"
                href={instructions}
                waveColor="white"
                className={cx(styles.btn)}
                style={{
                  background: themeColor,
                }}
              >
                REPROCESSING INSTRUCTIONS
              </Button >
            )}
          </div >
        </ScrollableArea >}
      </Spring >
    );
  }
}

Downloads.propTypes = {
  image: PropTypes.string.isRequired,
  imageTitle: PropTypes.string,
  brochure: PropTypes.string,
  ifu: PropTypes.string,
  patientCard: PropTypes.string,
  instructions: PropTypes.string,
  themeColor: PropTypes.string.isRequired,
  frame: PropTypes.number.isRequired,
  showOnFrame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Downloads);
