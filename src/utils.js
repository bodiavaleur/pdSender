import {
  fetchMales,
  sendMessage,
  fetchAllMales,
  sendMail,
  sendSticker,
  likeMale,
  addToFavorites,
  sendAttach
} from "./api";
import { SET_BOOKMARKS } from "./redux/actions";

export const loadBookmarks = (
  bmOffset,
  bookmarks,
  cursor,
  modelId,
  dispatchFn
) => {
  if (bookmarks.length >= 1000) {
    return;
  }

  fetchMales(
    {
      bookmarked: 1,
      nomessages: 0,
      unanswered: 0,
      onliners: 0
    },
    bmOffset,
    data => {
      let cursor = data.cursor;
      data = data.profiles;
      for (let bmIdx = 0; bmIdx < data.length; bmIdx++) {
        if (bmIdx === data.length - 1) {
          bmOffset += data.length;
          loadBookmarks(bmOffset, bookmarks, cursor, modelId, dispatchFn);
        }

        bookmarks.push(data[bmIdx].id);
      }
    },
    cursor
  );

  dispatchFn({ type: SET_BOOKMARKS, payload: bookmarks });
};
