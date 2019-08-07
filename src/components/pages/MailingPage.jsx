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
      cursor: "",
      splitMessage: this.props.message.split(" @ "),
      modelId: 0
    };

    this.stopSender = this.stopSender.bind(this);
    this.setMpm = this.setMpm.bind(this);
  }

  stopSender() {
    this.props.dispatch({ type: SET_SENT_COUNT, payload: 0 });

    for (let i = 0; i < 99999; i++) {
      window.clearTimeout(i);
    }

    this.props.dispatch({ type: LAUNCH_SENDER, payload: false });
    this.props.dispatch({ type: CLEAR_SENT_MALES });
    this.props.dispatch({ type: CLEAR_ATTACHMENTS });
    this.props.dispatch({ type: CLEAR_BOOKMARKS });
    this.props.dispatch({ type: TOGGLE_SENDER_PAGE });
  }

  sendFn(data) {
    let cursor = data.cursor ? data.cursor : "";
    let splitMessage = this.state.splitMessage;
    data = data.profiles ? data.profiles : data.users;

    !!this.props.list.length && (data = this.props.list);

    data = data.filter(
      x =>
        x.id !== this.state.modelId &&
        !this.state.sentMales.includes(x.id) &&
        !this.props.blacklist.includes(x.id)
    );

    if (this.props.ignoreBm) {
      data = data.filter(x => !this.props.bookmarks.includes(x.id));
    }

    const timeout = () =>
      setTimeout(() => {
        // If data is empty and using repeat switch - start again
        if (!data.length && this.props.useRepeat) {
          this.setState({
            cursor: "",
            splitMessage: this.props.message.split(" @ "),
            idx: 0,
            cycles: this.state.cycles + 1
          });
          this.initOffset();
          this.sendToChat();
          return;
        }

        // If sent all messages find new males
        if (!splitMessage.length) {
          clearTimeout(timeout);

          if (this.props.mode !== "all") {
            this.setState({ offset: data.length + 1 });
          } else {
            switch (this.props.offsetInit) {
              case "start":
                this.setState({ offset: this.state.offset + 1 });
                break;
              case "random":
                this.setState({
                  offset: Math.round(Math.random() * this.state.maxOffset)
                });
                break;
              case "end":
                this.setState({ offset: this.state.offset - 1 });
                break;
            }
          }

          this.setState({
            sentMales: [...this.state.sentMales, ...data.map(male => male.id)],
            splitMessage: this.props.message.split(" @ "),
            cursor: cursor
          });

          this.sendToChat();
          return;
        }

        // If one message is sent choose another
        if (this.state.idx === data.length) {
          splitMessage.shift();
          this.setState({ splitMessage: splitMessage, idx: 0 });
          this.sendToChat();
          return;
        }

        if (!data[this.state.idx].id) {
          return;
        }

        if (this.props.sendType === "chat") {
          const attach = this.props.attachments.find(
            el => el.attachTo === splitMessage[0]
          );
          if (!!this.props.attachments.length && attach) {
            sendMessage(
              data[this.state.idx].id,
              this.state.modelId,
              splitMessage[0],
              resData => {
                this.setState({ counter: this.state.counter + 1 });
              }
            );

            if (attach.type === "sticker") {
              sendSticker(data[this.state.idx].id, this.state.modelId, attach);
            } else {
              sendAttach(
                data[this.state.idx].id,
                this.state.modelId,
                attach.id,
                attach.type
              );
            }
          } else {
            sendMessage(
              data[this.state.idx].id,
              this.state.modelId,
              splitMessage[0],
              resData => {
                this.props.autoMpm &&
                  this.setMpm(
                    parseInt(resData.headers["x-rate-limit-remaining"])
                  );
                this.setState({ counter: this.state.counter + 1 });
              }
            );
          }
        } else if (this.props.sendType === "mail") {
          sendMail(
            this.state.modelId,
            data[this.state.idx].id,
            splitMessage[0],
            data => {
              this.props.autoMpm &&
                this.setMpm(parseInt(data.headers["x-rate-limit-remaining"]));
              this.setState({ counter: this.state.counter + 1 });
            },
            this.props.attachments
          );
        }

        if (this.props.likeUser) {
          likeMale(data[this.state.idx].id, this.state.modelId);
        }

        if (this.props.favUser) {
          addToFavorites(data[this.state.idx].id, this.state.modelId);
        }

        if (this.props.setOffline) {
          setOffline(this.state.modelId);
        }

        this.setState({ idx: this.state.idx + 1 });

        timeout();
      }, Math.round(60 / this.props.mpm) * 1000) + 0.6;
    timeout();
  }

  sendToChat() {
    switch (this.props.mode) {
      case "bmAll":
      case "online":
      case "activeDialogs":
        fetchMales(
          this.props.modeFilters,
          this.state.offset,
          data => this.sendFn(data),
          this.state.cursor
        );
        break;
      case "all":
        fetchAllMales(this.state.offset, this.props.searchFilters, data =>
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
    let offset;

    switch (offsetMode) {
      case "start":
        this.setState({ offset: 0 });
        break;
      case "random":
        fetchAllMales(0, this.props.searchFilters, data => {
          const maxOffset = Math.round(data.count / 25);
          this.setState({
            offset: Math.round(Math.random() * (data.count / 25)),
            maxOffset: maxOffset
          });
        });
        break;
      case "end":
        fetchAllMales(0, this.props.searchFilters, data =>
          this.setState({ offset: Math.round(data.count / 25) })
        );
        break;
    }
  }

  componentDidMount() {
    this.setState({ modelId: this.props.modelData.id });
    this.sendToChat();
    this.initOffset();
  }

  render() {
    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://lh3.googleusercontent.com/-iLjMPpai8yJcd9bZFZNX69JZ35dCBfwN04dbH_o0s5OSvToB-8Pa--XyR1IaW44cObn4gUCOB-JVKu3gfrjvaQnEDKvtu9qs5xmGfDS38mR_BIrG3nq7tiVEQk8cJK7nD1RLw4_rMDZh6kju7BPv_d5LXuKpnz4T-J_z3Mv7XsPLCICnh_vaxXKkNEzrxq9AFXIWJNqfbY-22vY8AmplT8MxVv7_qXOZi603AQpJ6NB7R3rsfOcGpaAEmm-8aA2UIHSVF3JKHHQdXTFxqh1w5hgojVh5ZLxDYdYdEZSxcwd17FJnb0alud_aQ5EFSVV-RafxxxT-J4AvK4XkzrRNgKcbrheeD46DAQ1HtTARGy0rMtEr-1kPQlAJjLs2ZVyrUJ8nyAJTgXklSvFkuN8vpU8ioCtNOnowtGs8H9Q-1VPTlTMqdUaSLC6xCw8yKf81kquMFyWAJXSrfVISL7DwTAY2JrYj4QkVxDls0lmz-ocWWC2YquJ9p-V595c2wO8Wa5_g3vddYV9tnagu182Vcpt-V9Q0nv9sVEfWJCjhl_7ITp5fXP6jGZuNMiXqcTROAAfeEIPAF6NcPSJBTMrcSPhYN59aJMQxwsLIYaz551cBr2Rptcjr-K1Ve_TGGkpDj7cjk7ihz22b9COkgcTFLWXuIEKjDnDh04JHzkOcMGZLYFBHQiiAZjtVVTA7VMf2c4R9BCTwOmkZKVoP1QNEcxL=w1619-h748-no"
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
                <TextInfoMailing>MPM: {this.props.mpm}</TextInfoMailing>
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

                {!this.props.autoMpm && (
                  <Slider
                    orientation="vertical"
                    min={5}
                    max={40}
                    step={5}
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
  offsetInit: state.pdReducer.offsetInit
});

export default connect(mapStateToProps)(MailingPage);
