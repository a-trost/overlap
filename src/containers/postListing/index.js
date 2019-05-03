/* eslint-disable react/jsx-filename-extension */
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
    {({
      episodeList,
      selectedIndex,
      selectedTag,
      setSelectedTag,
      setSelectedIndex
    }) => (
      <PostListing
        episodeList={episodeList}
        selectedIndex={selectedIndex}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        setSelectedIndex={setSelectedIndex}
        markdownRemark={markdownRemark}
        feedOverlapPodcast={feedOverlapPodcast}
        allFeedOverlapPodcast={allFeedOverlapPodcast}
        allMarkdownRemark={allMarkdownRemark}
      />
    )}
  </Consumer>
);

export default PostListingContainer;
