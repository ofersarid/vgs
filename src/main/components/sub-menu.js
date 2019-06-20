import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '/src/components';
import { Spring, config } from 'react-spring/renderprops';
import cx from 'classnames';
import autoBind from 'auto-bind';
import styles from '../styles.scss';

class SubMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      expand: false,
    };
    autoBind(this);
  }

  toggle() {
    const { expand } = this.state;
    this.setState({
      expand: !expand,
    });
  }

  render() {
    const { children, label } = this.props;
    const { expand } = this.state;
    return (
      <Button el="li" className={cx(styles.subMenu)} onClick={this.toggle} >{label}
        <Spring
          from={expand ? {
            height: 0,
            opacity: 0,
            transform: 'translateX(10px)',
          } : {
            height: 'auto',
            opacity: 1,
            transform: 'translateX(0px)',
          }}
          to={expand ? {
            height: 'auto',
            opacity: 1,
            transform: 'translateX(0px)',
          } : {
            height: 0,
            opacity: 0,
            transform: 'translateX(10px)',
          }}
          config={key => key === 'height'
            ? Object.assign(config.default, { delay: expand ? 0 : 200 })
            : Object.assign(config.slow, { delay: expand ? 200 : 0 })}
        >
          {style => <ul style={style} >
            {children}
          </ul >}
        </Spring >
      </Button >
    );
  }
}

SubMenu.propTypes = {
  children: PropTypes.any,
  label: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
