import { useStaticQuery, graphql } from "gatsby";

export const useSiteData = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteData {
        site {
          siteMetadata {
            siteUrl
            rssMetadata {
              title
              description
              image_url
              copyright
            }
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
    `
  );
  return site.siteMetadata;
};
