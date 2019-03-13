import React, { Component } from "react";
import Helmet from "react-helmet";
import urljoin from "url-join";
import config from "../../../data/SiteConfig";
import favicon16 from "../../../static/images/favicon@16.png";
import favicon32 from "../../../static/images/favicon@32.png";
import favicon64 from "../../../static/images/favicon@64.png";
import overlapLogo from "../../../static/logos/Logo-2048.png";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let image= overlapLogo;
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;
      postURL = urljoin(config.siteUrl, config.pathPrefix, postPath);
    } else {
      title = config.siteTitle;
      description = config.siteDescription;
    }

    image = urljoin(config.siteUrl, config.pathPrefix, image);
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
      }
    ];
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": postURL,
                name: title,
                image
              }
            }
          ]
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: blogURL,
          name: title,
          alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image
          },
          description
        }
      );
    }
    return (
      <Helmet
      link={[
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: `${favicon16}`
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: `${favicon32}`
        },
        { rel: "shortcut icon", type: "image/png", href: `${favicon64}` }
      ]}
      >
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

<title>The Overlap Podcast - Design and Web Dev</title>
<meta name="title" content="The Overlap Podcast - Design and Web Dev">
<meta name="description" content="The Overlap is a podcast that explores the intersection of Design and Front End Development. On the show we discuss all things design and development in a fun and easy-to-listen-to way. Some topics we cover are typography, React, productivity, focus, designing for print, freelancing tips, and much more. ">

<meta property="og:type" content="website">
<meta property="og:url" content="https://www.overlappodcast.com/">
<meta property="og:title" content="The Overlap Podcast - Design and Web Dev">
<meta property="og:description" content="The Overlap is a podcast that explores the intersection of Design and Front End Development. On the show we discuss all things design and development in a fun and easy-to-listen-to way. Some topics we cover are typography, React, productivity, focus, designing for print, freelancing tips, and much more. ">
<meta property="og:image" content={overlapLogo}>

<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://www.overlappodcast.com/">
<meta property="twitter:title" content="The Overlap Podcast - Design and Web Dev">
<meta property="twitter:description" content="The Overlap is a podcast that explores the intersection of Design and Front End Development. On the show we discuss all things design and development in a fun and easy-to-listen-to way. Some topics we cover are typography, React, productivity, focus, designing for print, freelancing tips, and much more. ">
<meta property="twitter:image" content={overlapLogo}></meta>
      </Helmet>
    );
  }
}

export default SEO;
