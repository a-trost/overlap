import React from "react";
import { graphql } from "gatsby";
import ShowNotes from "../templates/shownotes";

const getNewestEpisode = ({ edges }) => {
  return Math.max(...edges.map(edge => Number(edge.node.itunes.episode)));
};

class Index extends React.Component {
  render() {
    const { allFeedOverlapPodcast, allMarkdownRemark } = this.props.data;

    const sortedPodcast = allFeedOverlapPodcast.edges.sort(
      (a, b) => Number(b.node.itunes.episode) - Number(a.node.itunes.episode)
    );
    const sortedMarkdown = allMarkdownRemark.edges.sort(
      (a, b) =>
        Number(b.node.frontmatter.episode) - Number(a.node.frontmatter.episode)
    );
    return (
      <ShowNotes
        home
        markdownRemark={sortedMarkdown[0].node}
        feedOverlapPodcast={sortedPodcast[0].node}
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
