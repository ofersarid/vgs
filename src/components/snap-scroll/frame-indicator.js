import React, { PureComponent } from 'react';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import styles from './styles.scss';

class FrameIndicator extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <ul className={styles.frameIndicator}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    );
  }
}

FrameIndicator.propTypes = {
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrameIndicator);
