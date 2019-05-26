import React from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { SnapScroll } from '/src/components';
import styles from './styles.scss';

const ProductCover = ({ frame, art, themeColor, footer, name, description }) => {
  const forward = frame === 0;

  const resolveSpring = () => {
    return forward ? useSpring({
      o: 1,
      from: {
        o: 0,
      },
    }) : useSpring({
      o: 0,
      from: {
        o: 1,
      },
    });
  };

  const { o } = resolveSpring();

  const colorMap = {
    blue: '#0272BA',
  };

  return (
    <animated.div
      className={styles.cover}
      style={{
        opacity: o,
      }}
    >
      <h1 className={styles.header} >
        <div style={{ color: colorMap[themeColor] }} >{name}</div >
        <div >{description}</div >
      </h1 >
      <img src={art} className={styles.art} />
      <div className={styles.footer} style={{ background: colorMap[themeColor] }} >
        <div className={styles.title} >{footer.title}</div >
        <div className={styles.date} >
          {moment(footer.dateFrom).format('MMMM Do')} &mdash;&nbsp;
          {moment(footer.dateTo).format('MMMM Do')}
        </div >
      </div >
    </animated.div >
  );
};

ProductCover.propTypes = {
  frame: PropTypes.number.isRequired,
  art: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  themeColor: PropTypes.oneOf(['blue']).isRequired,
  footer: PropTypes.shape({
    title: PropTypes.string.isRequired,
    dateFrom: PropTypes.instanceOf(Date).isRequired,
    dateTo: PropTypes.instanceOf(Date.isRequired),
    address: PropTypes.string.isRequired,
    linkTo: PropTypes.string.isRequired,
  })
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(ProductCover);
