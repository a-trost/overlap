import React from "react";
import { Consumer } from "../../store/createContext";
import EpisodeListing from "../../components/EpisodeListing";

const EpisodeListingContainer = ({
  feedOverlapPodcast,
  allFeedOverlapPodcast,
  allMarkdownRemark
}) => (
  <Consumer>
    {(
      {
        selectedTag,
        setSelectedTag,
        filterText,
        handleFilterChange,
        tags,
        compileTags
      } = {
        selectedTag: "",
        setSelectedTag: () => {},
        filterText: "",
        handleFilterChange: () => {},
        tags: [],
        compileTags: () => {}
      }
    ) => (
      <EpisodeListing
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        filterText={filterText}
        handleFilterChange={handleFilterChange}
        tags={tags}
        compileTags={compileTags}
        feedOverlapPodcast={feedOverlapPodcast}
        allFeedOverlapPodcast={allFeedOverlapPodcast}
        allMarkdownRemark={allMarkdownRemark}
      />
    )}
  </Consumer>
);

export default EpisodeListingContainer;
