import React, { Component } from "react";
import { ProfilePageWrapper } from "../../ui/pages";
import {
  ProfileBackground,
  Modal,
  Input,
  Button,
  ArrowButton,
  FlexContainer,
  AttachIcon
} from "../../ui/atoms";
import Attachments from "../organisms/Attachments";
import { TOGGLE_ATTACHMENTS } from "../../redux/ui/uiActions";
import { connect } from "react-redux";
import { sendAttach } from "../../api";
import { CLEAR_ATTACHMENTS } from "../../redux/actions";
import { ParamLabel } from "../../ui/molecules";

class MagicPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maleId: 0
    };

    this.toggleAttachments = this.toggleAttachments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendAttach = this.sendAttach.bind(this);
  }

  toggleAttachments() {
    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({ maleId: value });
  }

  sendAttach() {
    sendAttach(
      this.state.maleId,
      this.props.modelData.id,
      this.props.attachments[0].id,
      this.props.attachments[0].type
    );
    this.props.dispatch({ type: CLEAR_ATTACHMENTS });
  }

  render() {
    console.log("this.props", this.props);
    return (
      <React.Fragment>
        <ProfileBackground img="http://cdn.osxdaily.com/wp-content/uploads/2018/08/Abstract-1-610x343.jpg" />
        <ProfilePageWrapper magic>
          <Modal w="300px" h="125px" center>
            <ParamLabel modal>Send without moderation</ParamLabel>
            <FlexContainer center column>
              <Input placeholder="Male ID" onChange={this.handleChange} />
              <div>
                <Button text onClick={this.toggleAttachments}>
                  <i class="fas fa-camera" />
                </Button>
                <Button text onClick={this.sendAttach}>
                  <i className="fas fa-arrow-circle-right" />
                </Button>
              </div>
            </FlexContainer>
          </Modal>

          {this.props.showAttachments && (
            <Attachments
              video
              audio
              moderation
              toggleAttachments={this.toggleAttachments}
            />
          )}
        </ProfilePageWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  showAttachments: state.uiReducer.showAttachments,
  attachments: state.pdReducer.attachments,
  modelData: state.pdReducer.modelData
});

export default connect(mapStateToProps)(MagicPage);
