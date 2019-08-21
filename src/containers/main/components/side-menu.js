import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import { hashHistory } from 'react-router';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { Button, SnapScroll } from '/src/shared';
import services from '/src/services';
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
    const { resetFrame } = this.props;
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase();
    hashHistory.push(camelCase(txt));
    resetFrame();
    this.toggleMenu();
  }

  resolveWaveColor(color) {
    switch (color.toLowerCase()) {
      case '#0272ba':
        return 'blue';
      case '#662d91':
        return 'purple';
      default:
        return 'gray';
    }
  }

  render() {
    const { products, categories, color } = this.props;
    const { openMenu, immediate } = this.state;
    return (
      <Fragment >
        <Spring
          from={{ transform: `translateX(${openMenu ? '100vw' : '0vw'})`, opacity: openMenu ? 0 : 1 }}
          to={{ transform: `translateX(${openMenu ? '0vw' : '100vw'})`, opacity: openMenu ? 1 : 0 }}
          immediate={immediate}
          onRest={() => {
            this.setState({ immediate: true });
          }}
        >
          {props => <div className={styles.menuContainer} style={props} >
            <ul className={styles.list} >
              <Button onClick={this.navigate} tag="li" waveColor="white" >Home</Button >
              <SubMenu label="Products" >
                {categories.map(category => (
                  <Fragment key={category} >
                    <label >{category}</label >
                    {products.map(product => {
                      return product.category === category
                        ? <Button
                          tag="li"
                          key={product.name}
                          waveColor="white"
                          onClick={this.navigate} >{product.name}</Button >
                        : null;
                    })}
                  </Fragment >
                ))}
              </SubMenu >
              <Button tag="li" onClick={this.navigate} waveColor="white" >News & Events</Button >
              <Button tag="li" onClick={this.navigate} waveColor="white" >About</Button >
              <Button tag="li" onClick={this.navigate} waveColor="white" >Contact</Button >
            </ul >
            <Button tag="a" className={cx(styles.legal)} onClick={this.navigate} waveColor="white" >Legal</Button >
          </div >}
        </Spring >
        <Button
          className={cx(styles.menuToggle)}
          onClick={this.toggleMenu}
          waveColor={openMenu ? 'white' : this.resolveWaveColor(color)}
        >
          <Spring
            from={{ transform: 'rotate(0deg)', left: '0px', background: color }}
            to={{ transform: 'rotate(45deg)', left: '3px', background: '#ffffff' }}
            reset
            reverse={!openMenu}
            immediate={immediate}
          >
            {props => <span className={styles.handle} style={props} />}
          </Spring >
          <Spring
            from={{ transform: 'rotate(0deg)', left: '0px', background: color }}
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

SideMenu.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })),
  categories: PropTypes.arrayOf(PropTypes.string),
  resetFrame: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  products: services.products.selectors.list(state),
  categories: services.products.selectors.categories(state),
  color: services.vgs.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({
  resetFrame: () => dispatch(SnapScroll.actions.reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
