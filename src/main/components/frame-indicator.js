import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import { SnapScroll } from '/src/components';
import 'babel-polyfill';
import styles from '../styles.scss';

class FrameIndicator extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderBullets() {
    const { count } = this.props;
    const bullets = [];
    for (let i = 0; i < count; i++) {
      bullets.push(<li key={i} />);
    }
    return bullets;
  }

  render() {
    const { frame } = this.props;

    return (
      <ul className={styles.frameIndicator} >
        {this.renderBullets()}
        <li className={styles.indicate} style={{
          top: 17 * frame
        }} />
      </ul >
    );
  }
}

FrameIndicator.propTypes = {
  count: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  count: SnapScroll.selectors.count(state),
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrameIndicator);
