import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { FadeIn, ScrollableArea, Button } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

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
    } = this.props;
    return (
      <FadeIn spread >
        <ScrollableArea
          // hideOverflow
          className={cx(styles.container, sharedStyles.inner)}
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
        </ScrollableArea >
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
};

export default Downloads;
