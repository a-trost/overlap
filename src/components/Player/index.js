import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { hot } from "react-hot-loader";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import ReactPlayer from "react-player";
import Duration from "./duration";
import { formatEpisodeNumber } from "../../utils";
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
  border: 1px solid #ccc;
  max-width: 100%;
`;

const SpaceFiller = styled.div`
  grid-area: player;
  height: 75px;
  width: 100%;
`;

const Player = styled.div`
  position: ${props => (props.scrolled ? "fixed" : "static")};
  top: ${props => (props.scrolled ? "0" : "unset")};
  box-shadow: ${props => (props.scrolled ? "0px 2px 6px #00000022" : "none")};
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 75px;
  max-width: 1000px;
  @media all and (max-width: 650px) {
    max-width: 100vw;
    left: ${props => (props.scrolled ? "0" : "unset")};
    right: ${props => (props.scrolled ? "0" : "unset")};
    height: 45px;
  }
`;

const Logo = styled.div`
  max-width: 200px;
  background-color: whitesmoke;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #ddd;
  img {
    width: 100%;
    height: auto;
  }
  @media all and (max-width: 650px) {
    display: none;
  }
`;

const PlayButton = styled.button`
  cursor: pointer;
  display: ${props => (props.size === "small" ? "none" : "flex")};
  height: 75px;
  width: 75px;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  position: relative;
  border: none;
  :active {
    transform: translateY(2px);
  }
  @media all and (max-width: 650px) {
    display: ${props => (props.size === "small" ? "flex" : "none")};
    height: 45px;
    width: 45px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
`;

const TrackInfoContainer = styled.div`
  width: 100%;
  background-color: whitesmoke;
  height: 75%;
  position: relative;
  cursor: default;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  @media all and (max-width: 650px) {
    height: 85%;
  }
`;

const TrackName = styled.div`
  min-width: 150px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 2px 0;
  padding: 0.5rem;
  overflow: hidden;
  @media all and (max-width: 650px) {
    align-items: flex-start;
    min-width: unset;
    overflow: hidden;
    text-overflow: ellipsis;
    box-shadow: inset 4px 0px 8px #ffffff33;
    justify-content: flex-start;
    margin: 0;
    padding: 2px 0;
    h3 {
      font-size: 15px;
    }
  }
`;

const ControlBox = styled.div`
  min-width: 50px;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 650px) {
    min-width: unset;
  }
`;

const SeekBarContainer = styled.div`
  width: 100%;
  background-color: #d5d5d5;
  height: 25%;
  position: relative;
  cursor: text;
  @media all and (max-width: 650px) {
    height: 15%;
  }
`;

const SeekBar = styled.div`
  height: 100%;
  background-color: #f2c043;
  width: ${props => props.position}%;
  position: absolute;
`;

const SpeedButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: none;
  width: 55px;
  height: 35px;
  font-size: 14px;
  color: #777;
  font-weight: 700;
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.4s ease;
  :hover {
    border: 2px solid #999;
    color: #444;
  }
  @media all and (max-width: 650px) {
    width: 35px;
    height: 35px;
    margin-right: 0.5rem;
    font-size: 13px;
  }
`;

const VolumeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: none;
  border: none;
  width: 55px;
  height: 35px;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  .volume {
    transition: color 0.4s ease;
    color: #777;
  }
  :hover {
    border: 2px solid #999;
    .volume {
      color: #444;
    }
  }
  @media all and (max-width: 650px) {
    width: 35px;
    height: 35px;
    margin-right: 0.5rem;
  }
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playingEpisode: 0,
      url: null,
      pip: false,
      playing: false,
      controls: false,
      light: false,
      volume: 1,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false,
      title: "",
      episodes: {}
    };
  }

  load = ({ mp3Url, title }) => {
    this.setState({
      url: mp3Url,
      played: 0,
      loaded: 0,
      pip: false,
      title: title,
      playing: false
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

  onPlay = () => {
    this.setState({ playing: true });
  };
  onPause = () => {
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
    // We only want to update time slider if we are not currently seeking

    if (!this.state.seeking) {
      this.setState(state);
    }
  };
  onEnded = () => {
    this.setState({ playing: this.state.loop });
  };
  onDuration = duration => {
    this.setState({ duration });
  };
  renderLoadButton = track => {
    return <button onClick={() => this.load(track)}>{track.title}</button>;
  };

  increaseSpeed = () => {
    const currentSpeed = this.state.playbackRate;
    const speeds = [1.0, 1.25, 1.5, 1.75, 2.0, 0.5];
    if (currentSpeed === 0.5) {
      this.setState({ playbackRate: parseFloat(speeds[0]) });
    } else {
      const currentIndex = speeds.indexOf(currentSpeed);
      this.setState({ playbackRate: parseFloat(speeds[currentIndex + 1]) });
    }
  };

  increaseVolume = () => {
    const currentVolume = this.state.volume;
    const volumes = [1.0, 0, 0.5];
    if (currentVolume === 0.5) {
      this.setState({ volume: parseFloat(volumes[0]) });
    } else {
      const currentIndex = volumes.indexOf(currentVolume);
      this.setState({ volume: parseFloat(volumes[currentIndex + 1]) });
    }
  };

  ref = player => {
    this.player = player;
  };

  indexEpisodes(allEpisodes) {
    allEpisodes.forEach(episode => {
      const episodes = this.state.episodes;
      const data = {
        title: `${formatEpisodeNumber(episode.node.itunes.episode)} - ${
          episode.node.title
        }`,
        mp3Url: episode.node.enclosure.url,
        duration: episode.node.itunes.duration
      };
      episodes[
        episode.node.itunes.episode ? episode.node.itunes.episode : "0"
      ] = data;
      this.setState({ episodes });
    });
    // console.log("EPISODES", this.state.episodes);
  }

  componentDidMount() {
    this.indexEpisodes(this.props.allFeedOverlapPodcast.edges);
    this.load(this.state.episodes[Object.keys(this.state.episodes).length - 1]);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playingEpisode !== this.props.playingEpisode) {
      this.load(this.state.episodes[nextProps.playingEpisode]);
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
        <Container id="player">
          <Player scrolled={scrolled}>
            {scrolled && (
              <Logo>
                <img src={logo} alt="The Overlap" />
              </Logo>
            )}
            <PlayButton onClick={this.playPause} aria-label="Play Button">
              {playing ? (
                <Icon color="yellow" name="pause circle" size="huge" />
              ) : (
                <Icon color="yellow" name="play circle" size="huge" />
              )}
            </PlayButton>
            <PlayButton
              size="small"
              onClick={this.playPause}
              aria-label="Play Button"
            >
              {playing ? (
                <Icon color="yellow" name="pause circle" size="big" />
              ) : (
                <Icon color="yellow" name="play circle" size="big" />
              )}
            </PlayButton>
            <Wrapper>
              <TrackInfoContainer>
                <TrackName>
                  <h3>{title}</h3>
                </TrackName>
                <ControlBox>
                  <SpeedButton
                    onClick={this.increaseSpeed}
                    aria-label="Play Speed"
                  >
                    {playbackRate}&times;
                  </SpeedButton>
                </ControlBox>
                <ControlBox>
                  <VolumeButton
                    onClick={this.increaseVolume}
                    aria-label="Play Volume"
                  >
                    {volume === 1 && (
                      <Icon className="volume" name="volume up" />
                    )}
                    {volume === 0.5 && (
                      <Icon className="volume" name="volume down" />
                    )}
                    {volume === 0 && (
                      <Icon className="volume" name="volume off" />
                    )}
                  </VolumeButton>
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
