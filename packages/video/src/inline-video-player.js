/* eslint-env browser */
import React, { Component, Fragment } from "react";
import { appendToImageURL } from "@times-components/utils";
import { propTypes, defaultProps } from "./video-prop-types";
import Video360Icon from "./video-360-icon";

const css = `
  div[data-is-360="true"] button.vjs-big-play-button {
    display: none !important;
  }

  .video-js .vjs-big-play-button {
    width: 70px;
    height: 70px;
    margin-top: -35px;
    margin-left: -35px;

    background: rgba(0, 0, 0, 0.4);

    line-height: 65px;

    border-radius: 0;
    border-style: solid;
    border-width: 3px;
    border-color: white;
  }

  .video-js .vjs-big-play-button:before {
    font-size: 60px;
    left: -2px;
  }

  .video-js .vjs-dock-text {
    visibility: hidden;
  }

  .video-js .vjs-poster {
    background-size: cover;
  }

  .video-js .vjs-tech {
    position: relative;
  }
`;

class InlineVideoPlayer extends Component {
  static scriptLoadError = false;

  static activePlayers = [];

  static brightcoveSDKLoadedStarted = false;

  static brightcoveSDKHasLoaded() {
    return !!(window.bc && window.videojs);
  }

  static appendScript(s) {
    document.body.appendChild(s);
  }

  static attachStyles() {
    const styleTag = document.createElement("style");
    styleTag.type = "text/css";
    const cssText = document.createTextNode(css);
    styleTag.appendChild(cssText);
    document.head.appendChild(styleTag);
  }

  constructor(props) {
    super(props);

    this.state = {
      error: null,
      hasVideoPlayed: false
    };

    this.id = `${props.videoId}-${props.accountId}-${props.id}`;
    this.videoContainerRef = React.createRef();
    this.observer = null;
  }

  componentDidMount() {
    this.observer = this.createIntersectionObserver();
    if (this.observer && this.videoContainerRef) {
      this.observer.observe(this.videoContainerRef.current);
    } else {
      this.loadBrightcoveSDKIfRequired();
    }

    if (InlineVideoPlayer.scriptLoadError) {
      this.handleError(InlineVideoPlayer.scriptLoadError);
    }

    InlineVideoPlayer.activePlayers.push(this);

    if (InlineVideoPlayer.brightcoveSDKHasLoaded()) {
      this.initBrightcove();
    }
  }

  componentWillUnmount() {
    InlineVideoPlayer.activePlayers.splice(
      InlineVideoPlayer.activePlayers.indexOf(this)
    );
    if (this.player) {
      this.player.dispose();
      this.player = null;
    }

    if (this.observer) {
      this.observer.disconnect();
    }
  }

  handleError = () => {
    this.setState({ error: true });
  };

  handlePlay = () => {
    this.setState({ hasVideoPlayed: true });

    InlineVideoPlayer.activePlayers.forEach(video => {
      if (video !== this && video.player) {
        video.player.pause();
      }
    });
  };

  createIntersectionObserver() {
    return "IntersectionObserver" in window
      ? new window.IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            this.loadBrightcoveSDKIfRequired();
          }
        })
      : null;
  }

  loadBrightcoveSDKIfRequired() {
    if (!InlineVideoPlayer.brightcoveSDKLoadedStarted) {
      InlineVideoPlayer.brightcoveSDKLoadedStarted = true;

      const s = this.createBrightcoveScript();

      s.onload = () => {
        InlineVideoPlayer.activePlayers.forEach(player => player.initVideojs());
      };

      s.onerror = () => {
        InlineVideoPlayer.scriptLoadError = "Brightcove script failed to load";
        InlineVideoPlayer.activePlayers.forEach(player => player.handleError());
      };

      InlineVideoPlayer.appendScript(s);
      InlineVideoPlayer.attachStyles();
    }
  }

  createBrightcoveScript() {
    const { accountId, playerId } = this.props;
    const s = document.createElement("script");
    s.src = `//players.brightcove.net/${accountId}/${playerId}_default/index.min.js`;
    s.defer = true;

    return s;
  }

  initVideojs() {
    this.player = window.videojs(this.id);
    this.player.ready(() => {
      this.player.contextmenu({ disabled: true });
    });
    this.player.on("error", this.handleError);
    this.player.on("play", this.handlePlay);
  }

  initBrightcove() {
    window.bc(document.getElementById(this.id));

    this.initVideojs();
  }

  render() {
    const {
      width,
      height,
      poster,
      videoId,
      accountId,
      playerId,
      is360
    } = this.props;
    const { error, hasVideoPlayed } = this.state;
    if (error) {
      throw new Error("Can't load video"); // caught by parent ErrorView
    }

    return (
      /* eslint jsx-a11y/media-has-caption: "off" */
      // Added a wrapping div as brightcove adds siblings to the video tag
      <div
        data-is-360={is360}
        data-testid="video-component"
        ref={this.videoContainerRef}
        style={{ height, width }}
        className="lcpItem"
      >
        <div style={{ height, width, position: "relative" }}>
          {!hasVideoPlayed && <Fragment>{is360 && <Video360Icon />}</Fragment>}
          <video
            id={this.id}
            style={{ height, width }}
            {...(poster
              ? { poster: appendToImageURL(poster.uri, "resize", 960) }
              : {})}
            className="video-js"
            controls
            data-account={accountId}
            data-application-id
            data-embed="default"
            data-player={playerId}
            data-video-id={videoId}
          />
        </div>
      </div>
    );
  }
}

InlineVideoPlayer.defaultProps = defaultProps;
InlineVideoPlayer.propTypes = propTypes;

export default InlineVideoPlayer;
