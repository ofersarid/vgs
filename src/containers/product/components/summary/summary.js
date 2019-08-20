import React, { Fragment } from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Check } from 'styled-icons/material/Check';
import { SnapScroll, FadeIn } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const Summary = ({ showOnFrame, frame, data, art }) => {
  return (
    <Fragment >
      <FadeIn spread >
        <img className={styles.art} src={art} />
      </FadeIn >
      <Spring
        from={{ opacity: frame === showOnFrame ? 0 : 1 }}
        to={{ opacity: frame === showOnFrame ? 1 : 0 }}
        immediate={frame !== showOnFrame}
      >
        {styleProps => <section className={cx(styles.content, sharedStyles.inner)} style={{
          opacity: styleProps.opacity,
        }} >
          <ul className={styles.list} >
            {data.map(item => (
              <li key={item} className={styles.listItem} >
                <Check className={styles.check} />
                <div >{item}</div >
              </li >
            ))}
          </ul >
        </section >}
      </Spring >
    </Fragment >
  );
};

Summary.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  art: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
