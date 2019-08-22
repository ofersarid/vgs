import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Pragraph = ({ children, className }) => (
  <p className={cx(styles.paragraph, className)} dangerouslySetInnerHTML={{ __html: children.replace(/\n\r?/g, '<br />') }} />
);

Pragraph.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
};

export default Pragraph;
