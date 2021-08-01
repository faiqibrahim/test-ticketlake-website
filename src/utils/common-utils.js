// library
import moment from "moment";
import _ from "lodash";
import store from "../redux/store";
import { seatSessionKey } from "./constant";

export const NOTIFICATION_TIME = 3000;
export const getObjectValue = (obj, path) => {
  let val = null;

  if (path.indexOf(".") > -1) {
    let paths = path.split(".");
    val = obj;
    paths.forEach((_path) => {
      val = val[_path];
    });
  } else {
    val = obj[path];
  }

  return val;
};

export const nameSplitter = (name) => {
  let nameSplitter = name.split(" ");
  return nameSplitter[0];
};

export const dateSplitter = (date) => {
  let newDate = moment(date).format();
  let dateSplitter = newDate.split("T");
  return dateSplitter[0];
};

export const timeSplitter = (date) => {
  let newDate = moment(date).format();
  let dateSplitter = newDate.split("T");
  return dateSplitter[1];
};

export const getTimeFromISO = (iso) => {
  return moment(iso).format("LT");
};

export const getDateFromISO = (iso) => {
  return moment(iso).format("LL");
};

export const getDayFromISO = (iso) => {
  return moment(iso).format("dddd");
};

export const getDateAndTimeFromIso = (iso) => {
  return moment(iso).format("LLL");
};

export const getMaxAndMinPrice = (arr) => {
  if (!arr.parentEventInfo) {
    return "Get Now";
  } else {
    const currency = arr.parentEventInfo && arr.parentEventInfo.currency;
    const prices = [];
    _.forEach(arr.ticketClasses, (item) => {
      prices.push(item.ticketClassPrice);
    });
    const max = _.max(prices);
    const min = _.min(prices);
    if (max && currency) {
      if (max === min) {
        return currency + max;
      } else {
        if (min === 0) {
          return min;
        } else {
          return currency + min + " - " + currency + max;
        }
      }
    } else if (min === 0) {
      return min;
    }
  }
};

export const getCardDates = (dateSlots) => {
  return (
    moment(dateSlots.eventStartTime).format("ll") +
    " - " +
    moment(dateSlots.eventEndTime).format("ll")
  );
};

export const isUndefined = (obj) => {
  return typeof obj === "undefined";
};

export const isNullOrEmpty = (val) => {
  return val === undefined || val === null || val.length <= 0;
};

export const getCountries = () => {
  const countries = require("./countries");
  return _.keys(countries).sort();
};

export const getCities = (country) => {
  const countries = require("./countries");
  let cities = countries[country];
  if (cities) {
    return countries[country].sort();
  } else {
    return [];
  }
};

export const getRandom = (arr, n) => {
  if (n > arr.length) {
    return arr;
  }
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export const getTicketsCount = (allTickets, self = true) => {
  return (
    allTickets && allTickets.filter((ticket) => ticket.self === self).length
  );
};

export const capitalize = (text) => {
  if (typeof text !== "string") return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

/****************** Check quantity of bill summary *********************/
export const hasTicketsQuantity = () => {
  let { getState } = store;

  let { billSummary } = getState().ticket;

  return Boolean(billSummary.find((bill) => bill.ticketClassQty > 0));
};

export const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    let radlat1 = (Math.PI * lat1) / 180;
    let radlat2 = (Math.PI * lat2) / 180;
    let theta = lon1 - lon2;
    let radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }

    return Math.trunc(dist);
  }
};

export const getMovieCategoryID = (array) => {
  if (array && array.length > 0) {
    for (let i = 0; i <= array.length; i++) {
      if (
        array[i].name
          .toLowerCase()
          .includes(("movie" || "movies").toLowerCase())
      ) {
        return array[i]._id;
      }
    }
  }
};

export const isCustomEvent = (event) => {
  const { parentEventInfo } = event;
  return parentEventInfo.customSeatingPlan;
};

export const getPrices = (filteredData) => {
  const lookup = {};
  const prices = [];
  filteredData.forEach((item) => {
    const { ticketClassName, ticketClassPrice } = item;

    if (!(ticketClassName in lookup)) {
      lookup[ticketClassName] = 1;
      prices.push({ category: ticketClassName, price: ticketClassPrice });
    }
  });

  return prices;
};

export const getVenuePrices = (type, classData) => {
  if (!classData || !type) return [];

  if (type === "ticket") {
    const ticketClasses = classData.filter(
      (item) => item.ticketClassType !== "PASS" && item.availableTickets
    );
    return getPrices(ticketClasses);
  } else {
    const passClasses = classData.filter(
      (item) => item.ticketClassType === "PASS" && item.availableTickets
    );
    return getPrices(passClasses);
  }
};

export const getSeatCheckoutProps = (assignedSeats, event) => {
  const seats = [...assignedSeats];

  seats.forEach((seat) => {
    delete seat.ticketClassType;
    delete seat.uniqueId;
    seat.self && delete seat.userInfo;
  });

  const { holdToken } = JSON.parse(sessionStorage.getItem(seatSessionKey));
  const { data: eventDetail } = event.data;

  return {
    eventId: eventDetail._id,
    holdToken,
    tickets: [...seats],
  };
};
