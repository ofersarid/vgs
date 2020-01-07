import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const Footnotes = ({ footNotes }) => {
  let isEmpty = true;
  footNotes.forEach(item => {
    if (item) {
      isEmpty = false;
    }
  });
  return footNotes.length > 0 ? (
    <ol className={cx(styles.footNotes, { [styles.hideTopLine]: isEmpty })} >
      {footNotes.map((note, i) => note ? <li key={i} >{note}</li > : null)}
    </ol >
  ) : null;
};

Footnotes.propTypes = {
  footNotes: PropTypes.arrayOf(PropTypes.string),
};

export default Footnotes;
