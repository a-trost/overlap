import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import ReactPlayer from "react-player";
import Duration from "./duration";
import styled from "styled-components";
import logo from "../../../static/images/overlapLogoNoTagline.svg";

const playIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32.18"
    height="48.805"
    viewBox="0 0 32.18 48.805"
  >
    <path
      d="M1271.953,362.117v48.805l32.18-24.358Z"
      transform="translate(-1271.953 -362.117)"
      fill="#868181"
    />
  </svg>
);

const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="49"
    viewBox="0 0 31 49"
  >
    <g transform="translate(-18791 -899)">
      <rect
        width="11"
        height="49"
        transform="translate(18811 899)"
        fill="#868181"
      />
      <rect
        width="11"
        height="49"
        transform="translate(18791 899)"
        fill="#868181"
      />
    </g>
  </svg>
);

const Container = styled.div`
  grid-area: player;
  z-index: 5;
  width: 100%;
  position: ${props => (props.scrolled ? "fixed" : "static")};
  top: ${props => (props.scrolled ? "0" : "unset")};
`;

const SpaceFiller = styled.div`
  grid-area: player;
  height: 75px;
  width: 100%;
`;

const Player = styled.div`
  position: ${props => (props.scrolled ? "fixed" : "static")};
  top: ${props => (props.scrolled ? "0" : "unset")};
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 75px;
`;

const Logo = styled.div`
  max-width: 200px;
  background-color: white;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: auto;
  }
`;

const PlayButton = styled.button`
  cursor: pointer;
  display: flex;
  height: 75px;
  width: 75px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  position: relative;
  :active {
    transform: translateY(2px);
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
`;

const TrackInfoContainer = styled.div`
  width: 100%;
  background-color: #eee;
  height: 75%;
  position: relative;
  cursor: default;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;

const TrackName = styled.div`
  min-width: 150px;
  flex: 5;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 2px 0;
  padding: 0.5rem;
`;

const ControlBox = styled.div`
  flex: 1;
  min-width: 150px;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin: 2px 0;
  border-left: 1px solid #aaa;
  padding: 0.5rem;
  input {
    width: 100%;
  }
`;

const SeekBarContainer = styled.div`
  width: 100%;
  background-color: #d5d5d5;
  height: 25%;
  position: relative;
  cursor: text;
`;

const SeekBar = styled.div`
  height: 100%;
  background-color: #b12e1b;
  width: ${props => props.position}%;
  position: absolute;
