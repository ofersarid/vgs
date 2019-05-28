import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import cx from 'classnames';
import autoBind from 'auto-bind';
import styles from '../styles.scss';

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      immediate: true,
    };
    autoBind(this);
  }

  toggleMenu() {
    this.setState({
      immediate: false,
      openMenu: !this.state.openMenu,
    });
  }

  render() {
    const { openMenu, immediate } = this.state;
    return (
      <div
        className={cx('ripple', styles.menuToggle)}
        onClick={this.toggleMenu}
      >
        <Spring
          from={{ transform: 'rotate(0deg)', left: '0px' }}
          to={{ transform: 'rotate(45deg)', left: '3px' }}
          reset
          reverse={!openMenu}
          immediate={immediate}
        >
          {props => <span className={styles.handle} style={props} />}
        </Spring >
        <Spring
          from={{ transform: 'rotate(0deg)', left: '0px' }}
          to={{ transform: 'rotate(-45deg)', left: '3px' }}
          reset
          reverse={!openMenu}
          immediate={immediate}
        >
          {props => <span className={styles.handle} style={props} />}
        </Spring >
      </div >
    );
  }
}

SideMenu.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
