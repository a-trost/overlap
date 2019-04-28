import React, { Component } from "react";
import "./About.css";
import styled from "styled-components";

const StyledAbout = styled.section`
  grid-area: about;
  display:flex;
  flex-flow: column nowrap
`;

class About extends Component {
  render() {
    return (
      <StyledAbout>
        <h4>About</h4>
        <p>
          The Overlap is a podcast that explores the intersection of Design and
          Front End Development.
        </p>
        <p>
          On the show we discuss all things design and development in a fun and
          easy-to-listen-to way.
        </p>
        <p>
          Some topics we cover are typography, React, productivity, focus,
          designing for print, freelancing tips, and much more.
        </p>
      </StyledAbout>
    );
  }
}

export default About;
