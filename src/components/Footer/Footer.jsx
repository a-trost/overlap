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
  .copyright {
    color: #aaa;
    flex: 1 100%;
    font-size: 14px;
    letter-spacing: 0.3px;
    text-align: center;
    margin-top:2rem;
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
        <Profile>
          <Avatar src={ellePicture} />
          <TextWrapper>
            <h4 className="name">Elle Trost</h4>
            <h5 className="title">Graphic Designer</h5>
            <a href="https://twitter.com/lovelettersco">@lovelettersco</a>
            <a href="https://www.loveletterspaper.com/">Website</a>
          </TextWrapper>
        </Profile>

        <Profile>
          <Avatar src={alexPicture} />
          <TextWrapper>
            <h4 className="name">Alex Trost</h4>
            <h5 className="title">Web Developer</h5>
            <a href="https://twitter.com/mistertrost">@mistertrost</a>
            <a href="https://www.atrost.com">Website</a>
          </TextWrapper>
        </Profile>

        <p className="copyright">Copyright ©2019 - The Overlap</p>
      </FooterComponent>
    );
  }
}

export default Footer;
