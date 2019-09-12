import React, { PureComponent } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import Waves from 'node-waves';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.ref = React.createRef();
  }

  componentDidMount() {

  }

  ripple(e) {
    e.stopPropagation();
    Waves.ripple(this.ref.current, {
      wait: 10000,
    });
  }

  calm(e) {
    e.stopPropagation();
    Waves.calm(this.ref.current);
  }

  onClick(e) {
    const { onClick } = this.props;
    e.stopPropagation();
    if (onClick) {
      onClick(e);
    }
  }

  render() {
    const { children, className, tag, waveColor, textColor, disable, style } = this.props;
    const Tag = tag;
    const copyProps = Object.assign({}, this.props);
    delete copyProps.color;
    delete copyProps.className;
    delete copyProps.children;
    delete copyProps.tag;
    delete copyProps.waveColor;
    delete copyProps.textColor;
    delete copyProps.disable;
    return (
      <Tag
        {...copyProps}
        ref={this.ref}
        onClick={this.onClick}
        onMouseDown={this.ripple}
        onTouchStart={this.ripple}
        onTouchEnd={this.calm}
        onMouseUp={this.calm}
        onMouseLeave={this.calm}
        className={cx(`ripple waves-effect waves-${waveColor}`, styles.button, className, { [styles.disable]: disable })}
        style={{
          color: textColor,
          ...style,
        }}
      >
        {children}
      </Tag >
    );
  }
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.bool,
  tag: PropTypes.string,
  textColor: PropTypes.string,
  onClick: PropTypes.func,
  waveColor: PropTypes.oneOf(['white', 'blue', 'purple', 'gray', 'red']),
  disable: PropTypes.bool,
  style: PropTypes.object,
};

Button.defaultProps = {
  color: false,
  disable: false,
  tag: 'div',
  waveColor: 'white',
};

export default Button;
