import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import styles from './styles.scss';

const Footnotes = ({ footNotes }) => {
  let isEmpty = true;
  footNotes.forEach(item => {
    if (item) {
      isEmpty = false;
    }
  });
  return (
    <ol className={cx(styles.footNotes, { [styles.hideTopLine]: isEmpty })} >
      {footNotes.map((note, i) => note ? <li key={i} >{note}</li > : null)}
    </ol >
  );
};

Footnotes.propTypes = {
  footNotes: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Footnotes);
