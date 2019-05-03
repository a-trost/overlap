import React from "react";
import Helmet from "react-helmet";
import { Link, useStaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import SEO from "../components/SEO/SEO";
import Player from "../containers/player";
import LinkButtons from "../components/LinkButtons";
import Footer from "../components/Footer/Footer";
import logo from "../../static/images/header-logo.svg";

const Header = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: 100%;
  grid-template-areas: "logo" "player" "buttons";
  grid-gap: 0.5rem;
`;

const Logo = ({ className }) => (
  <div className={className}>
    <img src={logo} alt="The Overlap" />
  </div>
);

const StyledLogo = styled(Logo)`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  grid-area: logo;
  width: 100%;
  margin-bottom: 2rem;
  img {
    width: 100%;
    height: auto;
    text-align: center;
  }
`;

const Outer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1000px;
  @media all and (max-width: 650px) {
    padding: 1rem;
  }
`;

// export default class MainLayout extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     document.addEventListener("scroll", this.trackScrolling);
//   }

//   trackScrolling = () => {
//     try {
//       const wrappedElement = document.getElementById("player");
//       const { scrolled } = this.state;
//       if (wrappedElement.getBoundingClientRect().top <= 0 !== scrolled) {
//         this.setState({ scrolled: !scrolled });
//       }
//     } catch {
//       console.log("Something went wrong");
//     }
//   };
export default ({ children, context }) => {
  const data = useStaticQuery(
    graphql`
      query {
        allFeedOverlapPodcast {
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
                image
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
      }
    `
  );
  if (context.episodeList.length === 0) {
    context.setInitialData(data);
  }
  return (
    <Outer>
      <Inner>
        <Helmet>
          <meta name="description" content={config.siteDescription} />
          <meta charset="UTF-8" />
          <meta httpEquiv="Content-Language" content="en" />
        </Helmet>
        <SEO />
        <Header>
          <StyledLogo />
          <Player allFeedOverlapPodcast={data.allFeedOverlapPodcast} />
          <LinkButtons />
        </Header>
        {children}
      </Inner>
      <Footer />
    </Outer>
  );
};
