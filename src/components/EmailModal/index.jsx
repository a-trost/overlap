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

export default class EmailModal extends Component {
  constructor(props) {
    super(props);
    this.state = { modalOpen: false, submitted: false, error: "", name:"", question:"" };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        name: this.state.name,
        question: this.state.question
      })
    })
      .then(() => this.setState({ submitted: true }))
      .catch(error => alert(error));
      e.preventDefault();
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
            <Icon name="paper plane" />
            Send us your questions
          </Button>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Header icon="paper plane" content="Send us your questions!" />
        <Modal.Content>
          {!submitted && (
            <>
              <Description>
                If you have any questions about design or development, ask away!
                We'll try to get to it on an upcoming episode of the podcast.
              </Description>

              <Description>
                While there are no stupid questions, there's a decent chance
                we'll give a stupid answer.
              </Description>
            </>
          )}
          {submitted && (
            <Message
              success
              header="Question Sent!"
              content="Hopefully we'll be able to get to your question on the podcast. Thanks so much for taking the time to ask it!"
            />
          )}
          <Form
            name="contact"
            method="POST"
            // action="/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
            netlify="true"
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <Form.Field hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
            </Form.Field>
            <Form.Field
              id="form-input-control-name"
              control={Input}
              label="Name"
              placeholder="Your Name"
              name="name"
              onChange={this.handleChange}
            />

            <Form.Field
              id="form-textarea-control-name"
              control={TextArea}
              label="Question"
              placeholder="Your Question"
              name="question"
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
