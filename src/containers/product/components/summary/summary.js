import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { Square } from 'styled-icons/boxicons-solid/Square';
import { FadeIn } from '/src/shared';
import styles from './styles.scss';
import layout from '/src/shared/styles/layout.scss';
import services from '/src/services';
import { compose } from 'redux';
import { connect } from 'react-redux';

const Summary = ({ data, art, color }) => { // eslint-disable-line
  return (
    <FadeIn spread >
      {/*<img className={styles.art} src={art} />*/}
      <section className={cx(styles.content, layout.inner)} >
        <ul className={styles.list} >
          {data.map(item => (
            <li key={item} className={cx('bullet', styles.listItem)} >
              <Square className={styles.square} style={{
                color,
              }} />
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
  color: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
});

const mapDispatch = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatch),
)(Summary);
