import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import { Tooltip } from 'react-tippy';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { connect } from 'react-redux';
import 'react-tippy/dist/tippy.css';
import Button from '../button/button';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import services from '/src/services';

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

  onOptionClick(e) {
    const { onChange } = this.props;
    onChange(e.currentTarget.innerText);
    this.setState({ open: false });
  }

  render() {
    const { options, selected, triggerClass, color, colorName } = this.props;
    const { open } = this.state;
    return (
      <Fragment >
        <Tooltip
          open={open}
          interactive
          position="bottom"
          animateFill={false}
          onRequestClose={this.toggle}
          html={(
            <ul className={styles.menu}>
              {options.map(opt => (
                <li
                  key={opt}
                  onClick={this.onOptionClick}
                >{opt}
                </li >
              ))}
            </ul >
          )}
        >
          <Button textColor={color} className={cx(styles.trigger, triggerClass)} onClick={this.toggle} withBorder waveColor={colorName} >
            <span >{selected}</span >
            <ChevronDown className={cx(styles.arrow, { [styles.flip]: open })} />
          </Button >
        </Tooltip >
      </Fragment >
    );
  }
}

DropMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string,
  triggerClass: PropTypes.string,
  color: PropTypes.string.isRequired,
  colorName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  colorName: services.vgs.selectors.colorName(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(DropMenu);
