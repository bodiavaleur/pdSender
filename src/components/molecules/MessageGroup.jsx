import React, { Component } from "react";
import { Modal, Message, TextInfo } from "../../ui/atoms";

import { SET_MESSAGE, COMMENT_MAIL } from "../../redux/actions";
import { PrefGroup, PrefItem } from "../../ui/organisms";
import { connect } from "react-redux";
import { TOGGLE_MAIL_COMMENT } from "../../redux/ui/uiActions";

class MessageGroup extends Component {
  constructor(props) {
    super(props);

    this.onMessageChange = this.onMessageChange.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);
    this.toggleComment = this.toggleComment.bind(this);
  }

  onMessageChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: SET_MESSAGE, payload: value });
  }

  onCommentChange(evt) {
    const { value } = evt.target;
    return this.props.dispatch({ type: COMMENT_MAIL, payload: value });
  }

  toggleComment() {
    return this.props.dispatch({ type: TOGGLE_MAIL_COMMENT });
  }

  render() {
    const w = this.props.small ? "450px" : "600px";
    const h = this.props.small ? "200px" : "300px";
    console.log("this.props", this.props);
    return (
      <PrefGroup msgAttach>
        <Modal w={w} h={h} bg="#efefef" message>
          <TextInfo>{this.props.message.length}</TextInfo>

          <Message
            style={{ resize: "none" }}
            placeholder={`Type your ${
              this.props.sendType === "chat" ? "message" : "mail"
            } here...`}
            onChange={this.onMessageChange}
          />

          {this.props.sendType === "mail" && (
            <React.Fragment>
              <PrefItem inset onClick={this.props.toggleAttachments}>
                <i className="fas fa-images" />
              </PrefItem>
              <PrefItem comment onClick={this.toggleComment}>
                <i className="fas fa-comment-medical"></i>
              </PrefItem>
            </React.Fragment>
          )}
        </Modal>

        {this.props.showMailComment ? (
          <Message
            style={{ resize: "none" }}
            placeholder="Add comment..."
            onChange={this.onCommentChange}
          />
        ) : null}
      </PrefGroup>
    );
  }
}

const mapStateToProps = state => ({
  showMailComment: state.uiReducer.showMailComment,
  mailComment: state.pdReducer.mailComment
});

export default connect(mapStateToProps)(MessageGroup);
