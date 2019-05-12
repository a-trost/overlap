import React, { Component } from "react";
import { Button, Icon, Label } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import { formatSeconds, formatEpisodeNumber, getColor } from "../../utils";

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
      font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      font-size: 120px;
      font-weight: 700;
      letter-spacing: -6px;
      font-kerning: normal;
      margin: 0;
      padding: 0;
      line-height: 0.6;
      margin-bottom: 1.5rem;
      color: ${props => props.color};
      z-index: 3;
    }
  }
  @media all and (max-width: 650px) {
    flex-flow: column nowrap;
    .numberWrapper {
      h4 {
        font-size: 70px;
        letter-spacing: -2px;
      }
    }
  }
`;

const Title = styled.h2`
  font-size: 45px;
  line-break: normal;
  margin: 0;
  font-weight: 700;
  line-height: 1.05;
  color: #444;
  font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  letter-spacing: -1.5px;
  @media all and (max-width: 650px) {
    font-size: 30px;
  }
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  color: #666;
  .info {
    display: flex;
    padding: 0.5rem 1.5rem;
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

// const ShowNotes = styled.div`
//   font-size: 17px;
//   line-height: 1.5;
//   overflow-wrap: break-word;
//   word-wrap: break-word;
//   word-break: break-word;
//   @media all and (max-width: 650px) {
//     font-size: 16px;
//   }
// `;

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
    margin-bottom: 0.25rem;
  }
`;

// const createMarkup = html => {
//   return { __html: html };
// };

export default class EpisodeDetails extends Component {
  render() {
    const {
      setPlayingEpisode,
      setSelectedTag,
      selectedTag,
      feedOverlapPodcast,
      markdownRemark
    } = this.props;

    return (
      <Episode>
        <Header color={getColor(feedOverlapPodcast.itunes.episode)}>
          <div className="numberWrapper">
            <h4>{formatEpisodeNumber(feedOverlapPodcast.itunes.episode)}</h4>
          </div>
          <Title>{feedOverlapPodcast.title}</Title>
        </Header>
        <EpisodeInfo>
          <Button
            className="button"
            size="small"
            onClick={() => {
              setPlayingEpisode(feedOverlapPodcast.itunes.episode);
            }}
            icon
            labelPosition="left"
            color="yellow"
          >
            <Icon name="play" />
            Play Episode{" "}
            {formatEpisodeNumber(feedOverlapPodcast.itunes.episode)}
          </Button>

          <Button
            className="button"
            size="small"
            href={feedOverlapPodcast.enclosure.url}
            icon
            labelPosition="left"
          >
            <Icon name="download" />
            Download Episode
          </Button>
          <div className="info">
            <span className="title">Published</span>
            <span>
              {moment(feedOverlapPodcast.isoDate).format("MMM Do YYYY")}
            </span>
          </div>
          <div className="info">
            <span className="title">Length</span>
            <span>{formatSeconds(feedOverlapPodcast.itunes.duration)}</span>
          </div>
        </EpisodeInfo>
        <TagRow>
          <span>Episode Tags:</span>
          {feedOverlapPodcast.itunes.keywords.split(",").map(tag => (
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
        </TagRow>
      </Episode>
    );
  }
}
