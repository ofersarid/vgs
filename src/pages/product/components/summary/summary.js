import React, { Fragment } from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Check } from 'styled-icons/material/Check';
import { SnapScroll } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';
import art from './summary-art.png';

const Summary = ({ showOnFrame, frame, data }) => {
  return (
    <Fragment >
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
              <li key={item.id} className={styles.listItem} >
                <Check className={styles.check} />
                <div >{item.text}</div >
              </li >
            ))}
          </ul >
        </section >}
      </Spring >
      <img className={styles.art} src={art} />
    </Fragment >
  );
};

Summary.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })),
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
  data: [{
    id: '1',
    text: 'Simple to apply without affecting standard practice'
  }, {
    id: '2',
    text: 'Requires no fixation'
  }, {
    id: '3',
    text: 'Can be adjusted to perfectly fit the graft length'
  }, {
    id: '4',
    text: 'Optimal dimensional match'
  }],
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
