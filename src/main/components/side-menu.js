import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import { hashHistory } from 'react-router';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { Button } from '/src/components';
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
              <Button onClick={this.navigate} el="li" >Home</Button >
              <SubMenu label="Products" >
                {Products.selectors.categories().map(category => (
                  <Fragment key={category} >
                    <label >{category}</label >
                    {Products.selectors.list().map(product => {
                      return product.category === category
                        ? <Button
                          el="li"
                          key={product.name}
                          onClick={this.navigate} >{product.name}</Button >
                        : null;
                    })}
                  </Fragment >
                ))}
              </SubMenu >
              <Button el="li" onClick={this.navigate} >News & Events</Button >
              <SubMenu label="About" >
                <Button el="li" onClick={this.navigate} >Team</Button >
                <Button el="li" onClick={this.navigate} >Jobs</Button >
              </SubMenu >
              <Button el="li" onClick={this.navigate} >Contact</Button >
            </ul >
            <Button el="a" className={cx(styles.legal)} onClick={this.navigate} >Legal</Button>
          </div >}
        </Spring >
        <Button
          className={cx(styles.menuToggle)}
          onClick={this.toggleMenu}
          color
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
        </Button >
      </Fragment >
    );
  }
}

SideMenu.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
