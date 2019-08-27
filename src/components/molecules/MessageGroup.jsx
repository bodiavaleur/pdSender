import React, { Component } from "react";
import { Modal, Message, TextInfo } from "../../ui/atoms";

import { SET_MESSAGE } from "../../redux/actions";
import { PrefGroup, PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";

class MessageGroup extends Component {
  constructor(props) {
    super(props);

    this.onMessageChange = this.onMessageChange.bind(this);
  }

  onMessageChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: SET_MESSAGE, payload: value });
  }

  render() {
    return (
      <PrefGroup msgAttach>
        <Modal w="600px" h="300px" bg="#efefef" message>
          <TextInfo>{this.props.message.length}</TextInfo>

          <Message
            style={{ resize: "none" }}
            placeholder={`Type your ${
              this.props.sendType === "chat" ? "message" : "mail"
            } here...`}
            onChange={this.onMessageChange}
          />

          {this.props.sendType === "mail" && (
            <PrefItem inset onClick={this.props.toggleMediaGallery}>
              <i className="fas fa-images" />
            </PrefItem>
          )}
        </Modal>
      </PrefGroup>
    );
  }
}

export default connect()(MessageGroup);
