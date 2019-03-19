import React, { Component } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  grid-area: buttons;
  margin: 0.75rem 0;
  @media all and (max-width: 700px) {
    flex-flow: row wrap;
  }
`;

const LinkButton = styled.a`
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 4px;
  z-index: 4;
  border: none;
  text-decoration: none;
  background-color: #bbb;
  color: #555;
  border: 1.5px solid #bbb;
  padding: 0.2rem 2.5rem;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0.25rem;
  transition: all ease 0.3s;
  position: relative;
  &:hover {
    background-color: ${props => props.bgColor || "#F0C043"};
    color: ${props => props.textColor || "white"};
    border: 1.5px solid ${props => props.bgColor || "#F0C043"};
    text-decoration: none;
  }
  &:active {
    top: 2px;
  }
  @media all and (max-width: 650px) {
    flex: 1 30%;
  }
`;

const hostList = [
  {
    text: "Spotify",
    bgColor: "#65D36E",
    textColor: "#ffffff",
    url:
      "https://open.spotify.com/show/51Z2Ak2g3SwTBsd4GfAaH2?si=XetqwmmtSc6qujZ8RPbo_A"
  },
  {
    text: "Stitcher",
    bgColor: "#333333",
    textColor: "#F0C043",
    url: "https://www.stitcher.com/s?fid=382097&refid=stpr"
  },
  {
    text: "Google",
    bgColor: "#D8503F",
    textColor: "#ffffff",
    url:
      "https://play.google.com/music/m/Ikduxmrnugh255jld7l2zypzlhq?t=The_Overlap"
  },
  {
    text: "TuneIn",
    bgColor: "#1D1F3A",
    textColor: "#64D4CB",
    url: "https://tunein.com/podcasts/Education-Podcasts/The-Overlap-p1210323/"
  },
  {
    text: "PocketCasts",
    bgColor: "#DF5F53",
    textColor: "#ffffff",
    url: "https://pca.st/wb8j"
  },
  {
    text: "RSS",
    bgColor: "#EB9C4E",
    textColor: "#ffffff",
    url: "https://feeds.buzzsprout.com/255972.rss"
  }
];

export default class index extends Component {
  render() {
    return (
      <ButtonContainer>
        {hostList.map(({ bgColor, textColor, url, text }) => {
          return (
            <LinkButton
              bgColor={bgColor}
              textColor={textColor}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              key={text}
            >
              {text}
            </LinkButton>
          );
        })}
      </ButtonContainer>
    );
  }
}
