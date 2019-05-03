/* eslint-disable react/no-unused-state */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "./createContext";
import { randomDegree, getColor } from "../utils";

const defaultContextValue = {
  episodeList: [],
  tags: [],
  selectedIndex: 0,
  playingEpisode: 0,
  selectedTag: "",
  filterText: "",
  scrolled: false,
  set: () => {}
};

class AppProvider extends Component {
  constructor() {
    super();
    this.setData = this.setData.bind(this);
    this.getEpisodeList = this.getEpisodeList.bind(this);
    this.compileTags = this.compileTags.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.setPlayingEpisode = this.setPlayingEpisode.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.setInitialData = this.setInitialData.bind(this);
    this.state = {
      ...defaultContextValue,
      set: this.setData,
      getEpisodeList: this.getEpisodeList,
      compileTags: this.compileTags,
      handleFilterChange: this.handleFilterChange,
      setSelectedIndex: this.setSelectedIndex,
      setPlayingEpisode: this.setPlayingEpisode,
      setSelectedTag: this.setSelectedTag,
      setInitialData: this.setInitialData
    };
  }

  getEpisodeList(data) {
    const episodeList = [];
    const episodeEdges = data.allFeedOverlapPodcast.edges;
    episodeEdges.forEach(({ node }, index) => {
      this.compileTags(node.itunes.keywords.split(","));
      episodeList.push({
        title: node.title,
        episode: node.itunes.episode,
        mp3Url: node.enclosure.url,
        trackLength: node.itunes.duration,
        date: node.isoDate,
        tags: node.itunes.keywords,
        degree: randomDegree(),
        color: getColor(index, episodeEdges.length)
      });
    });
    this.setState({ episodeList });
  }

  setInitialData(initialData) {
    this.getEpisodeList(initialData);

    // this.setState(state => ({
    //   data: {
    //     ...state.data,
    //     ...newData
    //   }
    // }));
  }

  setData(newData) {
    this.setState(state => ({
      data: {
        ...state.data,
        ...newData
      }
    }));
  }

  setSelectedTag(selectedTag) {
    if (selectedTag !== this.state.selectedTag) {
      this.setState({ selectedTag });
    } else {
      this.setState({ selectedTag: "" });
    }
  }

  setSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }

  setPlayingEpisode(episode) {
    this.setState({ playingEpisode: episode });
  }

  handleFilterChange(event) {
    this.setState({ filterText: event.target.value });
  }

  compileTags(tagList) {
    tagList.forEach(tag => {
      const { tags } = this.state;
      const thisTag = tag.trim();
      if (tags.indexOf(thisTag) < 0) {
        tags.push(thisTag);
        this.setState({ tags });
      }
    });
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AppProvider;
