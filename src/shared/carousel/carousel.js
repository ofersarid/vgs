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
    };
    autoBind(this);
    this.nextThrottle = throttle(this.next, 500, { trailing: true, leading: true });
    this.prevThrottle = throttle(this.prev, 500, { trailing: true, leading: true });
  }

  componentDidMount() {
    this.countGroups();
  }

  countGroups() {
    const { children, displayVolume } = this.props;
    const count = Math.ceil(children.length / displayVolume);
    this.setState({ groupCount: count });
  }

  next(e) {
    e.stopPropagation();
    const { group, groupCount } = this.state;
    if (group < groupCount) {
      this.setState({ group: group + 1, orientation: 'next' });
    }
  }

  prev(e) {
    e.stopPropagation();
    const { group } = this.state;
    if (group > 0) {
      this.setState({ group: group - 1, orientation: 'prev' });
    }
  }

  render() {
    const { children, displayVolume, className, color, colorName } = this.props;
    const { group, groupCount, orientation } = this.state;
    return (
      <div className={cx(styles.carousel, className)} >
        <Button
          className={cx('prev', styles.btn, styles.left)}
          waveColor={colorName}
          textColor={color}
          onClick={this.prevThrottle}
          disable={group === 0}
        >
          <ChevronLeft />
        </Button >
        <div className={styles.content}>
          <Transition
            config={config.default}
            items={group}
            from={{ transform: `translate3d(${orientation === 'next' ? '' : '-'}100%,0,0)`, opacity: 0 }}
            enter={{ transform: `translate3d(0,0,0)`, opacity: 1 }}
            leave={{ transform: `translate3d(${orientation === 'next' ? '-' : ''}100%,0,0)`, opacity: 0 }}
          >
            {group => springs => <div className={styles.itemGroup} key={group} style={springs} >
              {children.slice(group * displayVolume, (group * displayVolume) + displayVolume).map((child, i) => (
                <div key={`${group}-${i}`} style={{
                  width: `calc(${100 / displayVolume}% - 20px)`,
                }}>{child}</div >
              ))}
            </div >}
          </Transition >
        </div >
        <Button
          className={cx('next', styles.btn, styles.right)}
          waveColor={colorName}
          textColor={color}
          onClick={this.nextThrottle}
          disable={group === groupCount - 1}
        >
          <ChevronRight />
        </Button >
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
};

const mapStateToProps = state => ({
  colorName: services.vgs.selectors.colorName(state),
});

const mapDispatchToProps = dispatch => ({
  disableScrollSnap: (...props) => dispatch(SnapScroll.actions.disable(...props)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);
