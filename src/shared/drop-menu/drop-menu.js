import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import Button from '../button/button';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const defaultDecorator = option => <div key={option.value} className={styles.defaultDecorator} >{option.display}</div >;

class DropMenu extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      open: false,
    };
  }

  toggle() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  render() {
    const { options, decorator, selected, triggerClass, color } = this.props;
    const { open } = this.state;
    return (
      <Fragment >
        <Button className={cx(styles.trigger, triggerClass)} onClick={this.toggle} style={{
          color,
          borderColor: color,
        }} waveColor={color === '#0272BA' ? 'blue' : 'purple'} >
          <p >{selected.display}</p >
          <ChevronDown className={cx(styles.arrow, { [styles.flip]: open })} />
        </Button >
        {open && (
          <div className={cx(styles.menu)} >
            {options.map(decorator)}
          </div >
        )}
      </Fragment >
    );
  }
}

const option = PropTypes.shape({
  display: PropTypes.any.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

DropMenu.propTypes = {
  options: PropTypes.arrayOf(option).isRequired,
  decorator: PropTypes.func,
  selected: option,
  triggerClass: PropTypes.string,
  color: PropTypes.string.isRequired,
};

DropMenu.defaultProps = {
  decorator: defaultDecorator,
};

export default DropMenu;
