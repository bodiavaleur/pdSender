import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  MainInfoWrapper,
  InfoTitle,
  Modal,
  DisplayMessages,
  TextInfoMailing,
  TextInfoMailingWrap,
  UserWrapper,
  ProfileAvatar,
  UserText
} from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import { SET_MPM, SET_MODE } from "../../redux/actions";
import { Spring } from "react-spring/renderprops";
import Timer from "react-compound-timer";
import {
  fetchAllMales,
  fetchMales,
  sendMessage,
  sendMail,
  likeMale,
  addToFavorites,
  sendSticker,
  sendAttach,
  setOffline,
  getMale,
  createConnection,
  getConnections
} from "../../api";
import { Redirect } from "react-router-dom";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";

class MailingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sentMales: [],
      counter: 0,
      idx: 0,
      offset: 0,
      cycles: 0,
      maxOffset: 0,
      cursor: "W10=",
      splitMessage: this.props.message.split(" @ "),
      modelId: 0,
      circleColor: "blue",
      dataCounter: 0,
      rateLimit: 40,
      audioDone: document.getElementById("audioDone")
    };

    this.stopSender = this.stopSender.bind(this);
    this.setMpm = this.setMpm.bind(this);
  }

  stopSender() {
    document.location.reload();
    for (let i = 0; i < 99999; i++) {
      window.clearTimeout(i);
    }
  }

  sendFn(data, repeat = false) {
    let cursor = data.cursor;
    let copyData = data;
    if (!repeat) {
      cursor = data.cursor;
      copyData = data;
    }
    let { splitMessage, idx, offset, maxOffset } = this.state;

    if (data.profiles) {
      !copyData.profiles.length && this.setState({ cursor: "W10=" });
    }

    data = data.profiles ? data.profiles : data.users;

    this.props.mode === "listing" && (data = this.props.list);

    data = data.filter(x => !this.props.blacklist.includes(x.id));
    data = data.filter(x => !this.state.sentMales.includes(x.id));
    data = this.props.useOnline ? data.filter(x => x.is_online) : data;
    data = data.filter(x => x.id !== this.state.modelId);
    const timeout = () =>
      setTimeout(
        () => {
          let males;

          if (!!this.props.list.length && this.props.mode === "listing") {
            males = this.props.list.length;
          } else {
            males = copyData.users
              ? !copyData.users.length
              : !copyData.profiles.length;
          }

          if (!!males && this.props.useRepeat === false) {
            if (this.state.dataCounter >= 6) {
              this.setState({ circleColor: "green" });
              this.state.audioDone.play();
              for (let i = 0; i < 99999; i++) {
                window.clearTimeout(i);
              }

              return;
            } else {
              this.setState({ dataCounter: this.state.dataCounter + 1 });
            }
          }

          if (!splitMessage.length || !data.length) {
            clearTimeout(timeout);
            !this.props.autoMpm && this.setMpm(1);

            if (this.props.mode !== "all") {
              this.setState({ offset: data.length + 1 });
            } else {
              switch (this.props.offsetInit) {
                case "start":
                  offset >= maxOffset
                    ? this.initOffset()
                    : this.setState({ offset: offset + 1 });
                  break;
                case "random":
                  this.setState({
                    offset: Math.round(Math.random() * maxOffset)
                  });
                  break;
                case "end":
                  offset <= 1
                    ? this.initOffset()
                    : this.setState({
                        offset: offset - 1
                      });
                  break;
                default:
                  return;
              }
            }

            this.setState({
              cursor: copyData.cursor,
              sentMales: [
                ...this.state.sentMales,
                ...data.map(male => male.id)
              ],
              splitMessage: this.props.message.split(" @ "),
              cycles: this.state.cycles + 1
            });

            this.sendToChat();
            return;
          }

          if (idx === data.length) {
            splitMessage.shift();
            this.setState({
              splitMessage: splitMessage,
              idx: 0,
              cursor: repeat ? this.state.cursor : cursor
            });
            this.sendFn(copyData, (repeat = true));
            return;
          }

          if (!data[idx].id) {
            return;
          }

          createConnection(
            data[idx].id,
            this.props.modelData.id,
            connection => {
              if (this.props.ignoreBm ? !connection.isBookmarked : true) {
                if (this.props.sendType === "chat") {
                  const attach = this.props.attachments.find(
                    el => el.attachTo === splitMessage[0]
                  );

                  sendMessage(
                    data[idx].id,
                    this.state.modelId,
                    splitMessage[0],
                    resData => {
                      !this.props.autoMpm &&
                        this.setMpm(
                          parseInt(resData.headers["x-rate-limit-remaining"])
                        );
                      console.log("resData", resData);

                      this.setState({
                        counter: this.state.counter + 1,
                        circleColor: "blue",
                        rateLimit: resData.headers["x-rate-limit-limit"]
                      });
                    }
                  );

                  if (!!this.props.attachments.length && attach) {
                    sendMessage(
                      data[idx].id,
                      this.state.modelId,
                      splitMessage[0],
                      resData => {
                        !this.props.autoMpm &&
                          this.setMpm(
                            parseInt(resData.headers["x-rate-limit-remaining"])
                          );
                        console.log("resData", resData);

                        this.setState({
                          counter: this.state.counter + 1,
                          circleColor: "blue",
                          rateLimit: resData.headers["x-rate-limit-limit"]
                        });
                      }
                    );

                    if (attach.type === "sticker") {
                      sendSticker(data[idx].id, this.state.modelId, attach);
                    } else {
                      sendAttach(
                        data[idx].id,
                        this.state.modelId,
                        attach.id,
                        attach.type
                      );
                    }
                  }
                } else if (this.props.sendType === "mail") {
                  sendMail(
                    this.state.modelId,
                    data[idx].id,
                    splitMessage[0],
                    data => {
                      !this.props.autoMpm &&
                        this.setMpm(
                          parseInt(data.headers["x-rate-limit-remaining"])
                        );
                      this.setState(prevState => ({
                        counter: this.state.counter + 1,
                        circleColor: "blue",
                        rateLimit: data.headers["x-rate-limit-limit"]
                      }));
                    },
                    this.props.attachments
                  );

                  if (this.props.showMailComment && !!this.props.mailComment) {
                    sendMessage(
                      data[idx].id,
                      this.state.modelId,
                      this.props.mailComment,
                      resData => {
                        !this.props.autoMpm &&
                          this.setMpm(
                            parseInt(resData.headers["x-rate-limit-remaining"])
                          );
                        this.setState({
                          counter: this.state.counter + 1,
                          circleColor: "blue",
                          rateLimit: resData.headers["x-rate-limit-limit"]
                        });
                      }
                    );
                  }
                }

                if (this.props.likeUser) {
                  likeMale(data[idx].id, this.state.modelId);
                }

                if (this.props.favUser) {
                  addToFavorites(data[idx].id, this.state.modelId);
                }

                if (this.props.setOffline) {
                  setOffline(this.state.modelId);
                }
              }

              this.setState({ idx: idx + 1, dataCounter: 0 });
              idx = idx + 1;
            }
          );

          clearTimeout(timeout);
          timeout();
        },
        this.props.autoMpm
          ? Math.round(60 / this.props.mpm) * 1000
          : this.props.mpm < 2
          ? 3250
          : 1000
      );
    timeout();
  }

  sendToChat() {
    this.setState({ circleColor: "orange" });
    switch (this.props.mode) {
      case "bmAll":
      case "online":
      case "activeDialogs":
        fetchMales(
          this.props.modeFilters,
          0,
          data => this.sendFn(data),
          this.state.cursor
        );
        break;
      case "all":
        fetchAllMales(this.state.offset + 1, this.props.searchFilters, data =>
          this.sendFn(data)
        );
        break;
      case "listing":
        this.sendFn(
          this.props.list.map(x => ({
            id: x
          }))
        );
        break;
      default:
        return;
    }
  }

  setMpm(val) {
    this.props.dispatch({
      type: SET_MPM,
      payload: val
    });
  }

  initOffset() {
    let offsetMode = this.props.offsetInit;

    fetchAllMales(1, this.props.searchFilters, data => {
      const maxOffset = Math.round(data.count / 25);

      switch (offsetMode) {
        case "start":
          this.setState({ offset: 1, maxOffset: maxOffset });
          break;
        case "random":
          this.setState({
            offset: Math.round(Math.random() * (data.count / 25)),
            maxOffset: maxOffset
          });
          break;
        case "end":
          fetchAllMales(1, this.props.searchFilters, data =>
            this.setState({
              offset: Math.round(data.count / 25),
              maxOffset: maxOffset
            })
          );
          break;
        default:
          return;
      }
    });
  }

  componentDidMount() {
    if (this.props.senderLaunch) {
      this.setState({ modelId: this.props.modelData.id });
      this.sendToChat();
      this.initOffset();
    }
  }

  render() {
    console.log("this.props :", this.props);
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://lh3.googleusercontent.com/67QkZk4pJIAL7tH2EcXK1iKLG-44PFs4bJn-Pt0xPxCBt8ooQhorqqNYoNojy04MaQBRyKt_DMCV6eA2PbDfPVt0NLBSDbqZABArHcNt0YhhZcUP0SoZrk-PfdTD6GBieizIliMVDNJNeOUk0nb15qIWx2_3rBnVwgtrwrnENq7W_obrcJKTGNCni_gg8mHtKiLhScsWsDJxV00xdKq8hbKkaFpTLHsUG3bwjnbr1X03UeQGa0nZhvcvXKgoPvp0z9ejhHd_M4DoJfht62RiAkXudNpvAvmwGY-USltQQh8M79CMtU7LVYT5eDH8X7gehV9p7374JqwSwmZwxdobWK3xLchhkhMo8m9SdDTZ-3odUC0zeno51RHMWw-5qPdx9fXKDsoa7_9LBR9drpVzz_4oPnGroPUrjx_6Bcp5_E4Nt9u-FtsGuJPyg9NdZjtjh1lKhQW_QZA28XZGGJn53PsX3ZsFzi2lZjZ0J6qhZdhYlcCmw-iicwabr5ZOMIHK1e51Y5N3lea71Wguqccsd9E8EzgBmbSFGAHJT4iBD-M8AHI16lfL8kgc9RzW6mCUBq5tBfD8A_nBK7PNTRdyPAf87kp9txicoBbf2xlZi9RkQVXlf7gTSQXnDozs3aLbgnVcD5Rzg4J4w42l9g0oKhR71c6wuNhOO934A8Aur7Au1AbKHkYvVME4lwQe3Qg7pb5sJLTmj-WzPfazfzG6L3l7=w1270-h715-no"
                style={props}
              />
              <DisplayMessages className="text-focus-in">
                {this.props.message.split(" @ ").map(msg => (
                  <Modal displayMessage w="350px" h="150px" bg="#333333">
                    {msg}
                  </Modal>
                ))}
              </DisplayMessages>
              <MainInfoWrapper style={props}>
                <div class="plane main ">
                  <div class={`${this.state.circleColor}-circle circle`} />
                  <div class={`${this.state.circleColor}-circle circle`} />
                  <div class={`${this.state.circleColor}-circle circle`} />
                  <div class={`${this.state.circleColor}-circle circle`} />
                  <div class={`${this.state.circleColor}-circle circle`} />
                </div>
                <InfoTitle className="text-focus-in">
                  {this.state.dataCounter >= 3
                    ? `Done. | ${this.state.counter}`
                    : `Sent: ${this.state.counter}`}
                </InfoTitle>

                <PrefItem
                  onClick={this.stopSender}
                  className="text-focus-in"
                  stop
                >
                  <i className="fas fa-times" />
                </PrefItem>
              </MainInfoWrapper>

              <TextInfoMailingWrap className="text-focus-in">
                <TextInfoMailing>
                  Bookmarks: {this.props.bookmarks.length}
                </TextInfoMailing>
                <TextInfoMailing>Delay: {this.props.mpm}</TextInfoMailing>
                <TextInfoMailing>Limit: {this.state.rateLimit}</TextInfoMailing>
                <TextInfoMailing>Mode: {this.props.mode}</TextInfoMailing>
                <TextInfoMailing>
                  Online: {this.props.currentOnline}
                </TextInfoMailing>
                <TextInfoMailing>
                  Time:{" "}
                  <Timer
                    formatValue={value => `${value < 10 ? `0${value}` : value}`}
                  >
                    <Timer.Hours formatValue={value => `${value}:`} />
                    <Timer.Minutes formatValue={value => `${value}:`} />
                    <Timer.Seconds formatValue={value => `${value}`} />
                  </Timer>
                </TextInfoMailing>

                {this.props.autoMpm && (
                  <Slider
                    orientation="vertical"
                    min={1}
                    max={this.state.rateLimit}
                    step={1}
                    value={this.props.mpm}
                    tooltip={true}
                    onChange={this.setMpm}
                  />
                )}
              </TextInfoMailingWrap>

              <UserWrapper bottom className="text-focus-in">
                <ProfileAvatar
                  w="32px"
                  h="32px"
                  src={this.props.modelData.avatar_small}
                />
                <UserWrapper left>
                  <UserText>{this.props.modelData.name}</UserText>
                  <UserText email>{this.props.modelData.occupation}</UserText>
                </UserWrapper>
              </UserWrapper>

              {!this.props.senderLaunch && (
                <Redirect to={process.env.PUBLIC_URL + "/sender"} />
              )}
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  sentCount: state.pdReducer.sentCount,
  senderLaunch: state.pdReducer.senderLaunch,
  message: state.pdReducer.message,
  bookmarks: state.pdReducer.bookmarks,
  mpm: state.pdReducer.mpm,
  currentOnline: state.pdReducer.currentOnline,
  modeFilters: state.pdReducer.modeFilters,
  modelData: state.pdReducer.modelData,
  mode: state.pdReducer.mode,
  delay: state.pdReducer.delay,
  sendType: state.pdReducer.sendType,
  showMediaGallery: state.uiReducer.showMediaGallery,
  showBlacklist: state.uiReducer.showBlacklist,
  attachments: state.pdReducer.attachments,
  blacklist: state.pdReducer.blacklist,
  showAttachments: state.uiReducer.showAttachments,
  selectedMessage: state.pdReducer.selectedMessage,
  sentMales: state.pdReducer.sentMales,
  likeUser: state.pdReducer.likeUser,
  favUser: state.pdReducer.favUser,
  ignoreBm: state.pdReducer.ignoreBm,
  showSendParams: state.uiReducer.showSendParams,
  showListing: state.uiReducer.showListing,
  list: state.pdReducer.list,
  useRepeat: state.pdReducer.useRepeat,
  autoMpm: state.pdReducer.autoMpm,
  searchFilters: state.pdReducer.searchFilters,
  setOffline: state.pdReducer.setOffline,
  offsetInit: state.pdReducer.offsetInit,
  useOnline: state.pdReducer.useOnline,
  showMailComment: state.uiReducer.showMailComment,
  mailComment: state.pdReducer.mailComment
});

export default connect(mapStateToProps)(MailingPage);
