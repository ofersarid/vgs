import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { FadeIn, Button, RatioBox, MediaLoader } from '/src/shared';
import services from '/src/services';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
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
      brochure,
      ifu,
      patientCard,
      instructions,
      themeColor,
      isMobile
    } = this.props;
    return (
      <FadeIn spread>
        <div
          // hideOverflow
          className={cx(styles.container, layout.inner)}
        >
          {!isMobile && (
            <RatioBox ratio={2 / 3} className={cx(styles.img)}>
              <MediaLoader src={image} />
            </RatioBox>
          )}
          <div className={cx(styles.rightCol)}>
            {brochure && (
              <Button
                tag='a'
                withBorder
                textColor={themeColor}
                target='_blank'
                rel='noopener noreferrer'
                href={brochure}
                waveColor='white'
                className={cx(styles.btn)}
              >
                BROCHURE
              </Button>
            )}
            {ifu && (
              <Button
                tag='a'
                withBorder
                textColor={themeColor}
                target='_blank'
                rel='noopener noreferrer'
                href={ifu}
                waveColor='white'
                className={cx(styles.btn)}
              >
                IFU
              </Button>
            )}
            {patientCard && (
              <Button
                tag='a'
                withBorder
                textColor={themeColor}
                target='_blank'
                rel='noopener noreferrer'
                href={patientCard}
                waveColor='white'
                className={cx(styles.btn)}
              >
                PATIENT CARD
              </Button>
            )}
            {instructions && (
              <Button
                tag='a'
                withBorder
                textColor={themeColor}
                target='_blank'
                rel='noopener noreferrer'
                href={instructions}
                waveColor='white'
                className={cx(styles.btn)}
              >
                REPROCESSING PDF
              </Button>
            )}
          </div>
        </div>
      </FadeIn>
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
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isMobile: services.device.selectors.type(state) === 'mobile'
});

const mapDispatchToProps = (dispatch) => ({}); // eslint-disable-line

export default compose(connect(mapStateToProps, mapDispatchToProps))(Downloads);
