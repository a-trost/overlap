import { useStaticQuery, graphql } from "gatsby";

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
