import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { FadeIn } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const ThreeColumnLayout = ({ data }) => {
  return (
    <FadeIn spread >
      <section className={cx(styles.content, sharedStyles.inner)} >
        <div className={styles.list} >
          {data.map(item => item ? (
            <p key={item} className={styles.listItem} >{item}</p >
          ) : null)}
        </div >
      </section >
    </FadeIn>
  );
};

ThreeColumnLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

export default ThreeColumnLayout;
