import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll, Gallery } from '/src/components';
import IndexHeader from '../index-header/index-header';
import styles from './styles.scss';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
    };
    autoBind(this);
  }

  // componentDidMount() {
  //   setInterval(() => {
  //     this.setState({ reset: !this.state.reset });
  //   }, 1000);
  // }

  reverseAnimation() {
    const { reverseAnimation } = this.state;
    this.setState({ reverseAnimation: !reverseAnimation });
  }

  render() {
    const { frame, index } = this.props;
    return (
      <Spring
        from={{ opacity: frame === index ? 0 : 1 }}
        to={{ opacity: frame === index ? 1 : 0 }} >
        {props => <div
          className={styles.clinical}
          style={{
            opacity: props.opacity,
          }}
        >
          <IndexHeader index={index} header="Clinical" />
          <Gallery />
        </div >}
      </Spring >
    );
  }
}

Clinical.propTypes = {
  frame: PropTypes.number.isRequired,
  themeColor: PropTypes.oneOf(['blue']).isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  frame: SnapScroll.selectors.frame(state),
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default connect(mapStateToProps, mapDispatchToProps)(Clinical);
