const path = require("path");

exports.createPages = async function({ graphql, actions: { createPage } }) {
  await graphql(`
    query EpisodeQuery {
      allFeedOverlapPodcast {
        edges {
          node {
            title
            isoDate
            content {
              encoded
            }
            itunes {
              duration
              episode
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
            html
            frontmatter {
              type
              episode
              slug
            }
          }
        }
      }
    }
  `).then(results => {
    const trackData = {};
    const noteData = [];

    results.data.allFeedOverlapPodcast.edges.forEach(({ node }) => {
      const episode = node.itunes.episode !== "" ? node.itunes.episode : "0";
      trackData[episode] = {
        url: node.enclosure.url
      };
    });

    results.data.allMarkdownRemark.edges.forEach(({ node }) => {
      noteData.push({
        slug: node.frontmatter.slug,
        type: node.frontmatter.type,
        episode: node.frontmatter.episode
      });
    });
    noteData.forEach(({ type, slug, episode }) => {
      const slugPath = `${slug}${type === "transcript" ? "/transcript" : ""}`;
      createPage({
        path: slugPath,
        component: path.resolve("./src/templates/shownotes.js"),
        context: {
          slug,
          type,
          ...trackData[episode]
        }
      });
    });
  });
};
