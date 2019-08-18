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
  dispatchFn,
  finishBmFn
) => {
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

      if (!data.length) {
        finishBmFn({ bmLoaded: true });
        return;
      }

      for (let bmIdx = 0; bmIdx < data.length; bmIdx++) {
        if (bmIdx === data.length - 1) {
          bmOffset += data.length;
          loadBookmarks(
            bmOffset,
            bookmarks,
            cursor,
            modelId,
            dispatchFn,
            finishBmFn
          );
        }

        bookmarks.push(data[bmIdx].id);
      }
    },
    cursor
  );

  bookmarks = bookmarks.filter(x => x !== modelId);
  bookmarks = [...new Set(bookmarks)];
  dispatchFn({ type: SET_BOOKMARKS, payload: bookmarks });
};
