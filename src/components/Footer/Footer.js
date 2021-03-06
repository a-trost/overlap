import React, { Component } from "react";
// import { Link } from "gatsby";
import "./Footer.css";
import { Button, Icon } from "semantic-ui-react";

import styled from "styled-components";
import ellePicture from "./elle.jpg";
import alexPicture from "./alex.jpg";
// import EmailModal from "../EmailModal";
// import SponsorModal from "../SponsorModal";

const FooterComponent = styled.footer`
  width: 100%;
  border-top: 1px solid #eee;
  background: rgba(250, 250, 250, 186);
  padding: 2rem;
  padding-bottom: 1rem;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  a {
    color: #d73721;
  }
  .header {
    flex: 1 100%;
    text-align: center;
    h4 {
      color: #555;
      font-size: 22px;
    }
  }
  .profiles {
    display: flex;
    flex-flow: row nowrap;
    margin-bottom: 1rem;
  }
  .links {
    display: flex;
    flex-flow: row wrap;
  }
  .copyright {
    color: #777;
    flex: 1 100%;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-align: center;
    margin-top: 2rem;
  }
  @media all and (max-width: 600px) {
    padding: 1rem;
    .footerButton {
      width: 100%;
      margin-bottom: 0.5rem;
      padding: 1rem;
    }
  }
`;

const Profile = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 1rem 3rem;
  @media all and (max-width: 600px) {
    padding: 1rem 0.5rem;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 125px;
  height: 125px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.2);
  margin-right: 1rem;

  @media all and (max-width: 600px) {
    width: 100px;
    height: 100px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;

  justify-content: center;

  .name {
    font-size: 22px;
    margin: 0;
    color: #626262;
    line-height: 1.2;
  }
  .title {
    font-size: 16px;
    color: #9a9898;
    font-weight: 400;
    margin: 0;
    margin-bottom: 6px;
    line-height: 1;
  }
`;

class Footer extends Component {
  render() {
    return (
      <>
        <FooterComponent>
          <div className="header">
            <h4>Co-Hosts / Cousins</h4>
          </div>
          <div className="profiles">
            <Profile>
              <Avatar src={ellePicture} alt="Elle Trost Portrait" />
              <TextWrapper>
                <h4 className="name">Elle Trost</h4>
                <h5 className="title">Graphic Designer</h5>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/lovelettersco"
                >
                  @lovelettersco
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.trostliketoast.com/"
                >
                  Website
                </a>
              </TextWrapper>
            </Profile>
            <Profile>
              <Avatar src={alexPicture} alt="Alex Trost Portrait" />
              <TextWrapper>
                <h4 className="name">Alex Trost</h4>
                <h5 className="title">Web Developer</h5>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://twitter.com/TrostCodes"
                >
                  @TrostCodes
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.atrost.com"
                >
                  Website
                </a>
              </TextWrapper>
            </Profile>
          </div>
          <div className="links">
            <Button
              as="a"
              href="https://twitter.com/overlappod"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
              size="tiny"
              basic
              color="red"
            >
              <Icon name="twitter" />
              Twitter
            </Button>
            <Button
              as="a"
              href="https://instagram.com/overlappodcast"
              target="_blank"
              rel="noopener noreferrer"
              className="footerButton"
              size="tiny"
              basic
              color="red"
            >
              <Icon name="instagram" />
              Instagram
            </Button>
            {/* <EmailModal />
            <SponsorModal /> */}
          </div>
          <p className="copyright">Copyright ©2019 - Elle Trost & Alex Trost</p>
        </FooterComponent>
      </>
    );
  }
}

export default Footer;
