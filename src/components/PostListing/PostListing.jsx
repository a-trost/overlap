import React from "react";
import styled from "styled-components";
import { formatEpisodeNumber } from "../../utils";
import { Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const EpisodeContainer = styled.div`
  border: 1px solid #eee;
  grid-area: "episode-listing";
`;

const FilterBox = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-bottom: 5px;
`;

const Filter = styled.input`
  background: white;
  border: 1px solid #aaa;
  font-size: 16px;
  padding: 0.25rem 0.5rem;
  width: 100%;
`;

// const Select = styled.select`
//   background: white;
//   border: 1px solid #aaa;
//   font-size: 16px;
//   padding: 0.25rem 0.5rem;
//   width: 100%;
//   height:30px;
//   border-radius:0;
//   color: #333;
// `;

const Episode = styled.div`
  border-bottom: 1px solid #eee;
  padding: 0.25rem;
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  position: relative;
  transition: background-color 0.4s;
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
    h4 {
      margin: 0;
      font-size: 16px;
    }
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin-top: 5px;
`;

const Tag = styled.div`
  font-size: 11px;
  color: #333;
  background-color: ${props =>
    props.selectedTag === props.tag ? "#f5c043cc" : "#f5c04344"};
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
      // console.log(data)
      setSelectedTag(data.value);
    };

    const tagOptions = tags.map(value=>
      { const viewValue = value[0].toUpperCase()+
        value.slice(1)
        return { key: value, text: viewValue, value }
  }
    )

    return (
      <EpisodeContainer>
        <FilterBox>
          <Filter
            type="text"
            placeholder="Filter"
            value={filterText}
            onChange={handleFilterChange}
          />
          <Dropdown value={selectedTag} onChange={handleSelectChange} clearable options={tagOptions} selection placeholder="Topics" />
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
                  {formatEpisodeNumber(episodeList.length - index)}
                </span>
              </div>
              <div className="detailWrapper">
                <h4>{episode.title}</h4>
                <TagRow>
                  {episode.tags.split(",").map(tag => (
                    <Tag
                      selectedTag={selectedTag}
                      tag={tag.trim()}
                      className="tag"
                    >
                      {tag.trim()}
                    </Tag>
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
