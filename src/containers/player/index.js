/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { Consumer } from "../../store/createContext";
import Player from "../../components/Player";

const PlayerContainer = ({ allFeedOverlapPodcast }) => (
  <Consumer>
    {({
      episodeList,
      selectedIndex,
      selectedTag,
      setSelectedTag,
      setPlayingEpisode,
      playingEpisode
    }) => (
      <Player
        episodeList={episodeList}
        selectedIndex={selectedIndex}
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
