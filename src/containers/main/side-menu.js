import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spring } from 'react-spring/renderprops';
import { logoGreen } from '/src/containers/main/assets';
import { hashHistory } from 'react-router';
import cx from 'classnames';
import camelCase from 'lodash/camelCase';
import autoBind from 'auto-bind';
import { Button, ReadMoreSection } from '/src/shared';
import services from '/src/services';
import styles from './styles.scss';

class SideMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false,
      immediate: true,
    };
    autoBind(this);

    this.ref = React.createRef();
  }

  toggleMenu() {
    this.setState({
      immediate: false,
      openMenu: !this.state.openMenu,
    });
    this.ref.current.scrollTop = 0;
  }

  navigate(e) {
    e.stopPropagation();
    const txt = e.currentTarget.childNodes[0].nodeValue.toLowerCase().replace(/\s+/g, '-');
    const CCtext = camelCase(txt);
    hashHistory.push(`${CCtext}/0`);
    this.toggleMenu();
  }

  render() {
    const { color, colorName, data, logo } = this.props;
    const { openMenu, immediate } = this.state;
    return (
      <Fragment >
        <div className={cx(styles.menuContainer, { [styles.open]: openMenu })} >
          <div className={styles.inner} ref={this.ref} >
            <Button onClick={this.navigate} tag="h1" waveColor="white" >Home</Button >
            <div className={styles.divider} />
            <p className={styles.category} >Cardiac Solutions</p >
            <Button onClick={this.navigate} tag="h1" waveColor="white" >VEST</Button >
            <Button onClick={this.navigate} tag="h1" waveColor="white" >VIOLA</Button >
            <div className={styles.divider} />
            <p className={styles.category} >Vascular Solutions</p >
            <Button onClick={this.navigate} tag="h1" waveColor="white" >FRAME</Button >
            <Button onClick={this.navigate} tag="h1" waveColor="white" >FRAME FR</Button >
            <div className={styles.divider} />
            <Button onClick={this.navigate} tag="h1" waveColor="white" >NEWS & EVENTS</Button >
            {/*<div className={styles.divider} />*/}
            <Button onClick={this.navigate} tag="h1" waveColor="white" >ABOUT</Button >
            <div className={styles.divider} />
            <Button onClick={this.navigate} tag="h1" waveColor="white" >CONTACT</Button >
            {data && (<ReadMoreSection
              forceShowTrigger
              more={(
                <div className={styles.policyContainer} >
                  <div className={styles.innerContent} >
                    <h1 style={{ color }} >PRIVACY POLICY</h1 >
                    <div dangerouslySetInnerHTML={{ __html: data.terms.replace(/\n\r?/g, '<br />') }} />
                  </div >
                  <div className={styles.leftCol}>
                    <div style={{ color }} className={styles.header} >Privacy<br />Policy</div >
                    <img className={styles.logoImg} src={logo} />
                  </div>
                </div >
              )}
              btnTxt="Privacy policy"
              btnTxtColor="white"
              btnClass={styles.policy}
            />)}
            {/*<Button className={styles.policy} waveColor="white" onClick={this.showPolicy}>Privacy policy</Button >*/}
            {/*<Button tag="a" onClick={this.navigate} waveColor="white" >Terms & Conditions</Button >*/}
          </div >
        </div >
        <Button
          className={cx(styles.menuToggle)}
          onClick={this.toggleMenu}
          waveColor={colorName}
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
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
  data: PropTypes.object,
  logo: PropTypes.string,
};

const mapStateToProps = state => ({
  color: services.vgs.selectors.color(state),
  colorName: services.vgs.selectors.colorName(state),
  data: services.reactor.selectors.pageData(state, 'privacy policy'),
  logo: services.products.selectors.logo(state),
});

SideMenu.defaultProps = {
  logo: logoGreen,
};

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);
