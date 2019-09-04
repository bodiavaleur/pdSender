import React, { Component } from "react";
import { ProfilePageWrapper } from "../../ui/pages";
import {
  ProfileBackground,
  ProfileAvatar,
  FinderText,
  Button,
  ModalGroup,
  Modal,
  Shade,
  FlexContainer,
  Input
} from "../../ui/atoms";
import {
  fetchAllMales,
  getMale,
  getStickers,
  sendMessage,
  sendMail,
  sendSticker,
  sendAttach,
  fetchParticular
} from "../../api";
import { connect } from "react-redux";
import { FinderInfoGroup } from "../../ui/molecules";
import { FinderWrap, SenderPrefs } from "../../ui/organisms";
import MessageGroup from "../molecules/MessageGroup";
import {
  TOGGLE_ATTACHMENTS,
  TOGGLE_MEDIA_GALLERY
} from "../../redux/ui/uiActions";
import MessageBlock from "../molecules/MessageBlock";
import Attachments from "../organisms/Attachments";
import SendType from "../molecules/SendType";
import { SET_MPM, SET_MESSAGE } from "../../redux/actions";
import MediaGallery from "../organisms/MediaGallery";
import { CircleSpinner } from "react-spinners-kit";
class FinderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      males: [],
      packs: [],
      circleColor: "orange",
      startSending: false
    };

    this.skipMale = this.skipMale.bind(this);
    this.toggleAttachments = this.toggleAttachments.bind(this);
    this.toggleMediaGallery = this.toggleMediaGallery.bind(this);
    this.sendToMale = this.sendToMale.bind(this);
    this.setMale = this.setMale.bind(this);
  }

  searchMales() {
    fetchAllMales(this.state.page, this.props.searchFilters, malesData =>
      malesData.users.forEach(male =>
        getMale(male.id, maleInfo =>
          this.setState(prevState =>
            this.setState({
              males: [...new Set([...prevState.males, maleInfo])]
            })
          )
        )
      )
    );
  }

  setMpm(val) {
    this.props.dispatch({
      type: SET_MPM,
      payload: val
    });
  }

  sendToMale() {
    const data = this.state.males[0];
    let splitMessage = this.props.message.split(" @ ");
    const timeout = () =>
      setTimeout(() => {
        this.setState({ startSending: true });
        if (!splitMessage.length) {
          clearTimeout(timeout);
          this.setState({ circleColor: "green", startSending: false });
          this.skipMale();
          return;
        }

        console.log("splitMessage", splitMessage);

        if (this.props.sendType === "chat") {
          const attach = this.props.attachments.find(
            el => el.attachTo === splitMessage[0]
          );

          sendMessage(
            data.id,
            this.props.modelData.id,
            splitMessage[0],
            resData => {
              this.setMpm(parseInt(resData.headers["x-rate-limit-remaining"]));
              this.setState({
                circleColor: "blue",
                rateLimit: resData.headers["x-rate-limit-limit"]
              });

              splitMessage.shift();
            }
          );

          if (!!this.props.attachments.length && attach) {
            sendMessage(
              data.id,
              this.props.modelData.id,
              splitMessage[0],
              resData => {
                this.setMpm(
                  parseInt(resData.headers["x-rate-limit-remaining"])
                );
                this.setState({
                  circleColor: "blue"
                });

                splitMessage.shift();
              }
            );

            if (attach.type === "sticker") {
              sendSticker(data.id, this.props.modelData.id, attach);
            } else {
              sendAttach(
                data.id,
                this.props.modelData.id,
                attach.id,
                attach.type
              );
            }
          }
        } else if (this.props.sendType === "mail") {
          sendMail(
            this.props.modelData.id,
            data.id,
            splitMessage[0],
            data => {
              this.setMpm(parseInt(data.headers["x-rate-limit-remaining"]));
              this.setState(prevState => ({
                circleColor: "blue"
              }));
              splitMessage.shift();
            },
            this.props.attachments
          );
        }

        clearTimeout(timeout);
        timeout();
      }, 3000);

    timeout();
  }

  checkIsEmpty() {
    if (this.state.males.length < 5) {
      this.setState({ page: this.state.page + 1 });
      this.searchMales(this.state.page);
      console.log("empty");
    }
  }

  skipMale() {
    this.checkIsEmpty();
    const newMalesData = this.state.males;
    newMalesData.shift();
    this.props.dispatch({ type: SET_MESSAGE, payload: "" });
    this.setState({ males: newMalesData });
  }

  setMale(id) {
    fetchParticular(id, male => {
      male = male.users[0];
      getMale(male.id, maleInfo => {
        let malesData = this.state.males;
        malesData[0] = maleInfo;
        this.setState({ males: malesData });
      });
    });
  }

  toggleAttachments() {
    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  toggleMediaGallery() {
    return this.props.dispatch({ type: TOGGLE_MEDIA_GALLERY });
  }

  componentDidMount() {
    this.searchMales();
    getStickers(packs => this.setState({ packs: packs }));
  }

  render() {
    console.log("this.state :", this.state, this.props);
    const messages = this.props.message.split(" @ ");
    const splits = this.state.males.length ? this.state.males[0].splits : null;
    const male = this.state.males.length ? this.state.males[0].personal : null;
    return (
      <React.Fragment>
        {!!male ? (
          <React.Fragment>
            <ProfileBackground img={male.avatar_xl} />
            <Shade full back />

            <ProfilePageWrapper finder>
              <Input
                placeholder="Search"
                onKeyDown={e =>
                  e.key === "Enter" ? this.setMale(e.target.value) : null
                }
              />
              <FinderWrap>
                <ProfileAvatar
                  w="250px"
                  h="400px"
                  src={male.avatar_xxl}
                  cubic
                  center
                />
                <FinderInfoGroup column>
                  <FinderText
                    weight="bold"
                    size="3rem"
                    width="100%"
                    marginX="10px"
                    marginY="20px"
                  >
                    {male.name.length > 20
                      ? male.name.slice(0, 20) + "..."
                      : male.name}
                    ,{male.age}
                  </FinderText>
                  <FinderText
                    weight="400"
                    size="0.8rem"
                    marginY="10px"
                    marginX="10px"
                  >
                    {`#${this.state.males[0].id}`}
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginX="10px">
                    {male.country} , {male.city}
                  </FinderText>
                  <FinderText
                    weight="400"
                    size="1rem"
                    marginX="10px"
                    marginY="20px"
                    scroll
                  >
                    {male.description}
                  </FinderText>
                </FinderInfoGroup>

                <FinderInfoGroup info>
                  <FinderText weight="500" size="1.5rem">
                    Has money
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {splits.first_look_experience_first_payment ? "Yes" : "No"}
                  </FinderText>

                  <FinderText weight="500" size="1.5rem">
                    Birthday
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {male.date_birth}
                  </FinderText>

                  <FinderText weight="500" size="1.5rem">
                    Occupation
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {male.occupation}
                  </FinderText>

                  <FinderText weight="500" size="1.5rem">
                    Kids
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {male.count_children}
                  </FinderText>

                  <FinderText weight="500" size="1.5rem">
                    Status
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {male.marital_status}
                  </FinderText>

                  <FinderText weight="500" size="1.5rem">
                    Religion
                  </FinderText>
                  <FinderText weight="400" size="0.8rem" marginY="15px">
                    {male.religion}
                  </FinderText>
                </FinderInfoGroup>
              </FinderWrap>

              <SenderPrefs finder>
                <SendType vertical />
                <MessageGroup
                  small
                  message={this.props.message}
                  sendType={this.props.sendType}
                  attachments={this.props.attachments}
                  toggleAttachments={this.toggleAttachments}
                  toggleMediaGallery={this.toggleMediaGallery}
                ></MessageGroup>

                <FlexContainer around column height="200px">
                  <FlexContainer column>
                    <Button text onClick={this.skipMale}>
                      <i className="fas fa-forward"></i>
                    </Button>
                    <Button
                      text
                      onClick={this.sendToMale}
                      disabled={!this.props.message}
                    >
                      <i className="fas fa-paper-plane"></i>
                    </Button>
                  </FlexContainer>
                  {this.state.startSending && (
                    <CircleSpinner
                      size={30}
                      color="rgba(255,255,255,0.5)"
                      loading={true}
                    />
                  )}
                </FlexContainer>
              </SenderPrefs>

              {!!messages.length &&
                this.props.sendType === "chat" &&
                (messages[0] !== "" && (
                  <ModalGroup>
                    {messages.map((msg, idx) => (
                      <MessageBlock
                        msg={msg}
                        clickAdd={this.toggleAttachments}
                        attachments={this.props.attachments}
                      />
                    ))}
                  </ModalGroup>
                ))}

              {this.props.showMediaGallery && (
                <MediaGallery
                  idFemale={this.props.modelData.id}
                  toggleGallery={this.toggleMediaGallery}
                />
              )}
              {this.props.showAttachments && (
                <Attachments
                  stickersTab
                  photo
                  video
                  audio
                  stickers={this.state.packs}
                  toggleAttachments={this.toggleAttachments}
                />
              )}
            </ProfilePageWrapper>
          </React.Fragment>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  modelData: state.pdReducer.modelData,
  searchFilters: state.pdReducer.searchFilters,
  message: state.pdReducer.message,
  sendType: state.pdReducer.sendType,
  attachments: state.pdReducer.attachments,
  showAttachments: state.uiReducer.showAttachments,
  showMediaGallery: state.uiReducer.showMediaGallery
});

export default connect(mapStateToProps)(FinderPage);
