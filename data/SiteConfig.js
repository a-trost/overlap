const config = {
  siteTitle: "The Overlap Podcast - Design and Web Development", // Site title.
  siteTitleShort: "The Overlap", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "The Overlap Podcast - Design and Web Dev", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://www.overlappodcast.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "The Overlap is a podcast that explores the intersection of Design and Front End Development. On the show we discuss all things design and development in a fun and easy-to-listen-to way. Some topics we cover are typography, React, productivity, focus, designing for print, freelancing tips, and much more.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-136824123-1", // GA tracking ID.
  disqusShortname: "", // Disqus shortname.
  postDefaultCategoryID: "Design", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Elle & Alex", // Username to display in the author segment.
  userEmail: "theoverlappodcast@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "@overlappod", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Philadelphia, PA", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/285/1t@adorab234le.io1.png", // User avatar to display in the author segment.
  userDescription:
    "Elle is a Graphic Designer in Philadelphia and Alex is a Web Developer in New Haven. They're cousins and like talking and teaching about design, development and everything inbetween.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Twitter",
      url: "https://twitter.com/overlappod",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "theoverlappodcast@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2019. Elle & Alex Trost", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
