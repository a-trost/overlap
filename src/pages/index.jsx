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
import Footer from "../components/Footer/Footer";
import logo from "../../static/images/overlapLogoNoTagline.svg";

const LogoHeader = styled.div`
  margin: 1rem;
`;

const Logo = styled.img`
  width: 100%;
  max-width: 90%;
`;

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <>
        <Layout>
          <div className="index-container">
            <Helmet title={config.siteTitle} />
            <SEO />
            {/* <LogoHeader>
            <Logo src={logo} alt="Logo" width="500px" />
          </LogoHeader>
          <Player track={this.props.data.allFeedOverlapPodcast.edges[0].node} /> */}
            {/* <PostListing postEdges={this.props.data.allFeedOverlapPodcast.edges} />  */}
            <Countdown />
          </div>
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
          link
          content {
            encoded
          }
          enclosure {
            url
            length
            type
          }
        }
      }
    }
    feedOverlapPodcast {
      title
      link
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
