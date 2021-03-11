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
  }

  render() {
    const { src, blur, brightness, className } = this.props;
    return (
      <FadeIn className={styles.video} spread>
        <video
          playsInline
          ref={this.video}
          className={cx(className)}
          loop
          muted
          autoPlay
        >
          <source src={src} type='video/mp4' />
        </video>
        {Boolean(blur) && (
          <div
            className={styles.blur}
            style={{
              backdropFilter: `blur(${blur}px) brightness(${brightness}%)`
            }}
          />
        )}
      </FadeIn>
    );
  }
}

VideoAsBg.propTypes = {
  src: PropTypes.string.isRequired,
  blur: PropTypes.number,
  brightness: PropTypes.number,
  className: PropTypes.string
};

VideoAsBg.defaultProps = {
  blur: 0,
  brightness: 100
};

const mapStateToProps = (state) => ({}); // eslint-disable-line

const mapDispatchToProps = (dispatch) => ({}); // eslint-disable-line

export default compose(connect(mapStateToProps, mapDispatchToProps))(VideoAsBg);
