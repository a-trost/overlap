import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import styled from "styled-components";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import Player from "../components/Player";
import EpisodeDetails from "../components/EpisodeDetails";
import LinkButtons from "../components/LinkButtons";
import Footer from "../components/Footer/Footer";
import logo from "../../static/images/header-logo.svg";



class Index extends React.Component {
  render() {
    // const {
    //   episodeList,
    //   selectedIndex,
    //   selectedTag,
    //   filterText,
    //   tags,
    // } = this.state;

    return (
      <>
        <Layout>
       
            {/* <EpisodeDetails
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
            /> */}
       
  
        </Layout>
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
