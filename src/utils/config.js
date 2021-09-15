import { API_SERVER_URL } from "../server";
import { getCities } from "./common-utils";
import store from "../redux/store";

//QA Server

const BASE_SERVER_URL = API_SERVER_URL;

// Amazon Server
// const BASE_SERVER_URL = 'http://staging.ticketlake.synavos.com/';

// const BASE_SERVER_URL = 'http://10.44.107.173:8080/';

export const FILE_URL = BASE_SERVER_URL;

const SERVER_API_PREFIX = "api/";
export const SERVER_API_VERSION = "v2";
export default BASE_SERVER_URL;

export const SERVER_URL = BASE_SERVER_URL + SERVER_API_PREFIX;
export const STANDARD_EVENT = "STANDARD";
export const SERIES = "SERIES";
export const RECUR = "RECUR";
export const PAYMENT_RESPONSE_CODE = {
  paymentPending: "00",
  paymentReceived: "01",
};

// Movies URL
export const GET_TRENDING_EVENTS = "/events/fetch-trending-events";
export const GET_SHOWING_IN_CINEMAS_EVENTS =
  "/events/fetch-parent-events-for-consumers";
export const GET_UPCOMING_EVENTS = "/events/fetch-parent-events-for-consumers";
export const GET_NEAR_BY_EVENTS = "/events/fetch-nearby-parent-events";
export const GET_ALL_SUB_CATEGORIES = "/categories/get-all-sub-categories/";
export const GET_SUB_CATEGORY_EVENTS =
  "/events/fetch-parent-events-for-consumers";
export const GET_MOVIE_SLOT_DETAIL = "/events/get-event-slot-details/";

// Cinema URL
export const SHOWING_IN_CINEMAS = "/events/fetch-parent-events-for-consumers";
export const UPCOMING_EVENTS_FOR_CINEMA =
  "/events/fetch-parent-events-for-consumers";
export const PROMOTED_EVENTS_FOR_CINEMA =
  "/events/fetch-parent-events-for-consumers";
export const TRENDING_EVENTS_FOR_CINEMA = "/events/fetch-trending-events";

// Venues URL
export const GET_ALL_VENUE_TYPES = "/venue-types";
export const GET_NEAREST_VENUES = "/venues/get-venues";

// Image URLs
export const MTN_IMG = "/images/network/MTN-SQ.svg";
export const VODA_IMG = "/images/network/voda.svg";
export const AIRTEL_IMG = "/images/network/airtel.svg";
export const GLO_IMG = "/images/network/glo.svg";
export const NETWORK_IMG = "/images/network/sim.svg";
export const CURRENCY_IMG = "/images/currency.svg";
export const currencies = [
  "GHS",
  "USD",
  "CAD",
  "GBP",
  "EUR",
  "AUD",
  "NZD",
  "GIP",
  "GMD",
  "LRD",
  "SLL",
  "ZMW",
  "SDG",
  "NAD",
  "UGX",
  "ZAR",
  "TZS",
  "KES",
  "LSL",
  "MWK",
  "SCR",
  "ERN",
  "RWF",
  "SOS",
];
// API URLs

// WishLists
export const WISHLIST_API_GET_IDS = "/consumers/get-wishlist-eventIds";
export const WISHLIST_API_TOGGLE = "/consumers/add-event-wishlist";
export const GET_WISHLIST_EVENTS = "/consumers/get-wishlist-events";

// Events
export const EVENTS_GET_EVENT_DETAIL = "/events/event-detail/";
export const EVENTS_GET_ALL_PUBLIC = "/events/get-all-events-public";
export const GET_ALL_SLOTS_DATA_OF_EVENT = "/events/get-all-slots-of-event/";

