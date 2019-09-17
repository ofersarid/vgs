import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { FadeIn, Button } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import Device from '../../../../shared/device';
import { compose } from 'redux';
import { connect } from 'react-redux';

class Downloads extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      image,
      imageTitle,
      brochure,
      ifu,
      patientCard,
      instructions,
      themeColor,
      isMobile,
    } = this.props;
    return (
      <FadeIn spread >
        <div
          // hideOverflow
          className={cx(styles.container, layout.inner)}
        >
          {!isMobile && (
            <div className={cx(styles.img)} >
              <img src={image} className={styles.inner} />
              <div className={cx(styles.title)} >{imageTitle}</div >
            </div >
          )}
          <div className={cx(styles.rightCol)} >
            {brochure && (
              <Button
                tag="a"
                withBorder
                textColor={themeColor}
                target="_blank"
                rel="noopener noreferrer"
                href={brochure}
                waveColor="white"
                className={cx(styles.btn)}
              >
                BROCHURE
              </Button >
            )}
            {ifu && (
              <Button
                tag="a"
                withBorder
                textColor={themeColor}
                target="_blank"
                rel="noopener noreferrer"
                href={ifu}
                waveColor="white"
                className={cx(styles.btn)}
              >
                IFU
              </Button >
            )}
            {patientCard && (
              <Button
                tag="a"
                withBorder
                textColor={themeColor}
                target="_blank"
                rel="noopener noreferrer"
                href={patientCard}
                waveColor="white"
                className={cx(styles.btn)}
              >
                PATIENT CARD
              </Button >
            )}
            {instructions && (
              <Button
                tag="a"
                withBorder
                textColor={themeColor}
                target="_blank"
                rel="noopener noreferrer"
                href={instructions}
                waveColor="white"
                className={cx(styles.btn)}
              >
                REPROCESSING PDF
              </Button >
            )}
          </div >
        </div >
      </FadeIn >
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
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: Device.selectors.isMobile(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Downloads);
