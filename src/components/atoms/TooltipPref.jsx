import React, { Component } from "react";
import { Tooltip } from "reactstrap";

export default class TooltipPref extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

  render() {
    return (
      <Tooltip
        isOpen={this.state.tooltipOpen}
        toggle={this.toggle}
        placement={this.props.place ? this.props.place : "right"}
        target={this.props.target}
        container={this.props.container}
        autohide
        fade
        onMouseEnter={this.toggle}
        onMouseLeave={this.toggle}
      >
        {this.props.label}
      </Tooltip>
    );
  }
}
