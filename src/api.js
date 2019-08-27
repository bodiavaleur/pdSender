const axios = require("axios");

const axs = axios.create({
  baseURL: "https://api.prime.date",
  mode: "cors",
  withCredentials: true,
  crossdomain: true,
  referrer: "https://prime.date/",
  referrerPolicy: "no-referrer-when-downgrade",
  headers: {
    Accept: "application/json"
  }
});

export const fetchMales = (options, offset, cb, cursor = "") => {
  const data = {
    criteria: {
      filters: {
        bookmarked: options.bookmarked,
        nomessages: options.nomessages,
        unanswered: options.unanswered,
        onliners: options.onliners,
        id_female: null,
        id_dialog: options.id_dialog
      }
    },
    limit: 15,
    offset: offset,
    cursor: cursor,
    type: "operatorchat"
  };

  axs({
    url: "/connections/get",
    data: data,
    method: "POST"
  }).then(res => cb(res.data.data));
};

export const fetchAllMales = (page, filters, cb) => {
  const data = {
    filters: filters,
    limit: 25,
    page: page
  };

  axs({
    url: "/account/search",
    data: data,
    method: "POST"
  }).then(data => cb(data.data.data));
};

export const fetchFemaleData = cb =>
  axs({ url: "/operator/find-females", method: "POST" }).then(data => {
    cb(data.data.data.list);
  });

export const sendMessage = (idMale, idFemale, message, cb) => {
  const data = {
    idUserTo: idMale,
    idMale: idMale,
    idFemale: idFemale,
    content: { message: message }
  };
  axs({
    url: `/operator/add-activity/message/${idMale}`,
    data: data,
    method: "POST"
  }).then(data => {
    return cb(data);
  });
};

export const sendSticker = (idMale, idFemale, sticker) => {
  const data = {
    idMale: idMale,
    idFemale: idFemale,
    content: { img: sticker.image, id_sticker: sticker.id }
  };
  axs({
    url: `/operator/add-activity/sticker/${idMale}`,
    data: data,
    method: "POST"
  });
};

export const sendMail = (
  idFemale,
  idMale,
  message,
  cb,
  images = [],
  videos = []
) => {
  const data = {
    email: { content: message, from: idFemale, to: idMale, title: "" },
    images: images,
    videos: videos
  };
  axs({ url: "/correspondence/send", data: data, method: "POST" }).then(data =>
    cb(data)
  );
};

export const getMediaGallery = (idFemale, cb) => {
  axs({
    url: `/upload/get-mail-media-gallery?idUser=${idFemale}`,
    method: "GET"
  }).then(res => cb(res.data.data));
};

export const getStickers = cb => {
  axs({
    url: "/profile/stickers",
    method: "POST"
  }).then(res => cb(res.data.data.categories));
};

export const getBonuses = cb => {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  let todayDate = {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getHours() < 3 ? today.getDate() - 1 : today.getDate()
  };

  let tomorrowDate = {
    year: tomorrow.getFullYear(),
    month: tomorrow.getMonth() + 1,
    day: tomorrow.getDate()
  };

  axs({
    url: `/statistic/operator?dateFrom=${todayDate.year}-${todayDate.month}-${todayDate.day}&dateTo=${tomorrowDate.year}-${tomorrowDate.month}-${tomorrowDate.day}&groupByDate=0`,
    method: "GET"
  }).then(res => {
    let bonuses = res.data.data[0] ? res.data.data[0].bonuses : 0;
    cb(bonuses);
  });
};

export const likeMale = (idMale, idFemale) => {
  const data = {
    idMale: idMale,
    idFemale: idFemale,
    content: { update: {}, id: "", reverse: 0 }
  };

  axs({
    url: `/operator/add-activity/like/${idMale}`,
    method: "POST",
    data: data
  });
};

