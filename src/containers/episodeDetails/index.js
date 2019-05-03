/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Consumer } from "../../store/createContext";
import EpisodeDetails from "../../components/EpisodeDetails";

const EpisodeDetailsContainer = ({ markdownRemark, feedOverlapPodcast }) => {
  console.log("Boo boo", markdownRemark, feedOverlapPodcast);
  return (
    <Consumer>
      {({ selectedTag, setSelectedTag, setPlayingEpisode }) => (
        <EpisodeDetails
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          setPlayingEpisode={setPlayingEpisode}
          markdownRemark={markdownRemark}
          feedOverlapPodcast={feedOverlapPodcast}
        />
      )}
    </Consumer>
  );
};

export default EpisodeDetailsContainer;
