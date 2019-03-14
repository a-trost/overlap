import React, { Component } from "react";
import styled from "styled-components";
import logo from "../../../static/images/overlapLogoNoTagline.svg";
import LinkButtons from "../../components/LinkButtons";

const countDownDate = new Date("Mar 19, 2019 12:00:00").getTime();

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  h2 {
    font-size: 2.1vw;
    margin-top: 2rem;
    color: #19232a;
    text-align: center;
    letter-spacing: 1.5px;
    line-height: 1.3;
    font-weight: 400;
  }
  .playerWrapper {
    padding: 1rem;
    margin: 1rem;
    width: 75%;
  }
  h3 {
    text-align: center;
    margin-bottom: 0rem;
    margin-top: 2rem;
    font-size: 26px;
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
        <h2 className="description">
          A Design and Web Development Podcast <br />
          Launching March 19th
        </h2>
        <CounterWrapper>
          <Column number={this.state.days} label="Days" color="#1DA59B" />
          <Colon />
          <Column number={this.state.hours} label="Hours" color="#D32B1A" />
          <Colon />
          <Column number={this.state.minutes} label="Minutes" color="#FFB000" />
          <Colon />
          <Column number={this.state.seconds} label="Seconds" color="#B12E1B" />
        </CounterWrapper>
        <h3>Subscribe wherever you get your podcasts!</h3>
        <LinkButtons />
        <TempPlayer />
      </Wrapper>
    );
  }
}
