import React, { Component } from "react";
import logo from "../../../static/images/overlapLogoNoTagline.svg";
import styled from "styled-components";

const countDownDate = new Date("Mar 19, 2019 12:00:00").getTime();

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  .description {
    font-size: 2.1vw;
    margin-top: 2rem;
    color: #19232a;
    text-align: center;
    letter-spacing: 2px;
  }
  .playerWrapper {
    padding: 1rem;
    margin: 1rem;
    width: 75%;
  }
  h2 {
    text-align: center;
  }
  @media all and (max-width: 700px) {
    .description {
      font-size: 18px;
    }
  }
`;

const Logo = styled.img`
  max-width: 90%;
  width: 450px;
`;

const CounterWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-flow: row nowrap;
  .colon {
    margin: 0 1.5vw;
  }
  .column {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    width: 2ch;
    font-size: 8vw;
    font-weight: 700;
    color: #d73721;
    line-height: 1;
    .label {
      font-size: 2vw;
      text-transform: uppercase;
      font-weight: 400;
      color: #8f979c;
    }
  }
  @media all and (max-width: 700px) {
    .column {
      font-size: 50px;
      .label {
        font-size: 14px;
      }
    }
  }
`;

const LinkButton = styled.a`
  border: none;
  text-decoration: none;
  background-color: ${props => props.bgColor || "#F0C043"};
  color: ${props => props.textColor || "white"};
  padding: 0.75rem 2.5rem;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0.5rem;
  border: 1.5px solid ${props => props.bgColor || "#F0C043"};
  transition: all ease 0.3s;
  position: relative;
  &:hover {
    color: ${props => props.bgColor || "#F0C043"};
    background-color: ${props => props.textColor || "white"};
    border-color: ${props => props.bgColor || "#F0C043"};
  }
  &:active {
    top: 2px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const Colon = () => <div className="colon" />;

const Column = props => {
  return (
    <div className="column">
      {props.number <= 9 && <span className="number">0{props.number}</span>}
      {props.number > 9 && <span className="number">{props.number}</span>}
      <span className="label">{props.label}</span>
    </div>
  );
};

const TempPlayer = () => {
  return (
    <div className="playerWrapper">
      <iframe
        src="https://www.buzzsprout.com/255972/982430-preview-trailer?client_source=small_player&amp;iframe=true&amp;referrer=https%3A%2F%2Fwww.buzzsprout.com%2F255972.js"
        width="100%"
        height="200"
        frameborder="0"
        scrolling="no"
      />
    </div>
  );
};
export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  interval;

  componentDidMount() {
    this.interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      this.setState({ days, hours, minutes, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <Wrapper>
        <Logo src={logo} alt="Logo" />
        <span className="description">
          A Design and Web Development Podcast <br />
          Launching March 19th
        </span>
        <CounterWrapper>
          <Column number={this.state.days} label="Days" color="#1DA59B" />
          <Colon />
          <Column number={this.state.hours} label="Hours" color="#D32B1A" />
          <Colon />
          <Column number={this.state.minutes} label="Minutes" color="#FFB000" />
          <Colon />
          <Column number={this.state.seconds} label="Seconds" color="#B12E1B" />
        </CounterWrapper>
        <h2>Subscribe wherever you get your podcasts!</h2>
        <ButtonContainer>
          <LinkButton
            bgColor="#65D36E"
            href="https://open.spotify.com/show/51Z2Ak2g3SwTBsd4GfAaH2?si=XetqwmmtSc6qujZ8RPbo_A"
            target="_blank"
          >
            Spotify
          </LinkButton>
          <LinkButton
            bgColor="#333333"
            textColor="#F0C043"
            href="https://www.stitcher.com/s?fid=382097&refid=stpr"
            target="_blank"
          >
            Stitcher
          </LinkButton>
          <LinkButton
            bgColor="#1D1F3A"
            textColor="#64D4CB"
            href="https://tunein.com/podcasts/Education-Podcasts/The-Overlap-p1210323/"
            target="_blank"
          >
            TuneIn
          </LinkButton>
          <LinkButton
            bgColor="#D8503F"
            textColor="#ffffff"
            href="https://play.google.com/music/m/Ikduxmrnugh255jld7l2zypzlhq?t=The_Overlap"
            target="_blank"
          >
            Google
          </LinkButton>

          <LinkButton
            bgColor="#EB9C4E"
            textColor="#ffffff"
            href="https://feeds.buzzsprout.com/255972.rss"
            target="_blank"
          >
            RSS
          </LinkButton>
        </ButtonContainer>
        <TempPlayer />
      </Wrapper>
    );
  }
}
