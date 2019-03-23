import React from "react";
import styled from "styled-components";
import { Dropdown, Input, Label } from "semantic-ui-react";
import { formatEpisodeNumber } from "../../utils";

const EpisodeContainer = styled.div`
  border: 1px solid #eee;
  grid-area: "episode-listing";
`;

const FilterBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const Episode = styled.div`
  border-bottom: 1px solid #eee;
  border-left: ${props =>
    props.selected ? `4px solid ${props.color}` : "4px solid transparent"};
  padding: 1rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  transition: background-color 0.4s;
  background-color: white;
  :hover {
    background-color: #eee;
  }
  .numberWrapper {
    display: flex;
    padding: 0;
    justify-content: center;
    align-items: center;
    padding: 1rem 0.5rem;
    .number {
      font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
      margin-right: 8px;
      color: ${props => (props.selected ? props.color : "#444")};
      font-size: 30px;
      font-weight: 700;
      margin: 0;
      padding: 0;
      line-height: 1;
      z-index: 2;
    }
  }
  .detailWrapper {
    width: 100%;
    h4 {
      margin: 0;
      font-family: Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
        sans-serif;
        font-weight: 700;
      font-size: 16px;
      color: #555;
    }
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 5px;
  .episodeTag.ui.tiny.label {
    background-color: transparent;
    color: #888;
  }
`;

const Tag = styled.div`
  font-size: 11px;
  color: #333;
  background-color: ${props =>
    props.selectedTag === props.tag ? "#f5c043cc" : "transparent"};
  margin-right: 3px;
  border-radius: 10px;
  padding: 1px 5px;
`;

class PostListing extends React.Component {
  render() {
    const {
      episodeList,
      setSelectedIndex,
      selectedIndex,
      filterText,
      selectedTag,
      setSelectedTag,
      handleFilterChange,
      tags
    } = this.props;

    const filteredList = episodeList
      ? episodeList.filter(episode => {
          return (
            episode.title.toLowerCase().includes(filterText.toLowerCase()) &&
            episode.tags.toLowerCase().includes(selectedTag.toLowerCase())
          );
        })
      : [];

    const setSelectedEpisode = index => {
      setSelectedIndex(index);
    };

    const handleSelectChange = (event, data) => {
      setSelectedTag(data.value);
    };

    const tagOptions = tags
      ? tags.map(value => {
          if (value) {
            const viewValue = value[0].toUpperCase() + value.slice(1);
            return { key: value, text: viewValue, value };
          }
        })
      : [];
    return (
      <EpisodeContainer>
        <FilterBox>
          <Input
            onChange={handleFilterChange}
            value={filterText}
            icon="search"
            placeholder="Filter..."
          />

          <Dropdown
            value={selectedTag}
            onChange={handleSelectChange}
            clearable
            options={tagOptions}
            selection
            placeholder="Topics"
          />
        </FilterBox>

        {filteredList &&
          filteredList.map((episode, index) => (
            <Episode
              degree={episode.degree}
              color={episode.color}
              key={episode.title}
              selected={index === selectedIndex}
              onClick={() => {
                setSelectedEpisode(index);
              }}
            >
              <div className="numberWrapper">
                <span className="number">
                  {formatEpisodeNumber(episode.episode)}
                </span>
              </div>
              <div className="detailWrapper">
                <h4>{episode.title}</h4>
                <TagRow>
                  {episode.tags.split(",").map(tag => (
                    <Label
                      basic={!(selectedTag === tag.trim())}
                      circular
                      size="tiny"
                      color={selectedTag === tag.trim() ? "yellow" : ""}
                      key={tag}
                      content={tag.trim()}
                      className="episodeTag"
                    />
                  ))}
                </TagRow>
              </div>
            </Episode>
          ))}
      </EpisodeContainer>
    );
  }
}

export default PostListing;
