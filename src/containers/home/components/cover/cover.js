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
    const { footer } = this.props;
    return (
      <FadeIn spread >
        <div className={styles.cover} >
          <div className={styles.header} >
            VASCULAR<br/>
            GRAFT<br/>
            SOLUTIONS
          </div >
          {footer ? <EventFooter footer={footer} /> : null}
        </div >
      </FadeIn >
    );
  }
}

Cover.propTypes = {
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
