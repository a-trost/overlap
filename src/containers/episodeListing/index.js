import React from "react";
import { Consumer } from "../../store/createContext";
import EpisodeListing from "../../components/EpisodeListing";

const EpisodeListingContainer = ({
  markdownRemark,
  feedOverlapPodcast,
  allFeedOverlapPodcast,
  allMarkdownRemark
}) => (
  <Consumer>
    {(
      { selectedTag, setSelectedTag } = {
        selectedTag: "",
        setSelectedTag: ""
      }
    ) => (
      <EpisodeListing
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        markdownRemark={markdownRemark}
        feedOverlapPodcast={feedOverlapPodcast}
        allFeedOverlapPodcast={allFeedOverlapPodcast}
        allMarkdownRemark={allMarkdownRemark}
      />
    )}
  </Consumer>
);

export default EpisodeListingContainer;
