import React, { Component } from "react";
import { graphql, navigate } from "gatsby";
import styled from "styled-components";
import Helmet from "react-helmet";
import { Menu, Segment } from "semantic-ui-react";
import EpisodeDetails from "../containers/episodeDetails";
import EpisodeListing from "../containers/episodeListing";

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
  .content p {
    line-height: 1.5;
    overflow-wrap: break-word;
    word-wrap: break-word;
    em {
      color: #999;
      font-size: 14px;
      padding: 0 0.5rem;
    }
    strong {
    }
  }
`;

function doesTranscriptExist({ frontmatter: { episode } }, { edges }) {
  for (let edge in edges) {
    if (
      edges[edge].node.frontmatter.episode === episode &&
      edges[edge].node.frontmatter.type === "transcript"
    ) {
      return true;
    }
  }
  return false;
}

export default class ShowNotes extends Component {
  handleMenuClick = (type, markdownRemark) => {
    if (type === "transcript") {
      navigate(`${markdownRemark.frontmatter.slug}/transcript`);
    } else if (type === "showNotes") {
      navigate(`${markdownRemark.frontmatter.slug}`);
    }
  };

  render() {
    let markdownRemark,
      feedOverlapPodcast,
      allFeedOverlapPodcast,
      allMarkdownRemark;
    if (this.props.home) {
      ({
        markdownRemark,
        feedOverlapPodcast,
        allFeedOverlapPodcast,
        allMarkdownRemark
      } = this.props);
    } else {
      ({
        markdownRemark,
        feedOverlapPodcast,
        allFeedOverlapPodcast,
        allMarkdownRemark
      } = this.props.data);
    }
    return (
      <Body>
        <Helmet>
          <title>
            {feedOverlapPodcast.title} -{" "}
            {markdownRemark.frontmatter.type === "transcript"
              ? "Transcript"
              : "Show Notes"}{" "}
            - The Overlap Podcast
          </title>
        </Helmet>
        <Container>
          <EpisodeDetails
            markdownRemark={markdownRemark}
            feedOverlapPodcast={feedOverlapPodcast}
          />
          <Menu size="tiny" attached="top" tabular>
            <Menu.Item
              name="showNotes"
              active={markdownRemark.frontmatter.type === "notes"}
              onClick={() => this.handleMenuClick("showNotes", markdownRemark)}
            >
              Show Notes
            </Menu.Item>
            {doesTranscriptExist(markdownRemark, allMarkdownRemark) && (
              <Menu.Item
                name="transcript"
                active={markdownRemark.frontmatter.type === "transcript"}
                onClick={() =>
                  this.handleMenuClick("transcript", markdownRemark)
                }
              >
                Transcript
              </Menu.Item>
            )}
          </Menu>
          <Segment attached="bottom">
            <div
              className={
                markdownRemark.frontmatter.type === "transcript"
                  ? "transcript content"
                  : "notes content"
              }
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          </Segment>
        </Container>
        <EpisodeListing
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
            type
          }
        }
      }
    }
  }
`;
