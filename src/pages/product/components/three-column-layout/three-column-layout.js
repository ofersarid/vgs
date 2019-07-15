import React from 'react';
import cx from 'classnames';
import { Spring } from 'react-spring/renderprops';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll, ScrollableArea } from '/src/components';
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
          {data.map(item => (
            <div key={item.id} className={styles.listItem} >{item.text}</div >
          ))}
        </ScrollableArea >
      </section >}
    </Spring >
  );
};

ThreeColumnLayout.propTypes = {
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
    text: 'A variety of models'
  }, {
    id: '2',
    text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
  }, {
    id: '3',
    text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
  }, {
    id: '4',
    text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
  }, {
    id: '5',
    text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
  }, {
    id: '6',
    text: 'A variety of models compatible with veins 3.5-8.0 mm in diameter, variety of models'
  }],
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(ThreeColumnLayout);
