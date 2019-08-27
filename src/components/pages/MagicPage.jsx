import React, { Component } from "react";
import { ProfilePageWrapper } from "../../ui/pages";
import {
  ProfileBackground,
  Modal,
  Input,
  Button,
  ButtonLabel,
  FlexContainer
} from "../../ui/atoms";
import Attachments from "../organisms/Attachments";
import { TOGGLE_ATTACHMENTS, TOGGLE_LISTING } from "../../redux/ui/uiActions";
import { connect } from "react-redux";
import {
  sendAttach,
  getMediaGallery
  // saveToGallery,
  // saveUploadedMedia
} from "../../api";
import { CLEAR_ATTACHMENTS, SET_ARRAY_MALES } from "../../redux/actions";
import { ParamLabel } from "../../ui/molecules";
import { PrefItem, SenderPrefs } from "../../ui/organisms";
import Listing from "../organisms/Listing";
import { loadMales } from "../../utils";

class MagicPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maleId: 0,
      file: [],
      type: "",
      parseMode: "",
      finished: false
    };

    this.toggleAttachments = this.toggleAttachments.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendAttach = this.sendAttach.bind(this);
    this.selectParseMode = this.selectParseMode.bind(this);
    // this.handleInput = this.handleInput.bind(this);
    this.toggleListing = this.toggleListing.bind(this);
    this.startParse = this.startParse.bind(this);
    this.finishToParse = this.finishToParse.bind(this);
  }

  toggleAttachments() {
    getMediaGallery(this.props.modelData.id, galleryData => {
      // saveToGallery(
      //   this.props.modelData.id,
      //   this.state.file,
      //   galleryData.videoUploadParams.inputs
      // );
      // saveUploadedMedia(this.props.modelData.id, this.state.type);
    });

    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  handleChange(evt) {
    const { value } = evt.target;
    this.setState({ maleId: value });
  }

  // handleInput(evt, type) {
  //   return () => this.setState({ file: evt.target.files[0], type: type });
  // }

  toggleListing() {
    return this.props.dispatch({ type: TOGGLE_LISTING });
  }

  startParse(mode) {
    return () => {
      let options = {
        bookmarked: 0,
        nomessages: 0,
        unanswered: 0,
        onliners: 0
      };

      this.toggleListing();

      switch (mode) {
        case "parseActive":
          options = { ...options, nomessages: 1 };
          break;
        case "parseBm":
          options = { ...options, bookmarked: 1 };
          break;
      }

      loadMales(
        0,
        this.props.arrayMales,
        "",
        this.props.modelData.id,
        this.props.dispatch,
        this.finishToParse,
        options,
        SET_ARRAY_MALES
      );
    };
  }

  finishToParse() {
    return this.setState({ finished: true });
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

  selectParseMode(evt) {
    const { value } = evt.target;
    this.setState({ parseMode: value });
  }

  render() {
    console.log("this.props", this.props);
    const parsedMales = this.props.arrayMales.join().replace(/,/g, "\n");
    return (
      <React.Fragment>
        <ProfileBackground img="https://lh3.googleusercontent.com/67QkZk4pJIAL7tH2EcXK1iKLG-44PFs4bJn-Pt0xPxCBt8ooQhorqqNYoNojy04MaQBRyKt_DMCV6eA2PbDfPVt0NLBSDbqZABArHcNt0YhhZcUP0SoZrk-PfdTD6GBieizIliMVDNJNeOUk0nb15qIWx2_3rBnVwgtrwrnENq7W_obrcJKTGNCni_gg8mHtKiLhScsWsDJxV00xdKq8hbKkaFpTLHsUG3bwjnbr1X03UeQGa0nZhvcvXKgoPvp0z9ejhHd_M4DoJfht62RiAkXudNpvAvmwGY-USltQQh8M79CMtU7LVYT5eDH8X7gehV9p7374JqwSwmZwxdobWK3xLchhkhMo8m9SdDTZ-3odUC0zeno51RHMWw-5qPdx9fXKDsoa7_9LBR9drpVzz_4oPnGroPUrjx_6Bcp5_E4Nt9u-FtsGuJPyg9NdZjtjh1lKhQW_QZA28XZGGJn53PsX3ZsFzi2lZjZ0J6qhZdhYlcCmw-iicwabr5ZOMIHK1e51Y5N3lea71Wguqccsd9E8EzgBmbSFGAHJT4iBD-M8AHI16lfL8kgc9RzW6mCUBq5tBfD8A_nBK7PNTRdyPAf87kp9txicoBbf2xlZi9RkQVXlf7gTSQXnDozs3aLbgnVcD5Rzg4J4w42l9g0oKhR71c6wuNhOO934A8Aur7Au1AbKHkYvVME4lwQe3Qg7pb5sJLTmj-WzPfazfzG6L3l7=w1270-h715-no" />
        <ProfilePageWrapper magic>
          <Modal w="300px" h="125px" center>
            <ParamLabel modal moderation>
              Send without moderation
            </ParamLabel>
            <FlexContainer center column>
              <Input placeholder="Male ID" onChange={this.handleChange} />
              <div>
                {/* <Input
                  file
                  type="file"
                  id="mediaGalleryInputVideo"
                  onChange={e => this.handleInput(e, "video")}
                />

                <ButtonLabel for="mediaGalleryInputVideo" text>
                  <i className="fas fa-video" />
                </ButtonLabel>

                <Input
                  file
                  type="file"
                  id="mediaGalleryInputAudio"
                  onChange={e => this.handleInput(e, "audio")}
                />

                <ButtonLabel for="mediaGalleryInputAudio" text>
                  <i className="fas fa-microphone" />
                </ButtonLabel> */}

                <Button text onClick={this.toggleAttachments}>
                  <i className="fas fa-folder" />
                </Button>

                <Button text onClick={this.sendAttach}>
                  <i className="fas fa-arrow-circle-right" />
                </Button>
              </div>
            </FlexContainer>
          </Modal>
          <Modal w="300px" h="125px" center>
            <ParamLabel modal moderation>
              Parse males from profile
            </ParamLabel>
            <SenderPrefs parse>
              <input
                type="radio"
                id="parseActive"
                name="parseMode"
                value="parseActive"
                onChange={this.selectParseMode}
              />
              <PrefItem htmlFor="parseActive">
                <i className="fas fa-comment-dots" />
              </PrefItem>
              <input
                type="radio"
                id="parseBm"
                name="parseMode"
                value="parseBm"
                onChange={this.selectParseMode}
              />
              <PrefItem htmlFor="parseBm">
                <i className="fas fa-bookmark" />
              </PrefItem>
            </SenderPrefs>

            <Button onClick={this.startParse(this.state.parseMode)}>
              Start
            </Button>
          </Modal>

          {this.props.showAttachments && (
            <Attachments
              video
              audio
              moderation
              toggleAttachments={this.toggleAttachments}
            />
          )}

          {this.props.showListing && (
            <Listing
              value={parsedMales}
              toggleListing={this.toggleListing}
              parse
              parsed={this.props.arrayMales.length}
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
  modelData: state.pdReducer.modelData,
  showListing: state.uiReducer.showListing,
  arrayMales: state.pdReducer.arrayMales
});

export default connect(mapStateToProps)(MagicPage);
