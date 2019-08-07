import React, { Component } from "react";
import { Modal, Line } from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";

class SenderMode extends Component {
  render() {
    return (
      <Modal w="210px" h="135px" prefGroup>
        <input
          type="radio"
          name="senderMode"
          id="all"
          value="all"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="all">
          <i className="fas fa-users" />
        </PrefItem>
        <input
          type="radio"
          name="senderMode"
          id="activeDialogs"
          value="activeDialogs"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="activeDialogs">
          <i className="fas fa-comment-dots" />
        </PrefItem>
        <Line horizontal />
        <input
          type="radio"
          name="senderMode"
          id="online"
          value="online"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="online">
          <i className="fas fa-user" />
        </PrefItem>
        <input
          type="radio"
          name="senderMode"
          id="bmAll"
          value="bmAll"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="bmAll">
          <i className="fas fa-bookmark" />
        </PrefItem>
        <input
          type="radio"
          name="senderMode"
          id="listing"
          value="listing"
          onChange={e => this.props.selectMode(e.target.value)}
        />
        <PrefItem htmlFor="listing">
          <i className="fas fa-clipboard-list" />
        </PrefItem>
      </Modal>
    );
  }
}

export default connect()(SenderMode);
