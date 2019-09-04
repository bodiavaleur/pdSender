import React, { Component } from "react";
import { Modal, Line } from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";
import { SET_SEND_TYPE } from "../../redux/actions";

class SendType extends Component {
  constructor(props) {
    super(props);

    this.senderType = this.senderType.bind(this);
  }

  senderType(evt) {
    const { value } = evt.target;
    this.props.dispatch({ type: SET_SEND_TYPE, payload: value });
  }

  render() {
    const w = this.props.vertical ? "70px" : "140px";
    const h = this.props.vertical ? "140px" : "70px";
    return (
      <Modal w={w} h={h} prefGroup>
        <input
          type="radio"
          name="sendType"
          id="chat"
          value="chat"
          checked={this.props.sendType === "chat"}
          onChange={this.senderType}
        />
        <PrefItem htmlFor="chat">
          <i className="fas fa-comments" />
        </PrefItem>
        <Line vertical />
        <input
          type="radio"
          name="sendType"
          id="mail"
          value="mail"
          checked={this.props.sendType === "mail"}
          onChange={this.senderType}
        />
        <PrefItem htmlFor="mail">
          <i className="fas fa-envelope" />
        </PrefItem>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  sendType: state.pdReducer.sendType
});

export default connect(mapStateToProps)(SendType);
