import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import autoBind from 'auto-bind';
import PropTypes from 'prop-types';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { Play3 } from 'styled-icons/icomoon/Play3';
import { RatioBox, Button } from '../index';
import styles from './styles.scss';

class Youtube extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isLoaded: false,
      playing: false,
    };
  }

  mediaReady() {
    this.setState({ isLoaded: true });
  }

  onYouTubeReady() {
    this.setState({ isLoaded: true });
  }

  play() {
    this.setState({ playing: true });
  }

  onPause() {
    this.setState({ playing: false });
  }

  render() {
    const { ratio, className, url, fullScreen, color } = this.props;
    const { playing } = this.state;
    return (
      <RatioBox
        ratio={ratio}
        className={cx(className)} >
        <Fragment >
          <YouTubePlayer
            url={url}
            playing={playing}
            config={{
              youtube: {
                playerVars: {
                  rel: 0
                },
                preload: true,
              }
            }}
            onReady={this.onYouTubeReady}
            onPause={this.onPause}
            controls
            width="100%"
            height="100%"
            className={cx(styles.youtube, {
              [styles.playing]: playing,
              [styles.fullScreen]: fullScreen,
            })}
          />
          <Button className={cx(styles.concealer, {
            [styles.hide]: playing,
            [styles.fullScreen]: fullScreen,
          })} onClick={this.play} textColor={color}>
            <Play3 />
          </Button>
        </Fragment >
      </RatioBox >
    );
  }
}

Youtube.propTypes = {
  ratio: PropTypes.number.isRequired,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
};

Youtube.deafultProps = {
  ratio: 1,
  fullScreen: false,
  color: 'black',
};

export default Youtube;