// User
export const USER_UPLOAD_PROFILE_PICTURE = "/consumers/image-upload";
export const USER_LOGIN = "/consumers/login";
export const USER_UPDATE_PROFILE = "/consumers/update-profile";
export const USER_VERIFY = "/consumers/verify";
export const UPDATE_USER = "/consumers/verification";
export const USER_REGISTER = "/consumers/register/";
export const USER_CHECK_OTP = "/consumers/check-otp/";
export const USER_FORGOT_PASSWORD = "/consumers/forgot-password/";
export const USER_GET_ALL_TICKETS = "/tickets/get-my-tickets";
export const USER_TOP_UP_WALLET = "/consumers/topup-balance";
export const USER_VIEW_PROFILE = "/consumers/view-profile";
export const USER_CHANGE_PASSWORD = "/consumers/change-password";
export const USER_PROFILE_INFO = "/consumers/view-profile";
export const CONSUMER_EVENT_TICKETS = "/tickets/consumer-event-tickets";
export const CONSUMER_BASIC_INF0 = "/consumers/get-consumer-basic-info";

// Tickets
export const TICKET_PURCHASE = "/tickets/purchase-ticket-consumer";
export const SEAT_TICKET_PURCHASE = "/tickets/purchase";

// Passes
export const PASSES_GET_SEATS = "/events/get-seats-passSlots";

// Tickets Purchase
export const CLIENT_ID_GET = "";

// Wallet
export const GET_WALLET_TRANSACTION_HISTORY = "/orders/list";

// Checkout
export const SEND_SMS_OTP = "/consumers/send-sms-otp";
export const VERIFY_SMS_OTP = "/consumers/verify-sms-otp";
export const INITIATE_HUBTEL_DIRECT_PAYMENT =
  "/hubtel/hubtel-direct-payment-iniate";

export const DIRECT_PAYMENT_STATUS = "/hubtel/direct-payment-status/";
export const DIRECT_PAYMENT_STATUS_SEATS_IO = "/tickets/hubtel-payment-status/";

export const RAVEPAY_PAYMENT_REQUEST = "/ravepay/request-payment";

//Order
export const GET_ORDER_DETAILS = "/consumers/get-order-details/";

// Calendar
export const GET_USER_CALENDAR_EVENTS = "/consumers/calendar-slots";

// Useful Constants
export const TITLE_SIZE = 25;
export const TICKET_CLASS_REGULAR = "REGULAR";
export const TICKET_CLASS_PASS = "PASS";

// Useful JSON
export const filteredCities = () => {
  let { getState } = store;
  let filteredCities = [];
  let eventsCountry = getState().user.eventsCountry;

  getCities(eventsCountry.label).forEach((data) => {
    filteredCities.push({
      label: data,
      value: data,
    });
  });
  return filteredCities;
};

export const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  easing: true,
  cssEase: "linear",
  focusOnSelect: false,
  className: "center",
  centerMode: true,
  centerPadding: "50px",
  arrows: false,
};

export const buttonSettings = {
  display: true,
  mainPreviousClass: "swiper-button-prev sw-btn",
  previousIcon: "fa fa-arrow-left",
  mainNextClass: "swiper-button-next sw-btn",
  nextIcon: "fa fa-arrow-right",
};

export const movieDetailButtonSettings = {
  display: true,
  mainPreviousClass: "fc-cont movie-detail-arrow lc-prev",
  mainNextClass: "fc-cont movie-detail-arrow lc-next",
  previousIcon: "fa fa-angle-left",
  nextIcon: "fa fa-angle-right",
};

export const getPaypalClientId = () => {
  const { REACT_APP_ENV } = process.env;

  if (["staging", "production"].includes(REACT_APP_ENV.trim().toLowerCase())) {
    return "AVxMDtg2UkfX0IFBK86r_l_EcCeloAcMmOQf7vbOuPQsr10I5QJBf-u4YVn504puI-GyLQ0ZcKRYBG2T";
  } else {
    return "AVxMDtg2UkfX0IFBK86r_l_EcCeloAcMmOQf7vbOuPQsr10I5QJBf-u4YVn504puI-GyLQ0ZcKRYBG2T";
  }
};


export const getSeatsIOPublicKey = () => {
  const { REACT_APP_ENV } = process.env;

  if (["staging", "production"].includes(REACT_APP_ENV.trim().toLowerCase())) {
    return "c51911a0-5cde-456b-a8ab-04738526d45c";
  } else {
    return "c51911a0-5cde-456b-a8ab-04738526d45c";
  }
};
