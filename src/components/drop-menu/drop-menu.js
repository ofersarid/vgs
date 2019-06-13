import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const defaultDecorator = option => <div className={styles.defaultDecorator} >{option.display}</div >;

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
    const { options, decorator, selected, triggerClass } = this.props;
    const { open } = this.state;
    return (
      <Fragment >
        <div className={cx('ripple waves-color', styles.trigger, triggerClass)} onClick={this.toggle} >
          <p >{selected.display}</p >
          <ChevronDown className={cx(styles.arrow, { [styles.flip]: open })} />
        </div >
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
};

DropMenu.defaultProps = {
  decorator: defaultDecorator,
};

export default DropMenu;
