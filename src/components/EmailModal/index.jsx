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
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state,
      }),
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
         <form name="contact" netlify>
  <p>
    <label>Name <input type="text" name="name" /></label>
  </p>
  <p>
    <label>Email <input type="email" name="email" /></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form>
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
