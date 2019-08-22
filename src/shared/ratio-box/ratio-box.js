import React, { PureComponent } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.scss';

class RatioBox extends PureComponent {
  constructor(props) {
    super(props);
    this.box = React.createRef();
  }

  componentDidMount() {
    const { ratio } = this.props;
    const width = this.box.current.offsetWidth;
    const height = width * ratio;
    this.box.current.style.height = `${height}px`;
  }

  render() {
    const { className, children, style } = this.props;
    return (
      <div
        ref={this.box}
        className={cx(styles.ratioBox, className)}
        style={style} >{children}</div >
    );
  }
}

RatioBox.propTypes = {
  ratio: PropTypes.number.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
  image: PropTypes.string,
};

export default RatioBox;
