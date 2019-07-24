import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll, ScrollableArea } from '/src/shared';
import styles from './styles.scss';
import sharedStyles from '../../styles.scss';

const ThreeColumnLayout = ({ showOnFrame, frame, data }) => {
  return (
    <Spring
      from={{ opacity: frame === showOnFrame ? 0 : 1 }}
      to={{ opacity: frame === showOnFrame ? 1 : 0 }}
      immediate={frame !== showOnFrame}
    >
      {styleProps => <section className={cx(styles.content, sharedStyles.inner)} style={{
        opacity: styleProps.opacity,
      }} >
        <ScrollableArea className={styles.list} >
          {data.map(item => item ? (
            <div key={item} className={styles.listItem} >{item}</div >
          ) : null)}
        </ScrollableArea >
      </section >}
    </Spring >
  );
};

ThreeColumnLayout.propTypes = {
  showOnFrame: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.string),
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(ThreeColumnLayout);
