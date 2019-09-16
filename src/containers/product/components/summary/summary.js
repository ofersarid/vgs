import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Check } from 'styled-icons/material/Check';
import { FadeIn } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';

const Summary = ({ data, art }) => {
  return (
    <FadeIn spread >
      <img className={styles.art} src={art} />
      <section className={cx(styles.content, layout.inner)} >
        <ul className={styles.list} >
          {data.map(item => (
            <li key={item} className={cx('bullet', styles.listItem)} >
              <Check className={styles.check} />
              <div >{item}</div >
            </li >
          ))}
        </ul >
      </section >
    </FadeIn >
  );
};

Summary.propTypes = {
  art: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
};

export default Summary;
