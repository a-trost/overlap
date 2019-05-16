import React from "react";
import Provider, { Consumer } from "../../store/createContext";
import Player from "../../components/Player";

const PlayerContainer = ({ allFeedOverlapPodcast, pageContext }) => (
  <Consumer>
    {(
      { playingEpisode, selectedTag, setSelectedTag, setPlayingEpisode } = {
        playingEpisode: 5,
        selectedTag: "",
        setSelectedTag: "",
        setPlayingEpisode: ""
      }
    ) => (
      <Player
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        playingEpisode={playingEpisode}
        setPlayingEpisode={setPlayingEpisode}
        allFeedOverlapPodcast={allFeedOverlapPodcast}
      />
    )}
  </Consumer>
);

export default PlayerContainer;
