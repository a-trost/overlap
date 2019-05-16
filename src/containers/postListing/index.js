import React from "react";
import { Consumer } from "../../store/createContext";
import PostListing from "../../components/PostListing/PostListing";

const PostListingContainer = ({
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
      <PostListing
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

export default PostListingContainer;
