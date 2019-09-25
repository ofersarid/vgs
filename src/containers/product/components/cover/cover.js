import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventFooter, FadeIn } from '/src/shared';
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
    const { footer, themeColor, name, description, art, footnote } = this.props;
    return (
      <FadeIn spread >
        <div className={styles.cover} >
          <h1 className={styles.header} >
            <div style={{ color: themeColor }} >{name}</div >
            <div dangerouslySetInnerHTML={{ __html: description.replace(/\n\r?/g, '<br />') }} />
          </h1 >
          {footnote && (
            <div className={styles.footnote} >
              <div className={styles.divider} />
              <div className={styles.footnoteTxt} >{footnote}</div >
            </div >
          )}
          <img src={art} className={styles.art} />
          {footer ? <EventFooter footer={footer} /> : null}
        </div >
      </FadeIn >
    );
  }
}

Cover.propTypes = {
  art: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  themeColor: PropTypes.string.isRequired,
  footnote: PropTypes.string,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.object.isRequired,
    dateTo: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Cover);
