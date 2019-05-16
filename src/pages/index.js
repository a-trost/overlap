import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Player from "../components/Player";
import EpisodeDetails from "../components/EpisodeDetails";
import LinkButtons from "../components/LinkButtons";
import Footer from "../components/Footer/Footer";
import logo from "../../static/images/header-logo.svg";
import ShowNotes from "../templates/shownotes";

const getNewestEpisode = ({ edges }) => {
  return Math.max(...edges.map(edge => Number(edge.node.itunes.episode)));
};

class Index extends React.Component {
  render() {
    const { allFeedOverlapPodcast, allMarkdownRemark } = this.props.data;
    // const {
    //   episodeList,
    //   selectedIndex,
    //   selectedTag,
    //   filterText,
    //   tags,
    // } = this.state;
    return (
      <ShowNotes
        home
        markdownRemark={allMarkdownRemark.edges[0].node}
        feedOverlapPodcast={allFeedOverlapPodcast.edges[0].node}
        allFeedOverlapPodcast={allFeedOverlapPodcast}
        allMarkdownRemark={allMarkdownRemark}
      />
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    allFeedOverlapPodcast(sort: { order: DESC, fields: [itunes___episode] }) {
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___episode] }) {
      edges {
        node {
          html
          frontmatter {
            episode
            slug
            type
          }
        }
      }
    }
  }
`;
