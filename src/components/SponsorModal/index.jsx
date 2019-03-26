import React, { Component } from "react";
import {
  Button,
  Header,
  Form,
  Icon,
  Modal,
  Input,
  Message,
  TextArea
} from "semantic-ui-react";
import styled from "styled-components";

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

const Description = styled.p`
  font-size: 17px;
  line-height: 1.5;
`;

export default class SponsorModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, submitted: false, error: "" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "Sponsorship Form",
        name: this.state.name,
        question: this.state.message
      })
    })
      .then(() => this.setState({ submitted: true }))
      .catch(error => alert(error));
  };

  handleOpen = () => {
    this.setState({ modalOpen: true, submitted: false });
  };

  handleClose = () => this.setState({ modalOpen: false });

  render() {
    const { submitted } = this.state;
    return (
      <Modal
        dimmer="inverted"
        trigger={
          <Button
            onClick={this.handleOpen}
            className="footerButton"
            size="small"
            basic
            color="red"
          >
            <Icon name="trophy" />
            Want to Sponsor?
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header content="Sponsoring The Overlap" />
        <Modal.Content>
          {!submitted && (
            <>
              <Description>
                Want to sponsor The Overlap? Want to get your message out to
                designers and developers? Let's talk and see if we're a good
                fit. Send us an email if you're interested. We'll be in touch!
              </Description>
            </>
          )}
          {submitted && (
            <Message
              success
              header="Message Sent!"
              content="Thanks for your interest to support! We'll be in touch shortly."
            />
          )}
          <Form
            name="contact"
            method="post"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
            netlify
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <Form.Field hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field
                id="form-input-control-name"
                control={Input}
                label="Name"
                name="name"
                onChange={this.handleChange}
              />
              <Form.Field
                id="form-input-control-name"
                control={Input}
                label="Email"
                name="email"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Field
              id="form-textarea-control-name"
              control={TextArea}
              label="Message"
              placeholder="Tell us a little about you, your company, or your message."
              name="message"
              onChange={this.handleChange}
            />
            {!submitted && (
              <Button color="blue" type="submit" animated>
                <Button.Content visible>Send</Button.Content>
                <Button.Content hidden>
                  <Icon name="paper plane" />
                </Button.Content>
              </Button>
            )}
            {submitted && (
              <Button type="button" disabled>
                Sent!
              </Button>
            )}
          </Form>
        </Modal.Content>
        {/* <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Got it
          </Button>
        </Modal.Actions> */}
      </Modal>
    );
  }
}
