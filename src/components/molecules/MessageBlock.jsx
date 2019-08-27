import React, { Component } from "react";
import { Modal } from "../../ui/atoms";
import { BlockOverlay } from "../../ui/atoms/BlockOverlay";
import { connect } from "react-redux";
import { SELECT_MESSAGE, REMOVE_ATTACHMENT } from "../../redux/actions";
import { TOGGLE_ATTACHMENTS } from "../../redux/ui/uiActions";
import { AttachIcon } from "../../ui/atoms";

class MessabeBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false,
      clearAttachment: false
    };

    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.toggleStickers = this.toggleStickers.bind(this);
    this.removeAttach = this.removeAttach.bind(this);
  }

  toggleOverlay() {
    this.props.dispatch({ type: SELECT_MESSAGE, payload: this.props.msg });
    this.setState({
      showOverlay: !this.state.showOverlay
    });
  }

  toggleStickers() {
    this.setState({
      clearAttachment: !this.state.clearAttachment
    });
    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  removeAttach() {
    const attach = this.props.attachments.find(
      el => el.attachTo === this.props.msg
    );

    this.setState({
      clearAttachment: !this.state.clearAttachment
    });
    this.props.dispatch({
      type: REMOVE_ATTACHMENT,
      payload: attach ? attach.id : 0
    });
  }

  render() {
    return (
      <Modal
        messageBlock
        h="auto"
        w="auto"
        onClick={this.toggleOverlay}
        onBlur={this.toggleOverlay}
      >
        {this.props.msg}
        {this.state.showOverlay &&
          (this.state.clearAttachment ? (
            <BlockOverlay onClick={this.removeAttach}>
              <i className="far fa-trash-alt" />
            </BlockOverlay>
          ) : (
            <BlockOverlay onClick={this.toggleStickers}>
              <i class="fas fa-plus" />
            </BlockOverlay>
          ))}
        {!!this.props.attachments.length &&
          this.props.attachments.map(
            el =>
              el.attachTo === this.props.msg && (
                <AttachIcon xs src={el.image || el.url_thumbnail} />
              )
          )}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  selectedMessage: state.pdReducer.selectedMessage,
  attachments: state.pdReducer.attachments
});

export default connect(mapStateToProps)(MessabeBlock);
