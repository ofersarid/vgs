import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ScrollableArea, FadeIn, Button } from '/src/shared';
import cx from 'classnames';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import heartPic from '/src/assets/vector_heart.png';

class OurProducts extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { text, link } = this.props;
    return (
      <FadeIn >
        <img src={heartPic} className={styles.art} />
        <div className={cx(styles.paragraph, layout.inner)} >
          <ScrollableArea >
            <div
              dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
            />
            <Button
              tag="a"
              color
              target="_blank"
              rel="noopener noreferrer"
              href={link}
              waveColor="white"
              className={cx(styles.btn)}
            >
              PRODUCTS
            </Button >
          </ScrollableArea >
        </div >
      </FadeIn >
    );
  }
}

OurProducts.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(OurProducts);
