import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import { hashHistory } from 'react-router';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { Products } from '/src/services';
import SubMenu from './sub-menu';
import styles from '../styles.scss';
import camelCase from 'lodash/camelCase';

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

  navigate(e) {
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase();
    this.setState({
      immediate: true,
    });
    console.log(camelCase(txt));
    hashHistory.push(camelCase(txt));
  }

  render() {
    const { openMenu, immediate } = this.state;
    console.log(Products.selectors.categories());
    return (
      <Fragment >
        <Spring
          from={{ transform: `translateX(${openMenu ? '100vw' : '0vw'})`, opacity: openMenu ? 0 : 1 }}
          to={{ transform: `translateX(${openMenu ? '0vw' : '100vw'})`, opacity: openMenu ? 1 : 0 }}
          immediate={immediate}
        >
          {props => <div className={styles.menuContainer} style={props} >
            <ul className={styles.list} >
              <li className={cx('ripple waves-light')} onClick={this.navigate} >Home</li >
              <SubMenu label="Products" >
                {Products.selectors.categories().map(category => (
                  <Fragment key={category} >
                    <label >{category}</label >
                    {Products.selectors.list().map(product => {
                      return product.category === category
                        ? <li
                          key={product.name}
                          className={cx('ripple waves-light')}
                          onClick={this.navigate} >{product.name}</li >
                        : null;
                    })}
                  </Fragment >
                ))}
              </SubMenu >
              <li className={cx('ripple waves-light')} onClick={this.navigate} >News & Events</li >
              <SubMenu label="About" >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Team</li >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Jobs</li >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Jobs</li >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Jobs</li >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Jobs</li >
                <li className={cx('ripple waves-light')} onClick={this.navigate} >Jobs</li >
              </SubMenu >
              <li className={cx('ripple waves-light')} onClick={this.navigate} >Contact</li >
            </ul >
            <div className={cx('ripple waves-light', styles.legal)} onClick={this.navigate} >Legal</div>
          </div >}
        </Spring >
        <div
          className={cx('ripple waves-color', styles.menuToggle)}
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