`;

const SpeedButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingIndex: 0,
      url: null,
      pip: false,
      playing: true,
      controls: false,
      light: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      title: ""
    };
  }

  load = ({ mp3Url, title }) => {
    this.setState({
      url: mp3Url,
      played: 0,
      loaded: 0,
      pip: false,
      title: title
    });
  };
  playPause = () => {
    this.setState({ playing: !this.state.playing });
  };
  stop = () => {
    this.setState({ url: null, playing: false });
  };
  toggleControls = () => {
    const url = this.state.url;
    this.setState(
      {
        controls: !this.state.controls,
        url: null
      },
      () => this.load({ link: url, title: "" })
    );
  };

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) });
  };
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) });
  };
  onPlay = () => {
    console.log("onPlay");
    this.setState({ playing: true });
  };
  onPause = () => {
    console.log("onPause");
    this.setState({ playing: false });
  };
  onSeekMouseDown = e => {
    // this.setState({ seeking: true });
  };
  onSeekChange = e => {
    // this.setState({ played: parseFloat(e.target.value) });
  };
  onSeekMouseUp = e => {
    this.setState({ seeking: false });
    const location =
      (e.nativeEvent.offsetX / this.seekBar.offsetWidth) * this.state.duration;
    this.player.seekTo(location); //seconds
  };
  onProgress = state => {
    // console.log("onProgress", state);
    // We only want to update time slider if we are not currently seeking

    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  onEnded = () => {
    console.log("onEnded");
    this.setState({ playing: this.state.loop });
  };
  onDuration = duration => {
    console.log("onDuration", duration);
    this.setState({ duration });
  };
  renderLoadButton = track => {
    return <button onClick={() => this.load(track)}>{track.title}</button>;
  };

  increaseSpeed = () => {
    const currentSpeed = this.state.playbackRate;
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0, 0.5];
    if (this.state.playbackRate === 0.5) {
      this.setState({ playbackRate: parseFloat(speeds[0]) });
    } else {
      const currentIndex = speeds.indexOf(currentSpeed);
      this.setState({ playbackRate: parseFloat(speeds[currentIndex + 1]) });
    }
  };

  ref = player => {
    this.player = player;
  };

  componentDidMount() {
    this.setState({ playing: false });
    this.load(this.props.episodeList[0]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playingIndex !== this.state.playingIndex) {
      this.setState(
        {
          playingIndex: nextProps.playingIndex
        },
        data => {
          this.load(this.props.episodeList[this.state.playingIndex]);
        }
      );
      this.onPlay();
    }
  }

  render() {
    const {
      url,
      playing,
      controls,
      light,
      volume,
      muted,
      loop,
      played,
      loaded,
      duration,
      playbackRate,
      pip,
      title
    } = this.state;
    const { scrolled } = this.props;
    return (
      <>
        {scrolled && <SpaceFiller />}
        <Container id="player" className={scrolled ? "sticky" : ""}>
          <ReactPlayer
            ref={this.ref}
            className="react-player"
            width="100%"
            height="100%"
            url={url}
            pip={pip}
            playing={playing}
            controls={controls}
            playbackRate={playbackRate}
            volume={volume}
            // onReady={() => console.log("onReady")}
            // onStart={() => console.log("onStart")}
            onPlay={this.onPlay}
            onPause={this.onPause}
            // onBuffer={() => console.log("onBuffer")}
            // onSeek={e => console.log("onSeek", e)}
            onEnded={this.onEnded}
            onError={e => console.log("onError", e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
          <Player scrolled={scrolled}>
            {scrolled && (
              <Logo>
                <img src={logo} alt="The Overlap" />
              </Logo>
            )}
            <PlayButton onClick={this.playPause}>
              {playing ? pauseIcon : playIcon}
            </PlayButton>
            <Wrapper>
              <TrackInfoContainer>
                <TrackName>
                  <h3>{title}</h3>
                </TrackName>
                <ControlBox>
                  <SpeedButton onClick={this.increaseSpeed}>
                    Speed: {playbackRate}&times;
                  </SpeedButton>
                </ControlBox>
                <ControlBox>
                  Volume:{" "}
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="any"
                    value={volume}
                    onChange={this.setVolume}
                  />
                </ControlBox>
              </TrackInfoContainer>
              <SeekBarContainer
                ref={i => (this.seekBar = i)}
                onMouseDown={this.onSeekMouseDown}
                onMouseUp={this.onSeekMouseUp}
              >
                <SeekBar position={played.toFixed(3) * 100} />
              </SeekBarContainer>
            </Wrapper>
          </Player>
        </Container>
      </>
    );
  }
}

export default hot(module)(App);

{
  /* <span>{this.state.title}</span>
        <div className="player-wrapper">
          
        </div>
        <div>
         
        </div>
        <div>
          Speed:
          <button onClick={this.increaseSpeed}>
            {this.state.playbackRate}&times;
          </button>
        </div>
        <div>
          Seek
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={played}
            onMouseDown={this.onSeekMouseDown}
            onChange={this.onSeekChange}
            onMouseUp={this.onSeekMouseUp}
          />
        </div>
        <div>
          Volume
          <input
            type="range"
            min={0}
            max={1}
            step="any"
            value={volume}
            onChange={this.setVolume}
          />
        </div>
        <div>
          Played
          <progress max={1} value={played} />
        </div>
        <div>
          Loaded
          <progress max={1} value={loaded} />
        </div>
        <div>
          playing
          {playing ? "true" : "false"}
        </div>
        <div>
          volume
          {volume.toFixed(3) * 10}
        </div>
        <div>
          played
          {played.toFixed(3) * 100}%
        </div>
        <div>
          loaded
          {loaded.toFixed(3) * 100}%
        </div>
        <div>
          duration
          <Duration seconds={duration} />
        </div>
        <div>
          elapsed
          <Duration seconds={duration * played} />
        </div>

         */
}
