/* eslint-disable react/jsx-filename-extension */
import React, { Component } from "react";
import { graphql } from "gatsby";
import EpisodeDetails from "../../components/EpisodeDetails";
import ContextConsumer from "../Context";

export default class Transcript extends Component {
  render() {
    const {
      markdownRemark,
      feedOverlapPodcast,
      allFeedOverlapPodcast
    } = this.props.data;

    // const { markdownRemark } = this.props.data;
    return (
      <ContextConsumer>
        {({ data, set }) => (
          <>
            <EpisodeDetails />
            <h2>{markdownRemark.frontmatter.episode}</h2>
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </>
        )}
      </ContextConsumer>
    );
  }
}

export const query = graphql`
  query TranscriptQuery($slug: String!, $url: String!) {
    markdownRemark(
      frontmatter: { slug: { eq: $slug }, type: { eq: "transcript" } }
    ) {
      frontmatter {
        slug
        episode
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
  }
`;
