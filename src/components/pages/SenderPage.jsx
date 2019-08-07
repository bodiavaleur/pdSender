import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ProfileBackground,
  ModalGroup,
  Modal,
  GalleryImage
} from "../../ui/atoms";
import { SenderPrefs, PrefGroup } from "../../ui/organisms";
import {
  SET_MODE_FILTERS,
  SET_SEARCH_FILTERS,
  SET_MODE,
  SET_MPM,
  REMOVE_ATTACHMENT,
  SET_BLACKLIST,
  LAUNCH_SENDER,
  SET_CURRENT_ONLINE,
  SET_LISTING,
  SET_OFFSET_INIT
} from "../../redux/actions";
import {
  TOGGLE_BLACKLIST,
  TOGGLE_MAILING_PAGE,
  TOGGLE_ATTACHMENTS,
  TOGGLE_MEDIA_GALLERY,
  TOGGLE_PARAMS,
  TOGGLE_LISTING
} from "../../redux/ui/uiActions";
import { fetchAllMales, getStickers, getDataDictionary } from "../../api";
import { loadBookmarks } from "../../utils";
import MediaGallery from "../organisms/MediaGallery";
import Blacklist from "../molecules/Blacklist";
import { Spring } from "react-spring/renderprops";
import "react-rangeslider/lib/index.css";
import Attachments from "../organisms/Attachments";
import SendType from "../molecules/SendType";
import SenderMode from "../molecules/SenderMode";
import ModeSwitches from "../molecules/ModeSwitches";
import MessageGroup from "../molecules/MessageGroup";
import RightPanel from "../molecules/RightPanel";
import SendParams from "../organisms/SendParams";
import Listing from "../organisms/Listing";
import MessageBlock from "../molecules/MessageBlock";
import { Tab, TabsWrapper } from "../../ui/molecules";
import { Redirect } from "react-router-dom";

class SenderPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      online: 0,
      packs: [],
      list: [],
      filters: {
        ageFrom: null,
        ageTo: null,
        countries: [],
        withPhoto: false,
        moreChildren: false,
        marital_status: null,
        religion: null,
        body_type: null,
        smoking: null,
        drinking: null,
        countChildren: null,
        lastOnline: 2,
        education: ""
      },
      dataDictionary: {}
    };

    this.selectMode = this.selectMode.bind(this);
    this.startSender = this.startSender.bind(this);
    this.onRangeChange = this.onRangeChange.bind(this);
    this.toggleBlacklist = this.toggleBlacklist.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.toggleAttachments = this.toggleAttachments.bind(this);
    this.toggleMediaGallery = this.toggleMediaGallery.bind(this);
    this.toggleSendParams = this.toggleSendParams.bind(this);
    this.setParamSwitch = this.setParamSwitch.bind(this);
    this.setParam = this.setParam.bind(this);
    this.toggleListing = this.toggleListing.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setOffsetInit = this.setOffsetInit.bind(this);
  }

  onRangeChange(value) {
    return this.props.dispatch({ type: SET_MPM, payload: parseInt(value) });
  }

  selectMode(value, online = 0) {
    let mode;
    let options = {
      bookmarked: 0,
      nomessages: 0,
      unanswered: 0,
      onliners: 0,
      id_dialog: 0
    };

    switch (value) {
      case "online":
        options = { ...options, onliners: 1 };
        mode = "online";
        break;
      case "all":
        mode = "all";
        break;
      case "listing":
        mode = "listing";
        break;
      case "bmAll":
        options = { ...options, bookmarked: 1 };
        mode = "bmAll";
        break;
      case "activeDialogs":
        options = { ...options, nomessages: 1 };
        mode = "activeDialogs";
        break;
    }

    if (!!online) {
      options = { ...options, onliners: 1 };
    }

    this.props.dispatch({ type: SET_MODE_FILTERS, payload: options });
    this.props.dispatch({ type: SET_MODE, payload: mode });
  }

  handleChange(evt) {
    let { value } = evt.target;
    value = value.split("\n");
    value = value.map(maleId => ({
      id: parseInt(maleId)
    }));
    return this.props.dispatch({ type: SET_LISTING, payload: value });
  }

  startSender() {
    this.props.dispatch({ type: TOGGLE_MAILING_PAGE });
    this.props.dispatch({ type: LAUNCH_SENDER, payload: true });

    fetchAllMales(0, this.state.filters, data => {
      this.props.dispatch({ type: SET_CURRENT_ONLINE, payload: data.count });
    });
  }

  toggleListing() {
    return this.props.dispatch({ type: TOGGLE_LISTING });
  }

  toggleAttachments() {
    return this.props.dispatch({ type: TOGGLE_ATTACHMENTS });
  }

  toggleBlacklist() {
    return this.props.dispatch({ type: TOGGLE_BLACKLIST });
  }

  removeImage(imgId) {
    return this.props.dispatch({ type: REMOVE_ATTACHMENT, payload: imgId });
  }

  toggleMediaGallery() {
    return this.props.dispatch({ type: TOGGLE_MEDIA_GALLERY });
  }

  toggleSendParams() {
    return this.props.dispatch({ type: TOGGLE_PARAMS });
  }

  setParam(evt) {
    const { name, value } = evt.target;

    if (name === "countries") {
      this.props.dispatch({
        type: SET_SEARCH_FILTERS,
        payload: {
          ...this.props.searchFilters,
          [name]: [...this.props.searchFilters[name], value]
        }
      });
    } else {
      this.props.dispatch({
        type: SET_SEARCH_FILTERS,
        payload: { ...this.props.searchFilters, [name]: value }
      });
    }
  }

  setParamSwitch(evt) {
    const { name } = evt.target;
    this.props.dispatch({
      type: SET_SEARCH_FILTERS,
      payload: {
        filters: {
          ...this.props.searchFilters,
          [name]: !this.state.filters[name]
        }
      }
    });
  }

  setOffsetInit(value) {
    return () => this.props.dispatch({ type: SET_OFFSET_INIT, payload: value });
  }

  componentDidMount() {
    loadBookmarks(
      0,
      this.props.bookmarks,
      "",
      this.props.modelData.id,
      this.props.dispatch
    );
    getDataDictionary(dictData => this.setState({ dataDictionary: dictData }));
    const loadedBlacklist = localStorage.getItem("blacklist");

    if (loadedBlacklist) {
      const splittedBlacklist = new Set(loadedBlacklist.split(","));
      console.log(splittedBlacklist);
      for (let idx of splittedBlacklist) {
        this.props.dispatch({
          type: SET_BLACKLIST,
          payload: idx
        });
      }
    }

    getStickers(packs => this.setState({ packs: packs }));
  }

  render() {
    const messages = this.props.message.split(" @ ").filter(x => !!x);

    return (
      <React.Fragment>
        <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
          {props => (
            <React.Fragment>
              <ProfileBackground
                img="https://lh3.googleusercontent.com/fUHfRrhDwRlEWHqCpE9zYvX3siwpPHqfFCpyYv-EpqF5fm89t2JFqsNDAHPOsdB3HPFp5dhSwlRIiZ5mygsbNWcCzOPEK-wahu0xPhOawRwPRtwnBFjvegcudltsqfllRb8ro5tqRIAYMMpDIHGWlFXqdXHxivdRqpXDKoCw7vjGnavv7iT5lQe0hrYzdpXDyrx_zsT6eEwWTRuxQsF36FKweG65hG_-eoqDaMFJAbubTKztI--zEaxqFZa5rBAtqTl899pWa9wZozwZBB4Gd4U6fjLMJ4EBXNs_8Zvv8KHKLjH__vAtnQsY2SGQ_sehkvFAVu4H-u20Aj_BWcinvOeDwZh5w7iUeBubZX-JV-zh9j_aXweVf3P8rLolr0cRrGodO5Bus6VFZNzh8biYf5w0PSYCFmQuJ4lBo308y21mNZCtnEhsbC0ttYIqBQXEA33SJGarWFpYZ_pTgkPCusKaU9zeLsJ56GnVlfhIkgML54SOzYd39v_UuL_JVM-TtDtLNhNm4El1zYOIO5sxnHBZJgZSOSFuw2qQ2zmh6x-0CUfuAM-99kvpSabnGoYCQ-rrfvYghVwe8IkVKPTy-c0HcWNV43w4b5Z8S9ysChOC-AIoUq4cS_cpLFUIc1wwHh4qzV7hbeGYMbKNTnkEOC5XF5D3EEQqOxVVedP3CBjqNPV6-w6mrhV2dEiQJLq-RVhPDCAQGKm20LvxXiZHSwlF=w1533-h862-no"
                style={props}
              />
              <SenderPrefs style={props}>
                <SendType />

                <RightPanel
                  startSender={this.startSender}
                  toggleBlacklist={this.toggleBlacklist}
                  toggleSendParams={this.toggleSendParams}
                  toggleListing={this.toggleListing}
                />

                <MessageGroup
                  message={this.props.message}
                  sendType={this.props.sendType}
                  attachments={this.props.attachments}
                  toggleAttachments={this.toggleAttachments}
                  toggleMediaGallery={this.toggleMediaGallery}
                />

                {this.props.mode === "all" && (
                  <Modal w="75px" h="135px">
                    <TabsWrapper vertical>
                      <Tab
                        vertical
                        red={this.props.offsetInit === "start"}
                        onClick={this.setOffsetInit("start")}
                      >
                        <i className="fas fa-step-backward" />
                      </Tab>
                      <Tab
                        vertical
                        red={this.props.offsetInit === "random"}
                        onClick={this.setOffsetInit("random")}
                      >
                        <i className="fas fa-random" />
                      </Tab>
                      <Tab
                        vertical
                        red={this.props.offsetInit === "end"}
                        onClick={this.setOffsetInit("end")}
                      >
                        <i className="fas fa-step-forward" />
                      </Tab>
                    </TabsWrapper>
                  </Modal>
                )}

                <SenderMode selectMode={this.selectMode} />
                <ModeSwitches selectMode={this.selectMode} />

                {!!messages.length &&
                  this.props.sendType === "chat" &&
                  (messages[0] !== "" && (
                    <ModalGroup>
                      {messages.map((msg, idx) => (
                        <MessageBlock
                          msg={msg}
                          clickAdd={this.props.toggleAttachments}
                          attachments={this.props.attachments}
                        />
                      ))}
                    </ModalGroup>
                  ))}

                {!!this.props.attachments.length &&
                  this.props.sendType === "mail" && (
                    <Modal attachments h="125px" w="auto">
                      {this.props.attachments.map(img => (
                        <GalleryImage
                          img={img.url_thumbnail}
                          onClick={() => this.removeImage(img.id)}
                        />
                      ))}
                    </Modal>
                  )}

                {this.props.showListing && (
                  <Listing
                    toggleListing={this.toggleListing}
                    toggleUseListing={this.toggleUseListing}
                    handleChange={this.handleChange}
                  />
                )}

                {this.props.showMediaGallery && (
                  <MediaGallery
                    idFemale={this.props.modelData.id}
                    toggleGallery={this.toggleMediaGallery}
                  />
                )}

                {!!this.props.showBlacklist && (
                  <Blacklist toggleBlacklist={this.toggleBlacklist} />
                )}

                {this.props.showAttachments && (
                  <Attachments
                    stickers={this.state.packs}
                    toggleAttachments={this.toggleAttachments}
                  />
                )}

                {this.props.showSendParams && (
                  <SendParams
                    toggleSendParams={this.toggleSendParams}
                    setParam={this.setParam}
                    setParamSwitch={this.setParamSwitch}
                    dataDictionary={this.state.dataDictionary}
                    filters={this.state.filters}
                  />
                )}
              </SenderPrefs>
            </React.Fragment>
          )}
        </Spring>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
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
  searchFilters: state.pdReducer.searchFilters,
  offsetInit: state.pdReducer.offsetInit
});

export default connect(mapStateToProps)(SenderPage);
