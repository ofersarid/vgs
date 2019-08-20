import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { ScrollableArea, FadeIn } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const ThreeColumnLayout = ({ data }) => {
  return (
    <FadeIn spread >
      <section className={cx(styles.content, sharedStyles.inner)} >
        <ScrollableArea className={styles.list} >
          {data.map(item => item ? (
            <div key={item} className={styles.listItem} >{item}</div >
          ) : null)}
        </ScrollableArea >
      </section >
    </FadeIn>
  );
};

ThreeColumnLayout.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
};

export default ThreeColumnLayout;
