import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import EpisodeListing from "../components/EpisodeListing/index";
import config from "../../data/SiteConfig";

export default class TagTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <Layout>
        <div className="tag-container">
          <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} />
          <EpisodeListing postEdges={postEdges} />
          <div className="container">
            <p className="body">
              <span className="highlight" />
            </p>
          </div>
        </div>
      </Layout>
    );
  }
}

// export const pageQuery = graphql`
//   query TagPages($tag: String) {
//     allMarkdownRemark(
//       limit: 1000
//       sort: { fields: [fields___date], order: DESC }
//       filter: { frontmatter: { tags: { in: [$tag] } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           fields {
//             slug
//             date
//           }
//           excerpt
//           timeToRead
//           frontmatter {
//             title
//             tags
//             # cover
//             date
//           }
//         }
//       }
//     }
//   }
// `;
