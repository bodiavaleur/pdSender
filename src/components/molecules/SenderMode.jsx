import React, { Component } from "react";
import { Modal, Line } from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";
import TooltipPref from "../atoms/TooltipPref";

class SenderMode extends Component {
  render() {
    return (
      <React.Fragment>
        <Modal w="210px" h="135px" prefGroup id="prefGroup">
          <input
            type="radio"
            name="senderMode"
            id="all"
            value="all"
            checked={this.props.mode === "all"}
            onChange={e => this.props.selectMode(e.target.value)}
          />
          <PrefItem htmlFor="all" id="toolAll">
            <i className="fas fa-users" />
          </PrefItem>

          <input
            type="radio"
            name="senderMode"
            id="activeDialogs"
            value="activeDialogs"
            checked={this.props.mode === "activeDialogs"}
            onChange={e => this.props.selectMode(e.target.value)}
          />
          <PrefItem htmlFor="activeDialogs" id="toolActive">
            <i className="fas fa-comment-dots" />
          </PrefItem>

          <Line horizontal />

          <input
            type="radio"
            name="senderMode"
            id="online"
            value="online"
            checked={this.props.mode === "online"}
            onChange={e => this.props.selectMode(e.target.value)}
          />
          <PrefItem htmlFor="online" id="toolOnline">
            <i className="fas fa-user" />
          </PrefItem>

          <input
            type="radio"
            name="senderMode"
            id="bmAll"
            value="bmAll"
            checked={this.props.mode === "bmAll"}
            onChange={e => this.props.selectMode(e.target.value)}
          />
          <PrefItem htmlFor="bmAll" id="toolBm">
            <i className="fas fa-bookmark" />
          </PrefItem>

          <input
            type="radio"
            name="senderMode"
            id="listing"
            value="listing"
            checked={this.props.mode === "listing"}
            onChange={e => this.props.selectMode(e.target.value)}
          />
          <PrefItem htmlFor="listing" id="toolList">
            <i className="fas fa-clipboard-list" />
          </PrefItem>
        </Modal>

        <TooltipPref label="Search" target="all" container="toolAll" />
        <TooltipPref
          label="Active dialogs"
          target="activeDialogs"
          container="toolActive"
        />
        <TooltipPref
          label="All dialogs"
          target="online"
          container="toolOnline"
        />
        <TooltipPref label="Bookmarks" target="bmAll" container="toolBm" />
        <TooltipPref label="List" target="listing" container="toolList" />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  mode: state.pdReducer.mode
});

export default connect(mapStateToProps)(SenderMode);
