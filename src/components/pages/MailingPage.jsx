import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  MainInfoWrapper,
  InfoTitle,
  Loading,
  Modal,
  DisplayMessages,
  TextInfoMailing,
  TextInfoMailingWrap
} from "../../ui/atoms";
import { PrefItem } from "../../ui/organisms";
import {
  LAUNCH_SENDER,
  SET_SENT_COUNT,
  CLEAR_SENT_MALES,
  CLEAR_ATTACHMENTS,
  CLEAR_BOOKMARKS,
  SET_MPM
} from "../../redux/actions";
import { TOGGLE_SENDER_PAGE } from "../../redux/ui/uiActions";
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
  setOffline
} from "../../api";
import { Redirect } from "react-router-dom";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { CircleSpinner } from "react-spinners-kit";

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
      modelId: 0
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
    console.log(
      "splitMessage, idx, offset, maxOffset :",
      splitMessage,
      idx,
      offset,
      maxOffset
    );
    data = data.profiles ? data.profiles : data.users;

    !!this.props.list.length && (data = this.props.list);

    data = data.filter(x => x.id !== this.state.modelId);
    data = data.filter(x => !this.state.sentMales.includes(x.id));
    data = data.filter(x => !this.props.blacklist.includes(x.id));

    data = this.props.ignoreBm
      ? data.filter(x => !this.props.bookmarks.includes(x.id))
      : data;

    data = this.props.useOnline ? data.filter(x => x.is_online) : data;

    const timeout = () =>
      setTimeout(
        () => {
          // If data is empty and using repeat switch - start again
          // if (!copyData.length && this.props.useRepeat) {
          //   console.log("repeating...");
          //   debugger;
          //   this.setState({
          //     cursor: "W10=",
          //     splitMessage: this.props.message.split(" @ "),
          //     idx: 0,
          //     cycles: this.state.cycles + 1
          //   });
          //   this.setMpm(40);
          //   !copyData.length
          //     ? this.initOffset()
          //     : this.setState({ offset: this.state.offset + 1 });
          //   console.log("data :", copyData);
          //   console.log("splitMessage", splitMessage);
          //   console.log("this.state", this.state);
          //   this.sendToChat();
          //   return;
          // }

          // If sent all messages find new males
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
              }
            }

            this.setState({
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

          if (this.props.sendType === "chat") {
            const attach = this.props.attachments.find(
              el => el.attachTo === splitMessage[0]
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
                  this.setState({
                    counter: this.state.counter + 1
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
            } else {
              sendMessage(
                data[idx].id,
                this.state.modelId,
                splitMessage[0],
                resData => {
                  !this.props.autoMpm &&
                    this.setMpm(
                      parseInt(resData.headers["x-rate-limit-remaining"])
                    );
                  this.setState({
                    counter: this.state.counter + 1
                  });
                }
              );
            }
          } else if (this.props.sendType === "mail") {
            sendMail(
              this.state.modelId,
              data[idx].id,
              splitMessage[0],
              data => {
                !this.props.autoMpm &&
                  this.setMpm(parseInt(data.headers["x-rate-limit-remaining"]));
                this.setState(prevState => ({
                  counter: this.state.counter + 1
                }));
              },
              this.props.attachments
            );
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

          this.setState({ idx: idx + 1 });
          idx = idx + 1;

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
        this.sendFn(this.props.list);
        break;
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
      console.log("data.count :", data.count);

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
    console.log("this.props.mpm :", this.props.mpm);
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://www.gizdev.com/wp-content/uploads/2018/11/MacBook-Air-2018-Stock-Walls-2.jpg"
                style={props}
              />
              <DisplayMessages>
                {this.props.message.split(" @ ").map(msg => (
                  <Modal displayMessage w="350px" h="150px" bg="#333333">
                    {msg}
                  </Modal>
                ))}
              </DisplayMessages>
              <MainInfoWrapper style={props}>
                <CircleSpinner
                  size={100}
                  color="rgba(255,255,255, 0.5)"
                  loading={this.props.senderLaunch}
                />
                <InfoTitle>Sent: {this.state.counter}</InfoTitle>

                <PrefItem onClick={this.stopSender}>
                  <i className="fas fa-times" />
                </PrefItem>
              </MainInfoWrapper>

              <TextInfoMailingWrap>
                <TextInfoMailing>
                  Bookmarks: {this.props.bookmarks.length}
                </TextInfoMailing>
                <TextInfoMailing>Delay: {this.props.mpm}</TextInfoMailing>
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
                    max={40}
                    step={1}
                    value={this.props.mpm}
                    tooltip={true}
                    onChange={this.setMpm}
                  />
                )}
              </TextInfoMailingWrap>

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
  message: state.pdReducer.message,
  modelData: state.pdReducer.modelData,
  mode: state.pdReducer.mode,
  mpm: state.pdReducer.mpm,
  delay: state.pdReducer.delay,
  bookmarks: state.pdReducer.bookmarks,
  sendType: state.pdReducer.sendType,
  showMediaGallery: state.uiReducer.showMediaGallery,
  showBlacklist: state.uiReducer.showBlacklist,
  attachments: state.pdReducer.attachments,
  blacklist: state.pdReducer.blacklist,
  sentCount: state.pdReducer.sentCount,
  senderLaunch: state.pdReducer.senderLaunch,
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
  useOnline: state.pdReducer.useOnline
});

export default connect(mapStateToProps)(MailingPage);
