import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FadeIn, RatioBox } from '/src/shared';
import styles from './styles.scss';
import cx from 'classnames';
import logoGreen from '/src/assets/logo_green.svg';
import layout from '../../../../shared/styles/layout.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { txt } = this.props;
    return (
      <FadeIn spread >
        <div className={styles.cover} >
          <h1 className={styles.header} >
            THE<br />
            COMPANY
          </h1 >
          <div className={cx(styles.paragraph, layout.inner)} >
            <p dangerouslySetInnerHTML={{ __html: txt.replace(/\n\r?/g, '<br />') }} />
          </div >
        </div >
        <FadeIn slideFrom="right" className={styles.art} slow >
          <RatioBox ratio={1} >
            <img src={logoGreen} />
          </RatioBox>
        </FadeIn>
      </FadeIn >
    );
  }
}

Cover.propTypes = {
  txt: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
