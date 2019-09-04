import React, { Component } from "react";
import { Modal, AttachIcon, Shade, AttachIconLabel } from "../../ui/atoms";
import { connect } from "react-redux";
import { SELECT_ATTACHMENT } from "../../redux/actions";
import { TabsWrapper, Tab } from "../../ui/molecules";
import { getMediaGallery } from "../../api";

class Attachments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      audio: [],
      images: [],
      video: [],
      showAudio: false,
      showVideo: false,
      showStickers: false,
      showImages: false
    };

    this.addToAttachment = this.addToAttachment.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderContent(type) {
    let contentType = {
      showAudio: false,
      showVideo: false,
      showStickers: false,
      showImages: false
    };
    switch (type) {
      case "audio":
        contentType.showAudio = true;
        break;
      case "video":
        contentType.showVideo = true;
        break;
      case "stickers":
        contentType.showStickers = true;
        break;
      case "images":
        contentType.showImages = true;
        break;
      default:
        return;
    }
    return this.setState(contentType);
  }

  addToAttachment(attach, type) {
    return this.props.dispatch({
      type: SELECT_ATTACHMENT,
      payload: { ...attach, attachTo: this.props.selectedMessage, type: type }
    });
  }

  componentDidMount() {
    return getMediaGallery(this.props.modelData.id, data =>
      this.setState({
        audio: data.audio,
        images: data.images,
        video: data.videos
      })
    );
  }

  render() {
    console.log("this.state.video", this.state.video);
    return (
      <React.Fragment>
        <Modal gallery w="600px" h="800px" bg="#efefef">
          <TabsWrapper>
            {!!this.props.stickersTab && (
              <Tab
                onClick={() => this.renderContent("stickers")}
                red={this.state.showStickers}
              >
                Stickers
              </Tab>
            )}
            {!!this.props.photo && (
              <Tab
                onClick={() => this.renderContent("images")}
                red={this.state.showImages}
              >
                Photo
              </Tab>
            )}
            {!!this.props.video && (
              <Tab
                onClick={() => this.renderContent("video")}
                red={this.state.showVideo}
              >
                Video
              </Tab>
            )}
            {!!this.props.audio && (
              <Tab
                onClick={() => this.renderContent("audio")}
                red={this.state.showAudio}
              >
                Audio
              </Tab>
            )}
          </TabsWrapper>
          {this.state.showStickers &&
            this.props.stickers.map(category =>
              category.items.map(sticker => (
                <AttachIcon
                  src={sticker.image}
                  onClick={() => this.addToAttachment(sticker, "sticker")}
                />
              ))
            )}
          {this.state.showAudio
            ? this.props.moderation
              ? this.state.audio
                  .filter(aud => aud.id_status === 4)
                  .map(audio => (
                    <AttachIconLabel>
                      {audio.title}
                      <AttachIcon
                        lg
                        src={
                          "http://www.myiconfinder.com/uploads/iconsets/256-256-7fcc2234bf1ab89f98287243830b9415-itunes.png"
                        }
                        onClick={() => this.addToAttachment(audio, "audio")}
                      />
                    </AttachIconLabel>
                  ))
              : this.state.audio.map(audio => (
                  <AttachIconLabel>
                    {audio.title}
                    <AttachIcon
                      lg
                      src={
                        "http://www.myiconfinder.com/uploads/iconsets/256-256-7fcc2234bf1ab89f98287243830b9415-itunes.png"
                      }
                      onClick={() => this.addToAttachment(audio, "audio")}
                    />
                  </AttachIconLabel>
                ))
            : null}
          {this.state.showVideo
            ? this.props.moderation
              ? this.state.video
                  .filter(vid => vid.id_status === 1)
                  .map(video => (
                    <AttachIcon
                      lg
                      src={video.url_thumbnail}
                      onClick={() => this.addToAttachment(video, "video")}
                    />
                  ))
              : this.state.video.map(video => (
                  <AttachIcon
                    lg
                    src={video.url_thumbnail}
                    onClick={() => this.addToAttachment(video, "video")}
                  />
                ))
            : null}
          {this.state.showImages &&
            this.state.images.map((image, idx) => {
              console.log(
                "this.props.attachments, image",
                this.props.attachments,
                image,
                !!this.props.attachments.includes(image)
              );
              return (
                <AttachIcon
                  key={idx}
                  lg
                  selected={!!this.props.attachments.includes([image])}
                  src={image.url_thumbnail}
                  onClick={() => this.addToAttachment(image, "photo")}
                />
              );
            })}
        </Modal>

        <Shade full onClick={this.props.toggleAttachments} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  attachments: state.pdReducer.attachments,
  selectedMessage: state.pdReducer.selectedMessage,
  modelData: state.pdReducer.modelData
});

export default connect(mapStateToProps)(Attachments);
