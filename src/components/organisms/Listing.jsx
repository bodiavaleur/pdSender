import {
  Modal,
  Shade,
  Message,
  Button,
  TextInfo,
  ProfileText
} from "../../ui/atoms";
import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";

export default class Listing extends Component {
  render() {
    return (
      <React.Fragment>
        <Spring from={{ right: "-500px" }} to={{ right: "-15px" }}>
          {props => (
            <Modal listing style={props}>
              <Message
                input
                onChange={this.props.handleChange}
                value={this.props.value}
              />
              {this.props.parse && (
                <React.Fragment>
                  <ProfileText>Parsed: {this.props.parsed}</ProfileText>
                </React.Fragment>
              )}
            </Modal>
          )}
        </Spring>
        <Shade full onClick={this.props.toggleListing} />
      </React.Fragment>
    );
  }
}
