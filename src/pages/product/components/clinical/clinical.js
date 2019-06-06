import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnapScroll } from '/src/components';
import IndexHeader from '../index-header/index-header';
import styles from './styles.scss';
import ReactSwipe from 'react-swipe';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
    };
    autoBind(this);
    this.clinicalSwipeEl = React.createRef();
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
          <ReactSwipe
            swipeOptions={{
              widthOfSiblingSlidePreview: 40,
              continuous: true,
              stopPropagation: true,
            }}
            className={styles.carousel}
            ref={this.clinicalSwipeEl}
          >
            <div >PANE 1</div >
            <div >PANE 2</div >
            <div >PANE 3</div >
          </ReactSwipe >
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
