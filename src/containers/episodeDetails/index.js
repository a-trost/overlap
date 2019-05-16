import React from "react";
import { Consumer } from "../../store/createContext";
import EpisodeDetails from "../../components/EpisodeDetails";

const EpisodeDetailsContainer = ({ markdownRemark, feedOverlapPodcast }) => {
  return (
    <Consumer>
      {(
        { selectedTag, setSelectedTag, setPlayingEpisode } = {
          selectedTag: "",
          setSelectedTag: "",
          setPlayingEpisode: ""
        }
      ) => (
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
