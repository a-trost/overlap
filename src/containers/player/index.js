import React from "react";
import { Consumer } from "../../store/createContext";
import Player from "../../components/Player";

const PlayerContainer = ({ allFeedOverlapPodcast }) => (
  <Consumer>
    {({ playingEpisode, selectedTag, setSelectedTag, setPlayingEpisode }) => (
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
