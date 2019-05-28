import React, { PureComponent, Fragment } from 'react';
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
      <Fragment >
        <Spring
          from={{ transform: 'translateX(100vw)', opacity: 0 }}
          to={{ transform: 'translateX(0vw)', opacity: 1 }}
          reset
          reverse={!openMenu}
          immediate={immediate}
        >
          {props => <div className={styles.menuContainer} style={props} >
            <ul className={styles.list} >
              <li className={cx('ripple waves-light')} >Home</li >
              <li className={cx('ripple waves-light')} >Products</li >
              <li className={cx('ripple waves-light')} >News & Events</li >
              <li className={cx('ripple waves-light')} >About</li >
              <li className={cx('ripple waves-light')} >Contact</li >
            </ul >
          </div >}
        </Spring >
        <div
          className={cx('ripple', styles.menuToggle)}
          onClick={this.toggleMenu}
        >
          <Spring
            from={{ transform: 'rotate(0deg)', left: '0px', background: '#0272BA' }}
            to={{ transform: 'rotate(45deg)', left: '3px', background: '#ffffff' }}
            reset
            reverse={!openMenu}
            immediate={immediate}
          >
            {props => <span className={styles.handle} style={props} />}
          </Spring >
          <Spring
            from={{ transform: 'rotate(0deg)', left: '0px', background: '#0272BA' }}
            to={{ transform: 'rotate(-45deg)', left: '3px', background: '#ffffff' }}
            reset
            reverse={!openMenu}
            immediate={immediate}
          >
            {props => <span className={styles.handle} style={props} />}
          </Spring >
        </div >
      </Fragment >
    );
  }
}

SideMenu.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
