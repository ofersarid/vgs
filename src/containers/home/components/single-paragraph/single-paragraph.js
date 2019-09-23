import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FadeIn } from '/src/shared';
import utils from '/src/utils';
import cx from 'classnames';
import pic from '/src/assets/vector_heart.svg';
import layout from '/src/shared/styles/layout.scss';
import styles from './styles.scss';
import homeStyles from '../../styles.scss';

class SingleParagraph extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { text } = this.props;
    return (
      <FadeIn spread >
        <div className={cx(styles.paragraph, layout.inner, homeStyles.homeInner)} >
          <p
            dangerouslySetInnerHTML={{ __html: text.replace(/\n\r?/g, '<br />') }}
          />
        </div >
        {!utils.isMobile() && (
          <img className={styles.art} src={pic} />
        )}
      </FadeIn >
    );
  }
}

SingleParagraph.propTypes = {
  text: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SingleParagraph);
