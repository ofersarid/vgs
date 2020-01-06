import React, { PureComponent } from 'react';
// import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.scss';
import { FadeIn } from '../index';

class VideoAsBg extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.video = React.createRef();
    this.state = {
      show: false
    };
  }

  componentDidMount() {
    this.video.current.addEventListener('ended', this.restart);
    this.video.current.addEventListener('canplay', this.show);
  }

  componentWillUnmount() {
    if (this.video.current) {
      this.video.current.removeEventListener('ended', this.restart);
      this.video.current.removeEventListener('canplay', this.show);
    }
  }

  show() {
    this.setState({ show: true });
  }

  restart() {
    this.video.current.currentTime = 0;
    this.video.current.play();
  }

  render() {
    const { src, blur, brightness, className } = this.props;
    const { show } = this.state;
    return (
      <FadeIn className={styles.video} spread suppress={!show} >
        <video ref={this.video} className={cx(className)} autoPlay >
          <source src={src} type="video/mp4" />
        </video >
        {blur && <div className={styles.blur} style={{ backdropFilter: `blur(${blur}px) brightness(${brightness}%)` }} />}
      </FadeIn >
    );
  }
}

VideoAsBg.propTypes = {
  src: PropTypes.string.isRequired,
  blur: PropTypes.number,
  brightness: PropTypes.number,
  className: PropTypes.string,
};

VideoAsBg.defaultProps = {
  blur: 0,
  brightness: 100,
};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(VideoAsBg);
