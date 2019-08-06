import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { EventFooter, FadeIn } from '/src/shared';
import styles from './styles.scss';

class Cover extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const { footer, tagLine } = this.props;
    return (
      <FadeIn >
        <div className={styles.cover} >
          <h1 className={styles.header} >
            <div dangerouslySetInnerHTML={{ __html: tagLine.replace(/\n\r?/g, '<br />') }} />
          </h1 >
          {footer ? <EventFooter footer={footer} /> : null}
        </div >
      </FadeIn >
    );
  }
}

Cover.propTypes = {
  tagLine: PropTypes.string.isRequired,
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
