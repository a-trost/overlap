import React from "react";
import styled from "styled-components";
import { Dropdown, Input, Label } from "semantic-ui-react";
import { navigate } from "gatsby";
import { formatEpisodeNumber, getColor } from "../../utils";

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
    padding-left: 0.5rem;
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

class PostListing extends React.Component {
  render() {
    const {
      // filterText,
      selectedTag,
      setSelectedTag,
      // handleFilterChange,
      tags,
      markdownRemark,
      feedOverlapPodcast,
      allFeedOverlapPodcast,
      allMarkdownRemark
    } = this.props;

    const episodeSlugs = {};
    allMarkdownRemark.edges.forEach(({ node }) => {
      episodeSlugs[node.frontmatter.episode] = node.frontmatter.slug;
    });

    // * Bring this back when you bring back the filter features
    // const filteredList = episodeList
    //   ? episodeList.filter(
    //       episode =>
    //         episode.title.toLowerCase().includes(filterText.toLowerCase()) &&
    //         episode.tags.toLowerCase().includes(selectedTag.toLowerCase())
    //     )
    //   : [];

    const handleNavigate = episodeNumber => {
      if (episodeNumber) {
        navigate(episodeSlugs[episodeNumber]);
      } else {
        navigate("000-show-preview");
      }
    };

    const Header = styled.div`
      background-color: #fff;
      border-bottom: 1px solid #eee;
      padding: 0.5rem 1rem;
      color: #555;
    `;

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
        {/* <FilterBox>
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
        </FilterBox> */}

        {/* Bring back filteredList for filtering */}
        <Header>
          <h5>Episodes</h5>
        </Header>
        {allFeedOverlapPodcast &&
          allFeedOverlapPodcast.edges.map(({ node }, index) => (
            <Episode
              color={getColor(node.itunes.episode)}
              key={node.title}
              selected={feedOverlapPodcast.title === node.title}
              onClick={() => handleNavigate(node.itunes.episode)}
            >
              <div className="numberWrapper">
                <span className="number">
                  {formatEpisodeNumber(node.itunes.episode)}
                </span>
              </div>
              <div className="detailWrapper">
                <h4>{node.title}</h4>
                <TagRow>
                  {node.itunes.keywords.split(",").map(tag => (
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
