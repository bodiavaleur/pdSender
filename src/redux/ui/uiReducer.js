import {
  TOGGLE_TOP_PANEL,
  TOGGLE_MEDIA_GALLERY,
  TOGGLE_BLACKLIST,
  TOGGLE_SENDER_PAGE,
  TOGGLE_PROFILE_PAGE,
  TOGGLE_MAILING_PAGE,
  TOGGLE_ATTACHMENTS,
  TOGGLE_PARAMS,
  TOGGLE_LISTING,
  TOGGLE_MAIL_COMMENT,
  TOGGLE_IMPORTANT_NOTE
} from "./uiActions";

const initialState = {
  showTopPanel: false,
  showMediaGallery: false,
  showBlacklist: false,
  showProfilePage: false,
  showSenderPage: true,
  showMailingPage: false,
  showAttachments: false,
  showSendParams: false,
  showListing: false,
  showMailComment: false,
  showImportantNote: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case TOGGLE_IMPORTANT_NOTE:
      return { ...state, showImportantNote: !state.showImportantNote };

    case TOGGLE_MAIL_COMMENT:
      return { ...state, showMailComment: !state.showMailComment };

    case TOGGLE_LISTING:
      return { ...state, showListing: !state.showListing };

    case TOGGLE_ATTACHMENTS:
      return { ...state, showAttachments: !state.showAttachments };

    case TOGGLE_TOP_PANEL:
      return { ...state, showTopPanel: !state.showTopPanel };

    case TOGGLE_MEDIA_GALLERY:
      return { ...state, showMediaGallery: !state.showMediaGallery };

    case TOGGLE_BLACKLIST:
      return { ...state, showBlacklist: !state.showBlacklist };

    case TOGGLE_PARAMS:
      return { ...state, showSendParams: !state.showSendParams };

    case TOGGLE_SENDER_PAGE:
      return {
        ...state,
        showSenderPage: true,
        showProfilePage: false,
        showTopPanel: false,
        showMailingPage: false
      };

    case TOGGLE_PROFILE_PAGE:
      return {
        ...state,
        showSenderPage: false,
        showProfilePage: true,
        showTopPanel: false,
        showMailingPage: false
      };

    case TOGGLE_MAILING_PAGE:
      return {
        ...state,
        showSenderPage: false,
        showProfilePage: false,
        showTopPanel: false,
        showMailingPage: true
      };

    default:
      return state;
  }
};
