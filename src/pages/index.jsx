import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Countdown from "../components/Countdown";
import Player from "../components/Player";
import EpisodeDetails from "../components/EpisodeDetails";
import LinkButtons from "../components/LinkButtons";
import Footer from "../components/Footer/Footer";
import logo from "../../static/images/header-logo.svg";
import { randomDegree, getColor } from "../utils";

const Header = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 100%;
  grid-template-areas: "logo" "player" "buttons";
  grid-gap: 0.5rem;
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "episode-details episode-listing";
  grid-gap: 1rem;
  align-items:flex-start;
  @media all and (max-width:650px){
  grid-template-areas: "episode-details" "episode-listing";
  grid-template-rows: auto auto;
  grid-template-columns: 100%;
  }
`;

const Logo = ({ className }) => (
  <div className={className}>
    <img src={logo} alt="The Overlap" />
  </div>
);

const StyledLogo = styled(Logo)`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-area: logo;
  width: 100%;
  margin-bottom:2rem;
  img {
    width: 100%;
    height: auto;
    text-align: center;
  }
`;

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodeList: [],
      tags: [],
      selectedIndex: 0,
      playingIndex: 0,
      selectedTag: "",
      filterText: "",
      scrolled: false
    };
    this.setSelectedIndex = this.setSelectedIndex.bind(this);
    this.setPlayingIndex = this.setPlayingIndex.bind(this);
    this.setSelectedTag = this.setSelectedTag.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentDidMount() {
    this.getEpisodeList();
    document.addEventListener("scroll", this.trackScrolling);
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById("player");
    const { scrolled } = this.state;
    if (wrappedElement.getBoundingClientRect().top <= 0 !== scrolled) {
      this.setState({ scrolled: !scrolled });
    }
  };

  setSelectedIndex(index) {
    this.setState({ selectedIndex: index });
  }

  setPlayingIndex(index) {
    this.setState({ playingIndex: index });
  }

  setSelectedTag(selectedTag) {
    if (selectedTag !== this.state.selectedTag) {
      this.setState({ selectedTag });
    } else {
      this.setState({ selectedTag: "" });
    }
  }

  getEpisodeList() {
    const episodeList = [];
    const { data } = this.props;
    const episodeEdges = data.allFeedOverlapPodcast.edges;
    episodeEdges.forEach(({ node }, index) => {
      this.compileTags(node.itunes.keywords.split(","));
      episodeList.push({
        title: node.title,
        season: node.itunes.season,
        episode: node.itunes.episode,
        // episode: episodeEdges.length - index,
        summary: node.itunes.summary,
        showNotes: node.content.encoded,
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

  handleFilterChange(event) {
    this.setState({ filterText: event.target.value });
  }

  render() {
    const {
      episodeList,
      selectedIndex,
      playingIndex,
      selectedTag,
      filterText,
      tags,
      scrolled
    } = this.state;
    return (
      <>
        <Layout>
          <Helmet title={config.siteTitle} />
          <SEO />
          <Header>
            <StyledLogo />
            {episodeList.length > 0 && (
              <Player
                scrolled={scrolled}
                episodeList={episodeList}
                playingIndex={playingIndex}
              />
            )}
            <LinkButtons />
          </Header>
          <Body>
            <EpisodeDetails
              episodeList={episodeList}
              selectedIndex={selectedIndex}
              setPlayingIndex={this.setPlayingIndex}
              setSelectedTag={this.setSelectedTag}
              selectedTag={selectedTag}
            />
            <PostListing
              tags={tags}
              setSelectedIndex={this.setSelectedIndex}
              setSelectedTag={this.setSelectedTag}
              selectedTag={selectedTag}
              selectedIndex={selectedIndex}
              episodeList={episodeList}
              filterText={filterText}
              handleFilterChange={this.handleFilterChange}
            />
          </Body>
          {/* <Countdown /> */}
        </Layout>
        <Footer />
      </>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allFeedOverlapPodcast {
      edges {
        node {
          title
          isoDate
          content {
            encoded
          }
          itunes {
            summary
            duration
            image
            episode
            season
            keywords
          }
          enclosure {
            url
            length
            type
          }
        }
      }
    }
  }
`;
