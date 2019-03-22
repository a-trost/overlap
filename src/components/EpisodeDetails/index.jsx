import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { formatSeconds, formatEpisodeNumber } from "../../utils";

const Episode = styled.article`
  grid-area: episode-details;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-bottom: 1.5rem;
  .numberWrapper {
    display: flex;
    position: static;
    margin-right: 1.5rem;
    h4 {
      font-size: 120px;
      font-weight: 700;
      letter-spacing: -6px;
      font-kerning: normal;
      margin: 0;
      padding: 0;
      line-height: .6;
      margin-bottom:1.5rem;
      color: ${props => props.color};
      z-index: 3;
    }
  }
  @media all and (max-width: 650px) {
    flex-flow: column nowrap;
    .numberWrapper {
      .number h4 {
        font-size: 70px;
        letter-spacing: -2px;
      }
    }
  }
`;

const Title = styled.h2`
  font-size: 50px;
  line-break: normal;
  margin: 0;
  font-weight: 700;
  line-height: 1.05;
  color: #444;
  letter-spacing: -2px;
  @media all and (max-width: 650px) {
    font-size: 40px;
  }
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  color: #666;
  .info {
    display: flex;
    padding: 0.5rem 2rem;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 13px;
    line-height: 1.3;
  }
  .info .title {
    font-weight: 700;
    color: #333;
  }
  @media all and (max-width: 650px) {
    flex-flow: column nowrap;
    align-items: flex-start;
    width: 100%;
    .ui.small.button.labeled {
      width: 100%;
      margin-bottom: 5px;
    }
    .info {
      padding: 0.5rem 0;
      align-items: flex-start;
      text-align: left;
    }
  }
`;

const ShowNotes = styled.div`
  font-size: 17px;
  line-height: 1.5;
  @media all and (max-width: 650px) {
    font-size: 16px;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 1rem 0;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #ddd;
  padding: 8px 0;
  span {
    font-size: 12px;
    text-transform: uppercase;
    color: #777;
    font-weight: 700;
    margin-right: 8px;
  }
  .episodeTag.label.ui {
  cursor: pointer;
    margin-bottom:.25rem;
  }
`;

const createMarkup = html => {
  return { __html: html };
};

export default class EpisodeDetails extends Component {
  render() {
    const {
      episodeList,
      selectedIndex,
      setPlayingIndex,
      setSelectedTag,
      selectedTag
    } = this.props;
    const selectedEpisode = episodeList[selectedIndex];
    return (
      <Episode>
        {selectedEpisode && (
          <>
            <Header
              degree={selectedEpisode.degree}
              color={selectedEpisode.color}
            >
              <div className="numberWrapper">
                <h4>{formatEpisodeNumber(selectedEpisode.episode)}</h4>
              </div>
              <Title>{selectedEpisode.title}</Title>
            </Header>
            <EpisodeInfo>
              <Button
                className="button"
                size="small"
                onClick={() => {
                  setPlayingIndex(selectedIndex);
                }}
                icon
                labelPosition="left"
              >
                <Icon name="play" />
                Play Episode {formatEpisodeNumber(selectedEpisode.episode)}
              </Button>

              <Button
                className="button"
                size="small"
                href={selectedEpisode.mp3Url}
                icon
                labelPosition="left"
              >
                <Icon name="download" />
                Download Episode
              </Button>
              <div className="info">
                <span className="title">Published</span>
                <span>
                  {moment(selectedEpisode.date).format("MMM Do YYYY")}
                </span>
              </div>
              <div className="info">
                <span className="title">Length</span>
                <span>{formatSeconds(selectedEpisode.trackLength)}</span>
              </div>
            </EpisodeInfo>
            <Label>
              <span>Episode Tags:</span>
              {selectedEpisode.tags.split(",").map(tag => (
                <Label
                  as="button"
                  onClick={() => setSelectedTag(tag.trim())}
                  key={tag}
                  
                  color={selectedTag === tag.trim() ? "yellow" : ""}
                  className="episodeTag"
                >
                  {tag.trim()}
                </Label>
              ))}
            </Label>
            <ShowNotes
              dangerouslySetInnerHTML={createMarkup(selectedEpisode.showNotes)}
            />
          </>
        )}
      </Episode>
    );
  }
}
