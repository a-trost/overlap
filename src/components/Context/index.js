/* eslint-disable react/jsx-filename-extension */
import React from "react";
import { getColor, randomDegree } from "../../utils";

const defaultContextValue = {
  data: {
    episodeList: [],
    tags: [],
    selectedIndex: 0,
    playingIndex: 0,
    selectedTag: "",
    filterText: "",
    scrolled: false
  },
  set: () => {}
};

const { Provider, Consumer } = React.createContext(defaultContextValue);

class ContextProviderComponent extends React.Component {
  constructor() {
    super();
    this.setData = this.setData.bind(this);
    // this.getEpisodeList = this.getEpisodeList.bind(this);
    this.compileTags = this.compileTags.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.setPlayingIndex = this.setPlayingIndex.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.state = {
      ...defaultContextValue,
      set: this.setData,
      getEpisodeList: this.getEpisodeList,
      compileTags: this.compileTags,
      handleFilterChange: this.handleFilterChange,
      setSelectedIndex: this.setSelectedIndex,
      setPlayingIndex: this.setPlayingIndex,
      setSelectedTag: this.setSelectedTag
    };
  }

  componentDidMount() {
    this.getEpisodeList();
  }

  getEpisodeList() {
    const episodeList = [];
    // const { data } = this.props;
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

  setPlayingIndex(index) {
    this.setState({ playingIndex: index });
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

export { Consumer as default, ContextProviderComponent };
