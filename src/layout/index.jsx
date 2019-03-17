import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import "./index.css";

const Outer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1100px;
`;
export default class MainLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Outer>
        <Inner>
          <Helmet>
            <meta name="description" content={config.siteDescription} />
          </Helmet>
          {children}
        </Inner>
      </Outer>
    );
  }
}
