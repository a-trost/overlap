/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import { graphql, navigate } from "gatsby";
import styled from "styled-components";
import { Menu, Segment } from "semantic-ui-react";
import EpisodeDetails from "../../containers/episodeDetails";
import { formatEpisodeNumber } from "../../utils";
import PostListing from "../../containers/postListing";

const Body = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 2fr 1fr;
  grid-template-areas: "episode-details episode-listing" "episode-details about";
  grid-gap: 1rem;
  align-items: flex-start;
  @media all and (max-width: 650px) {
    grid-template-areas: "episode-details" "episode-listing";
    grid-template-rows: auto auto;
    grid-template-columns: 100%;
  }
`;

const Container = styled.div`
  grid-area: episode-details;
  flex-flow: column nowrap;
`;

export default class ShowNotes extends Component {
  handleMenuClick = (e, data) => {
    e.preventDefault();
    if (data.name === "transcript") {
      navigate(`${this.props.data.markdownRemark.frontmatter.slug}/transcript`);
    } else if (data.name === "showNotes") {
      navigate(`${this.props.data.markdownRemark.frontmatter.slug}`);
    }
  };

  render() {
    const {
      markdownRemark,
      feedOverlapPodcast,
      allFeedOverlapPodcast,
      allMarkdownRemark
    } = this.props.data;
    console.log("Transcript Loaded", this);
    return (
      <Body>
        <Container>
          <EpisodeDetails
            markdownRemark={markdownRemark}
            feedOverlapPodcast={feedOverlapPodcast}
          />
          <Menu size="tiny" attached="top" tabular>
            <Menu.Item
              name="showNotes"
              active={markdownRemark.frontmatter.type === "notes"}
              onClick={this.handleMenuClick}
            >
              Show Notes
            </Menu.Item>
            <Menu.Item
              name="transcript"
              active={markdownRemark.frontmatter.type === "transcript"}
              onClick={this.handleMenuClick}
            >
              Transcript
            </Menu.Item>
          </Menu>
          <Segment attached="bottom">
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </Segment>
        </Container>
        <PostListing
          allMarkdownRemark={allMarkdownRemark}
          markdownRemark={markdownRemark}
          feedOverlapPodcast={feedOverlapPodcast}
          allFeedOverlapPodcast={allFeedOverlapPodcast}
        />
      </Body>
    );
  }
}

export const query = graphql`
  query ShowNotesQuery($slug: String!, $url: String!, $type: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug }, type: { eq: $type } }) {
      frontmatter {
        slug
        episode
        type
      }
      html
    }
    feedOverlapPodcast(enclosure: { url: { eq: $url } }) {
      title
      isoDate
      enclosure {
        url
      }
      itunes {
        keywords
        duration
        episode
      }
    }
    allFeedOverlapPodcast {
      edges {
        node {
          title
          isoDate
          content {
            encoded
          }
          itunes {
            episode
            summary
            duration
            keywords
          }
          enclosure {
            url
          }
        }
      }
    }
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            episode
            slug
          }
        }
      }
    }
  }
`;
