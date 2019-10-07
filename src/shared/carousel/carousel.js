import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import cx from 'classnames';
import throttle from 'lodash/throttle';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Transition, config } from 'react-spring/renderprops';
import { ChevronRight } from 'styled-icons/evil/ChevronRight';
import { ChevronLeft } from 'styled-icons/evil/ChevronLeft';
import { SnapScroll, Button } from '/src/shared';
import services from '/src/services';

import styles from './styles.scss';

class Carousel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      group: 0,
      groupCount: 0,
      orientation: 'next',
      immediate: true,
    };
    autoBind(this);
    this.nextThrottle = throttle(this.next, 500, { trailing: true, leading: true });
    this.prevThrottle = throttle(this.prev, 500, { trailing: true, leading: true });
  }

  componentDidMount() {
    this.countGroups();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.children.length !== this.props.children.length) {
      this.countGroups();
    }
  }

  countGroups() {
    const { children, displayVolume } = this.props;
    const count = Math.ceil(children.length / displayVolume);
    this.setState({ groupCount: count });
  }

  next(e) {
    e.persist();
    const { group, groupCount } = this.state;
    if (group < groupCount) {
      this.setState({ group: group + 1, orientation: 'next' });
    }
    this.setState({ immediate: false });
  }

  prev(e) {
    e.persist();
    const { group } = this.state;
    if (group > 0) {
      this.setState({ group: group - 1, orientation: 'prev' });
    }
    this.setState({ immediate: false });
  }

  render() {
    const { children, displayVolume, className, color, colorName, navLocation, prevBtnTxt, nextBtnTxt } = this.props;
    const { group, groupCount, orientation, immediate } = this.state;
    const isLastGroup = group === groupCount - 1;
    return (
      <div className={cx(styles.carousel, className, styles[navLocation])} >
        {navLocation === 'horizontal' && (
          <Button
            className={cx('prev', styles.btn, styles.left)}
            waveColor={colorName}
            textColor={color}
            onClick={this.prevThrottle}
            disable={group === 0}
          >
            <ChevronLeft />
          </Button >
        )}
        <div className={cx(styles.content, styles[`content-${navLocation}`])} >
          <Transition
            config={config.slow}
            items={group}
            from={{ transform: `translate3d(${orientation === 'next' ? '' : '-'}100%,0,0)`, opacity: 0 }}
            enter={{ transform: `translate3d(0,0,0)`, opacity: 1 }}
            leave={{ transform: `translate3d(${orientation === 'next' ? '-' : ''}100%,0,0)`, opacity: 0 }}
            immediate={immediate}
          >
            {group => springs => <div className={cx(styles.itemGroup)} key={group} style={springs} >
              {children.slice(group * displayVolume, (group * displayVolume) + displayVolume).map((child, i) => (
                <div key={`${group}-${i}`} className={cx('carousel-item', styles.itemWrapper)} style={{
                  width: `calc(${100 / displayVolume}%)`,
                }} >{child}</div >
              ))}
            </div >}
          </Transition >
        </div >
        {navLocation === 'horizontal' && (
          <Button
            className={cx('next', styles.btn, styles.right)}
            waveColor={colorName}
            textColor={color}
            onClick={this.nextThrottle}
            disable={group === groupCount - 1}
          >
            <ChevronRight />
          </Button >
        )}
        {navLocation === 'bottom' && (
          <div className={styles.navWrapper} >
            <Button
              className={cx('prev', styles.btn, styles.left)}
              waveColor={colorName}
              textColor={color}
              onClick={this.prevThrottle}
              disable={group === 0}
            >
              <div className={styles.clipIcon} ><ChevronLeft /></div >
              {prevBtnTxt && <span className={styles.btnTxt} >{prevBtnTxt}</span >}
            </Button >
            < Button
              className={cx('next', styles.btn, styles.right)}
              waveColor={colorName}
              textColor={color}
              onClick={this.nextThrottle}
              disable={isLastGroup}
            >
              {nextBtnTxt && <span className={styles.btnTxt} >{nextBtnTxt}</span >}
              <div className={styles.clipIcon} ><ChevronRight /></div >
            </Button >
          </div >
        )}
      </div >
    );
  }
}

Carousel.propTypes = {
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  displayVolume: PropTypes.number.isRequired,
  className: PropTypes.string,
  prevBtnTxt: PropTypes.string,
  nextBtnTxt: PropTypes.string,
  navLocation: PropTypes.oneOf(['bottom', 'horizontal']),
};

Carousel.defaultProps = {
  navLocation: 'bottom',
  prevBtnTxt: 'BACK',
  nextBtnTxt: 'MORE',
};

const mapStateToProps = state => ({
  colorName: services.vgs.selectors.colorName(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