export const addToFavorites = (idMale, idFemale) => {
  const data = {
    idMale: idMale,
    idFemale: idFemale,
    content: { update: {}, id: "", reverse: 0 }
  };

  axs({
    url: `/operator/add-activity/favorite/${idMale}`,
    method: "POST",
    data: data
  });
};

export const sendAttach = (idMale, idFemale, attachId, type) => {
  const data = { id_user: idFemale, content: { id: attachId }, type: type };

  axs({
    url: `/upload/chat/${idMale}`,
    method: "POST",
    data: data
  });
};

export const getDataDictionary = cb =>
  axs({
    url: "/system/dictionary?dictionary=3,4,5,6,7,8,9,17,2",
    method: "GET"
  }).then(data => cb(data.data.data));

export const getMale = (id, cb) =>
  axs({
    url: `/operator/get-male/${id}`,
    method: "POST"
  }).then(data => cb(data.data.data));

export const setOffline = id =>
  axs({
    url: "/female/online",
    data: { userIds: [id], state: 2 },
    method: "POST"
  });

export const login = (email, password) =>
  axs({
    url: "/auth/login",
    data: { email: email.trim(), password: password },
    method: "POST"
  });

export const logout = () =>
  axs({
    url: "/auth/logout",
    method: "POST"
  });

export const saveMailMedia = (modelId, type) =>
  axs({
    url: "/upload/save-mail-media-gallery",
    data: { idUser: modelId, type: type },
    method: "POST"
  });

export const getConnections = (uid, cb) =>
  axs({
    url: "/connections/get",
    data: { criteria: { uids: [uid] }, type: "uids" },
    method: "POST"
  });

export const createConnection = (idMale, idFemale, cb) =>
  axs({
    url: "/connections/create",
    data: { idMale: idMale, idFemale: idFemale },
    method: "POST"
  }).then(data => cb(data.data.data.connection));

// export const getHistory = (idMale, idFemale, last, cb, reversed=false) => {
// .then(historyData =>
//     reversed &&
//     axs({
//       url: "https://api.prime.date/operator/history",
//       data: {
//         uid: historyData.data.data.connections[0].uid,
//         last: last
//           ? last
//           : historyData.data.data.connections[0].chat.history[0].id,
//         limit: 200
//       },
//       method: "POST"
//     }).then(data => cb(data.data.data))
//   );
// };

// export const saveToGallery = (idFemale, file, formData) => {
//   const data = new FormData();
//   data.append("key", formData.key);
//   data.append("acl", formData.acl);
//   data.append("Content-Type", "video/mp4");
//   data.append("success_action_status", formData.success_action_status);
//   data.append("x-amz-meta-id_user", formData["x-amz-meta-id_user"]);
//   data.append("x-amz-meta-handler", formData["x-amz-meta-handler"]);
//   data.append("x-amz-meta-uuid", formData["x-amz-meta-uuid"]);
//   data.append("x-amz-meta-type", formData["x-amz-meta-type"]);
//   data.append("x-amz-meta-env-domain", formData["x-amz-meta-env-domain"]);
//   data.append("X-Amz-Credential", formData["X-Amz-Credential"]);
//   data.append("X-Amz-Algorithm", formData["X-Amz-Algorithm"]);
//   data.append("X-Amz-Date", formData["X-Amz-Date"]);
//   data.append("Policy", formData["Policy"]);
//   data.append("X-Amz-Signature", formData["X-Amz-Signature"]);
//   data.append("x-amz-meta-id_mirrors", "m");
//   data.append("file", file);
//   axs({
//     url: "https://vb-video-input.s3.amazonaws.com/",
//     data: data,
//     method: "post"
//   }).then(res => console.log("res", res));
// };

// export const saveUploadedMedia = (idFemale, type) => {
//   const data = { idUser: idFemale, type: type };
//   data["media"] = type === "audio" ? [{ title: "audio.mp3" }] : null;

//   axs({
//     url: "https://api.prime.date/upload/save-mail-media-gallery",
//     data: data,
//     method: "POST"
//   });
// };
