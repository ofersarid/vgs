import React, { PureComponent } from 'react';
import { Spring } from 'react-spring/renderprops';
import autoBind from 'auto-bind';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { SnapScroll } from '/src/components';
import IndexHeader from '../index-header/index-header';
import styles from './styles.scss';
import ReactSwipe from 'react-swipe';
import mock from './clinical.mock';

class Clinical extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      reverseAnimation: false,
      slide: 0,
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

  renderData() {
    const { slide } = this.state;
    const dom = mock.map((m, i) => (
      <div className={cx(styles.outerWrapper, { [styles.disable]: slide !== i })} key={m.id} >
        <div className={`ripple waves-color ${styles.innerWrapper}`} >
          <div className={styles.date} >{moment(m.date).format('MMMM Do, YYYY')}</div >
          <div className={styles.header} >{m.header}</div >
          <div className={styles.source} >{m.source}</div >
        </div >
      </div >
    ));
    return dom;
  }

  onChangeHandler(slide) {
    this.setState({ slide });
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
              continuous: false,
              stopPropagation: true,
              callback: this.onChangeHandler,
            }}
            className={styles.carousel}
            ref={this.clinicalSwipeEl}
          >
            {this.renderData()}
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
