const axios = require("axios");

const axs = axios.create({
  baseURL: "https://api.prime.date",
  mode: "cors",
  withCredentials: true,
  referrer: "https://prime.date/",
  "X-Remote-IP": "127.0.0.1",
  referrerPolicy: "no-referrer-when-downgrade",
  headers: { accept: "application/json", "content-type": "application/json" }
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
  axs({ url: "/operator/find-females", method: "POST" }).then(data =>
    cb(data.data.data.list[0])
  );

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
    url: `/statistic/operator?dateFrom=${todayDate.year}-${todayDate.month}-${
      todayDate.day
    }&dateTo=${tomorrowDate.year}-${tomorrowDate.month}-${
      tomorrowDate.day
    }&groupByDate=0`,
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
    url: "https://api.prime.date/system/dictionary?dictionary=3,4,5,6,7,8,9,17",
    method: "GET"
  }).then(data => cb(data.data.data));

export const getMale = (id, cb) =>
  axs({
    url: `https://api.prime.date/operator/get-male/${id}`,
    method: "POST"
  }).then(data => cb(data.data.data));

export const setOffline = id =>
  axs({
    url: "https://api.prime.date/female/online",
    data: { userIds: [id], state: 2 },
    method: "POST"
  });
