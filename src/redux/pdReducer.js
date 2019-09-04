import {
  SET_FEMALE_DATA,
  SET_MODE_FILTERS,
  SET_MESSAGE,
  SET_MODE,
  SET_MPM,
  SET_BOOKMARKS,
  SET_SEND_TYPE,
  SELECT_ATTACHMENT,
  REMOVE_ATTACHMENT,
  SET_BLACKLIST,
  DEL_BLACKLIST,
  LAUNCH_SENDER,
  SELECT_MESSAGE,
  SET_BONUSES,
  SET_CURRENT_ONLINE,
  CLEAR_ATTACHMENTS,
  CLEAR_BOOKMARKS,
  TOGGLE_LIKE,
  TOGGLE_FAVORITE,
  TOGGLE_IGNORE_BM,
  SET_LISTING,
  USE_REPEAT,
  TOGGLE_AUTO_MPM,
  SET_SEARCH_FILTERS,
  TOGGLE_SET_OFFLINE,
  SET_OFFSET_INIT,
  SET_USER_DATA,
  USE_ONLINE,
  SET_ARRAY_MALES,
  SET_ADD_BM_FN,
  SET_REMOVE_BM_FN,
  SET_GET_BM_FN,
  SET_REG_FN,
  COMMENT_MAIL
} from "./actions";

const initialState = {
  modelData: [],
  modeFilters: {
    bookmarked: 0,
    nomessages: 0,
    unanswered: 0,
    onliners: 1
  },
  searchFilters: {
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
  mode: "online",
  message: "",
  mpm: 20,
  bookmarks: [],
  sendType: "chat",
  attachments: [],
  blacklist: [],
  senderLaunch: false,
  selectedMessage: "",
  currentBonuses: 0,
  currentOnline: 0,
  likeUser: false,
  favUser: false,
  ignoreBm: false,
  useRepeat: false,
  list: [],
  autoMpm: false,
  setOffline: false,
  offsetInit: "start",
  user: [],
  useOnline: false,
  arrayMales: [],
  addBmFn: null,
  removeBmFn: null,
  getBmFn: null,
  isRegFn: null,
  mailComment: ""
};

// fix: shitcode
export default (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENT_MAIL:
      return { ...state, mailComment: payload };

    case SET_LISTING:
      return { ...state, list: payload };

    case SET_GET_BM_FN:
      return { ...state, addBmFn: payload };

    case SET_REG_FN:
      return { ...state, isRegFn: payload };

    case SET_ADD_BM_FN:
      return { ...state, addBmFn: payload };

    case SET_REMOVE_BM_FN:
      return { ...state, removeBmFn: payload };

    case SET_ARRAY_MALES:
      return { ...state, arrayMales: payload };

    case SET_USER_DATA:
      return { ...state, user: payload };

    case USE_ONLINE:
      return { ...state, useOnline: !state.useOnline };

    case SET_OFFSET_INIT:
      return { ...state, offsetInit: payload };

    case SET_SEARCH_FILTERS:
      return { ...state, searchFilters: payload };

    case TOGGLE_SET_OFFLINE:
      return { ...state, setOffline: !state.setOffline };

    case TOGGLE_AUTO_MPM:
      return { ...state, autoMpm: !state.autoMpm };

    case USE_REPEAT:
      return { ...state, useRepeat: !state.useRepeat };

    case TOGGLE_IGNORE_BM:
      return { ...state, ignoreBm: !state.ignoreBm };

    case TOGGLE_FAVORITE:
      return { ...state, favUser: !state.favUser };

    case TOGGLE_LIKE:
      return { ...state, likeUser: !state.likeUser };

    case CLEAR_ATTACHMENTS:
      return { ...state, attachments: [] };

    case CLEAR_BOOKMARKS:
      return { ...state, bookmarks: [] };

    case SET_CURRENT_ONLINE:
      return { ...state, currentOnline: payload };

    case SET_BONUSES:
      return { ...state, currentBonuses: parseInt(payload) };

    case SELECT_MESSAGE:
      return { ...state, selectedMessage: payload };

    case LAUNCH_SENDER:
      return { ...state, senderLaunch: payload };

    case SET_FEMALE_DATA:
      return { ...state, modelData: payload };

    case SET_MODE_FILTERS:
      return { ...state, modeFilters: payload };

    case SET_MESSAGE:
      return { ...state, message: payload };

    case SET_MODE:
      return { ...state, mode: payload };

    case SET_MPM:
      return { ...state, mpm: payload };

    case SET_BOOKMARKS:
      return { ...state, bookmarks: payload };

    case SET_SEND_TYPE:
      return { ...state, sendType: payload };

    case SET_BLACKLIST:
      return { ...state, blacklist: payload };

    case DEL_BLACKLIST:
      return {
        ...state,
        blacklist: state.blacklist.filter(blId => blId !== payload)
      };

    case SELECT_ATTACHMENT:
      return { ...state, attachments: [...state.attachments, payload] };

    case REMOVE_ATTACHMENT:
      return {
        ...state,
        attachments: state.attachments.filter(img => img.id !== payload)
      };
    default:
      return state;
  }
};
