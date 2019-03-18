import React, { Component } from "react";
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
width:100%;
display:flex;
flex-flow: row nowrap
justify-content: center;
margin-bottom:1rem;
;
 .numberWrapper {
    display: flex;
    position: static;
		margin-right:1.5rem;
    .number h4 {
        font-size: 120px;
        font-weight: 700;
				letter-spacing:-6px;
				font-kerning: normal;
        margin: 0;
        padding: 0;
        line-height: 1;
				color: ${props => props.color};
				z-index: 3;
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
`;

const EpisodeInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  color: #555;
  .date {
    margin-right: 1.5rem;
  }
  .duration {
  }
`;

const PlayButton = styled.button`
  background: #eee;
  color: #555;
  border: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  padding: 0.75rem 2rem;
  position: relative;
  cursor: pointer;
  margin-right: 0.5rem;
  :hover {
    text-decoration: none;
    background: #e8e8e8;
  }
  :active {
    top: 2px;
  }
`;

const DownloadButton = styled.a`
  background: #eee;
  color: #555;
  border: none;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  position: relative;
  padding: 0.75rem 2rem;
  margin-right: 0.5rem;
  :hover {
    text-decoration: none;
    background: #e8e8e8;
    color: #555;
  }
  :active {
    top: 2px;
  }
`;

const ShowNotes = styled.div`
  font-size: 17px;
  line-height: 1.5;
`;

const TagRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 5px;
`;

const Tag = styled.button`
  font-size: 14px;
  color: #333;
  background-color: ${props =>
    props.selectedTag === props.tag ? "#f5c043cc" : "#ffffff"};
  margin-right: 8px;
  border-radius: 10px;
  padding: 2px 10px 4px 10px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #f5c04344;
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
                <div className="number">
                  <h4>{formatEpisodeNumber(selectedEpisode.episode)}</h4>
                </div>
              </div>
              <Title>{selectedEpisode.title}</Title>
            </Header>
            <EpisodeInfo>
              <PlayButton
                type="button"
                onClick={() => {
                  setPlayingIndex(selectedIndex);
                }}
              >
                Play Episode {formatEpisodeNumber(selectedEpisode.episode)}
              </PlayButton>
              <DownloadButton href={selectedEpisode.mp3Url}>
                Download Episode
              </DownloadButton>

              <span className="date">
                {moment(selectedEpisode.date).format("MMM Do YYYY")}
              </span>
              <span className="duration">
                {formatSeconds(selectedEpisode.trackLength)}
              </span>
            </EpisodeInfo>
            <TagRow>
              {selectedEpisode.tags.split(",").map(tag => (
                <Tag
                  selectedTag={selectedTag}
                  tag={tag.trim()}
                  type="button"
                  key={tag}
                  className="tag"
                  onClick={() => setSelectedTag(tag.trim())}
                >
                  {tag.trim()}
                </Tag>
              ))}
            </TagRow>
            <ShowNotes
              dangerouslySetInnerHTML={createMarkup(selectedEpisode.showNotes)}
            />
          </>
        )}
      </Episode>
    );
  }
}
