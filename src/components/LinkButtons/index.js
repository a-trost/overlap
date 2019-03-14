import React, { Component } from "react";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
`;

const LinkButton = styled.a`
  border: none;
  text-decoration: none;
  background-color: ${props => props.bgColor || "#F0C043"};
  color: ${props => props.textColor || "white"};
  padding: 0.5rem 2.5rem;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin: 0.25rem;
  border: 1.5px solid ${props => props.bgColor || "#F0C043"};
  transition: all ease 0.3s;
  position: relative;
  &:hover {
    color: ${props => props.bgColor || "#F0C043"};
    background-color: ${props => props.textColor || "white"};
    border-color: ${props => props.bgColor || "#F0C043"};
    text-decoration: none;
  }
  &:active {
    top: 2px;
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
        {hostList.map(host => {
          return (
            <LinkButton
              bgColor={host.bgColor}
              textColor={host.textColor}
              href={host.url}
              target="_blank"
            >
              {host.text}
            </LinkButton>
          );
        })}
      </ButtonContainer>
    );
  }
}
