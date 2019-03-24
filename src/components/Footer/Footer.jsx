import React, { Component } from "react";
import { Link } from "gatsby";
import "./Footer.css";
import styled from "styled-components";
import ellePicture from "../../../static/images/elle.jpg";
import alexPicture from "../../../static/images/alex.jpg";

const FooterComponent = styled.footer`
  width: 100%;
  border-top: 1px solid #eee;
  background: rgba(250, 250, 250, 186);
  padding: 2rem;
  padding-bottom: 1rem;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  .header {
    flex: 1 100%;
    text-align: center;
    h4 {
      color: #555;
      font-size:1.3rem;
    }
  }
  .copyright {
    color: #aaa;
    flex: 1 100%;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-align: center;
    margin-top: 2rem;
  }
  @media all and (max-width: 600px) {
    padding: 1rem;
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
      <FooterComponent>
        <div className="header">
          <h4>Co-Hosts / Cousins</h4>
        </div>
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
              href="https://twitter.com/mistertrost"
            >
              @mistertrost
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

        <p className="copyright">Copyright ©2019 - The Overlap</p>
      </FooterComponent>
    );
  }
}

export default Footer;
