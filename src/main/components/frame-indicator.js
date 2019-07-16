import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'auto-bind';
import { connect } from 'react-redux';
import { SnapScroll } from '/src/shared';
import 'babel-polyfill';
import services from '/src/services';
import styles from '../styles.scss';

class FrameIndicator extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  renderBullets() {
    const { count, color } = this.props;
    const bullets = [];
    for (let i = 0; i < count; i++) {
      bullets.push(<li key={i} style={{ borderColor: color }} />);
    }
    return bullets;
  }

  render() {
    const { frame, color } = this.props;

    return (
      <ul className={styles.frameIndicator} >
        {this.renderBullets()}
        <div className={styles.indicate} style={{
          top: 18 * frame,
          backgroundColor: color,
        }} />
      </ul >
    );
  }
}

FrameIndicator.propTypes = {
  count: PropTypes.number.isRequired,
  frame: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  count: SnapScroll.selectors.count(state),
  frame: SnapScroll.selectors.frame(state),
  color: services.products.selectors.color(state),
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FrameIndicator);
