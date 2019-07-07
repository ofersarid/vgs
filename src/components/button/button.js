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
    const { children, className, color, tag } = this.props;
    const Tag = tag;
    const copyProps = Object.assign({}, this.props);
    delete copyProps.color;
    delete copyProps.className;
    delete copyProps.children;
    delete copyProps.tag;
    return (
      <Tag
        {...copyProps}
        ref={this.ref}
        onClick={this.onClick}
        onMouseDown={this.ripple}
        onMouseUp={this.calm}
        className={cx('ripple waves-effect', styles.button, className, {
          'waves-light': color,
          'waves-color': !color,
          [styles.color]: color,
        })}
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
  onClick: PropTypes.func,
};

Button.defaultProps = {
  color: false,
  tag: 'div',
};

export default Button;
