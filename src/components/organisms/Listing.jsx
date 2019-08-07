import { Modal, Shade, Message } from "../../ui/atoms";
import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class Listing extends Component {
  render() {
    return (
      <React.Fragment>
        <Spring from={{ right: "-500px" }} to={{ right: "-15px" }}>
          {props => (
            <Modal listing style={props}>
              <Message input onChange={this.props.handleChange} />
            </Modal>
          )}
        </Spring>
        <Shade full onClick={this.props.toggleListing} />
      </React.Fragment>
    );
  }
}
