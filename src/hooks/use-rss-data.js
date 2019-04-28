import { useStaticQuery, graphql } from "gatsby";

// eslint-disable-next-line import/prefer-default-export
export const useSiteData = () => {
  const { site } = useStaticQuery(
    graphql`
      query SiteRssData {
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
