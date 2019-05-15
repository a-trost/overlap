import React, { useState, useEffect } from "react";
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

export default function Example({ children, context }) {
  // const [initialized, setInitialized] = useState(false);
  // const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   if (!initialized) {
  //     document.addEventListener("scroll", trackScrolling);
  //     setInitialized(true);
  //   }
  // });

  // const trackScrolling = () => {
  //   try {
  //     const wrappedElement = document.getElementById("player");
  //     if (wrappedElement.getBoundingClientRect().top <= 0 !== scrolled) {
  //       setScrolled(!scrolled);
  //       console.log(initialized);
  //     }
  //   } catch {
  //     console.log("Something went wrong");
  //   }
  // };

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
}
