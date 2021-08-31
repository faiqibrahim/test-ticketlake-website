// Axios
import axios from "../../utils/axios";
import AxiosGlobal from "axios";
// URLs
import {
  SERVER_URL,
  USER_UPLOAD_PROFILE_PICTURE,
  USER_LOGIN,
  USER_UPDATE_PROFILE,
  USER_VERIFY,
  USER_REGISTER,
  USER_CHECK_OTP,
  USER_FORGOT_PASSWORD,
  USER_GET_ALL_TICKETS,
  USER_TOP_UP_WALLET,
  USER_VIEW_PROFILE,
  UPDATE_USER,
  USER_CHANGE_PASSWORD,
  USER_PROFILE_INFO,
  GET_USER_CALENDAR_EVENTS,
  CONSUMER_EVENT_TICKETS,
  CONSUMER_BASIC_INF0,
} from "../../utils/config";

// Library
import { NotificationManager } from "react-notifications";

// Redux Actions
import { addWishListIds, resetWishListIds } from "../wishlist/wishlist-actions";
import { handleError } from "../../utils/store-utils";
import { NOTIFICATION_TIME } from "../../utils/common-utils";
// Actions
export const LOGIN = "ACTION_AUTH_LOGIN";
export const FACEBBOOKLOGIN = "ACTION_FACEBOOK_AUTH_LOGIN";
export const GOOGLELOGIN = "ACTION_GOOGLE_AUTH_LOGIN";
export const FACEBBOOKLOGINDATA = "ACTION_FACEBOOK_AUTH_LOGIN_DATA";
export const GOOGLELOGINDATA = "ACTION_GOOGLE_AUTH_LOGIN_DATA";
export const CONSUMER = "ACTION_CONSUMER";
export const SAVE_FORM_DATA = "ACTION_SAVE_FORM_DATA";
export const USER_REGISTRATION = "ACTION_USER_REGISTRATION";
export const RESET_USER = "ACTION_RESET_USER";
export const LOGOUT = "ACTION_AUTH_LOGOUT";
export const PAGINATION_PROCESSING = "ACTION_PAGINATION_PROCESSING";
export const PROCESSING = "ACTION_PROCESSING";
export const VERIFY_USER_ERROR = "ACTION_VERIFY_USER_ERROR";
export const SET_PROFILE_IMAGE = "ACTION_SET_PROFILE_IMAGE";
export const SET_PROFILE_DATA = "ACTION_SET_PROFILE_DATA";
export const SET_TOKEN_IN_STATE = "ACTION_SET_TOKEN_IN_STATE";
export const USER_AUTHENTICATION = "ACTION_USER_AUTHENTICATION";
export const ERROR_HANDLING = "ACTION_USER_ERROR_HANDLING";
export const SUCCESS_MESSAGE = "ACTION_SUCCESS_MESSAGE";
export const GET_ALL_TICKETS = "ACTION_GET_ALL_TICKETS";
export const VERIFY_CODE_ERROR = "ACTION_VERIFY_CODE_ERROR";
export const SET_REDIRECT_TO = "ACTION_SET_REDIRECT_TO";
export const SET_USER_WALLET = "ACTION_SET_USER_WALLET";
export const SET_TOP_UP_AMOUNT = "ACTION_SET_TOP_UP_AMOUNT";
export const SET_MESSAGE = "ACTION_SET_USER_MESSAGE";
export const PROFILE_PICTURE_PROCESSING = "ACTION_PROFILE_PICTURE_PROCESSING";
export const SET_CURRENT_STATE_TO_SESSION =
  "ACTION_SET_CURRENT_STATE_TO_SESSION";
export const SET_TICKET_PAGINATION = "ACTION_SET_TICKET_PAGINATION";
export const RESET_REDUX_KEY = "ACTION_RESET_REDUX_KEY";
export const SET_EVENTS_COUNTRY = "ACTION_SET_EVENTS_COUNTRY";
export const SET_BACK_URL = "ACTION_SET_BACK_URL";
export const SET_CONVERTED_CURRENCY = "ACTION_SET_CONVERTED_CURRENCY";
export const SET_USER_PURCHASED_TICKETS = "SET_USER_PURCHASED_TICKETS";
export const SET_CONSUMER_BASIC_INFO = "SET_CONSUMER_BASIC_INFO";

export const setCurrentStateToSession = () => {
  return {
    type: SET_CURRENT_STATE_TO_SESSION,
    payload: null,
  };
};
export const setProfilePictureProcessing = (processing) => {
  return {
    type: PROFILE_PICTURE_PROCESSING,
    payload: processing,
  };
};
export const setMessage = (message) => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};
export const setTopUpAmount = (wallet) => {
  return {
    type: SET_TOP_UP_AMOUNT,
    payload: wallet,
  };
};

export const setConvertedCurrency = (currencyConversion) => {
  return {
    type: SET_CONVERTED_CURRENCY,
    payload: currencyConversion,
  };
};

export const setUserWallet = (wallet) => {
  return {
    type: SET_USER_WALLET,
    payload: wallet,
  };
};

export const setRedirectTo = (url) => {
  return {
    type: SET_REDIRECT_TO,
    payload: url,
  };
};

const authenticateUser = (user) => {
  return {
    type: USER_AUTHENTICATION,
    payload: user,
  };
};

export const errorHandling = (error, message) => {
  return {
    type: ERROR_HANDLING,
    payload: {
      error: error,
      errorMessage: message,
    },
  };
};
const setTokenInState = (token) => {
  return {
    type: SET_TOKEN_IN_STATE,
    payload: token,
  };
};
export const resetRedux = () => {
  return {
    type: RESET_USER,
  };
};

export const resetReduxKey = (key) => {
  return {
    type: RESET_REDUX_KEY,
    payload: key,
  };
};

export const saveFormData = (data) => {
  return {
    type: SAVE_FORM_DATA,
    payload: data,
  };
};

export const setProcessing = (processing) => {
  return {
    type: PROCESSING,
    payload: processing,
  };
};

const setProfileImage = (payload) => {
  return {
    type: SET_PROFILE_IMAGE,
    payload: payload,
  };
};
const setProfileData = (payload) => {
  return {
    type: SET_PROFILE_DATA,
    payload: payload,
  };
};

const _setUserRegistration = (payload) => {
  return {
    type: USER_REGISTRATION,
    payload,
  };
};

export const setUserRegistration = (data) => {
  return (dispatch) => {
    dispatch(_setUserRegistration({ data }));
  };
};

const _verifyUserError = (payload) => {
  return {
    type: VERIFY_USER_ERROR,
    payload,
  };
};

const _verifyCodesError = (payload) => {
  return {
    type: VERIFY_CODE_ERROR,
    payload,
  };
};

export const setProfile = (user) => {
  return (dispatch) => {
    dispatch(authenticateUser(user.data));
  };
};

const setPaginationProcessing = (processing) => {
  return {
    type: PAGINATION_PROCESSING,
    payload: processing,
  };
};
const authenticateFacebookUser = (status) => {
  return {
    type: FACEBBOOKLOGIN,
    payload: status,
  };
};
const authenticateGoogleUser = (status) => {
  return {
    type: GOOGLELOGIN,
    payload: status,
  };
};
const loginFacebookDataSet = (status) => {
  return {
    type: FACEBBOOKLOGINDATA,
    payload: status,
  };
};
const loginGoogleDataSet = (status) => {
  return {
    type: GOOGLELOGINDATA,
    payload: status,
  };
};

export const setEventsCountry = (countryCode) => {
  return {
    type: SET_EVENTS_COUNTRY,
    payload: countryCode,
  };
};

export const saveBackUrl = (backUrl) => {
  return {
    type: SET_BACK_URL,
    payload: backUrl,
  };
};
export const forgotPassword = (formdata, errorCallback) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    axios
      .get(USER_FORGOT_PASSWORD + formdata)
      .then((response) => {
        dispatch(setProcessing(false));
        dispatch({
          type: SUCCESS_MESSAGE,
          payload: response.data._message,
        });
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
        dispatch(setProcessing(false));
      });
  };
};

export const setProfilePic = (formData, userToken) => {
  return (dispatch) => {
    dispatch(setProfilePictureProcessing(true));
    axios
      .post(USER_UPLOAD_PROFILE_PICTURE, formData)
      .then((response) => {
        dispatch(setProfileImage(response.data));
        dispatch(setProfilePictureProcessing(false));
      })
      .catch((err) => {
        console.error("err", err);

        // NotificationManager.error(err.response.data._error, '', 3000);
        dispatch(setProfilePictureProcessing(false));
      });
  };
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    AxiosGlobal.post(SERVER_URL + "v1" + USER_LOGIN, { email, password })
      .then((response) => {
        dispatch(setProcessing(false));
        dispatch(errorHandling(false, null));
        const { data } = response;
        if (typeof data.consumer.profileImageKey !== "undefined") {
          dispatch(setProfileImage(data.consumer.profileImageKey));
        } else {
          dispatch(setProfileImage(null));
        }
        dispatch(setUserWallet(data.consumer && data.consumer.consumerWallet));
        dispatch(addWishListIds(data.consumer && data.consumer.eventSlotIds));

        //NotificationManager.success(data._message, '', 3000);

        dispatch(setTokenInState(response.headers["x-auth"]));

        dispatch(authenticateUser(data.consumer));
      })
      .catch((err) => {
        let errorMessage = handleError(err);

        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
        dispatch(setProcessing(false));
      });
  };
};

export const loginFacebook = (status, data) => {
  return (dispatch) => {
    dispatch(authenticateFacebookUser(status));
    dispatch(setTokenInState(data["X-Auth"]));
    dispatch(authenticateUser(data.consumer));
  };
};

export const loginGoogle = (status, data) => {
  return (dispatch) => {
    dispatch(authenticateGoogleUser(status));
    dispatch(setTokenInState(data.headers["x-auth"]));
    dispatch(authenticateUser(data.data.consumer));
  };
};

export const loginFacebookData = (status) => {
  return (dispatch) => {
    dispatch(loginFacebookDataSet(status));
  };
};

export const loginGoogleData = (status) => {
  return (dispatch) => {
    dispatch(loginGoogleDataSet(status));
  };
};

const updateUserProfile = (verificationCode, cb, errorCallback) => {
  return (dispatch, getState) => {
    dispatch(setProcessing(true));

    const data = { ...getState().user.formData };

    if (verificationCode !== "NOT_REQUIRED") {
      data.verificationCode = verificationCode;
    }

    if (Object.keys(data.profileImageKey).length === 0) {
      delete data.profileImageKey;
    }

    axios
      .put(USER_UPDATE_PROFILE, data)
      .then((response) => {
        dispatch(setProcessing(false));
        if (typeof response.data.data.profileImageKey !== "undefined") {
          dispatch(setProfileImage(response.data.data.profileImageKey));
        } else {
          dispatch(setProfileImage(null));
        }
        dispatch(setProfile(response.data));

        NotificationManager.success("Profile Updated Successfully!", "", 3000);
        cb && cb();
      })
      .catch((err) => {
        errorCallback &&
          errorCallback(
            err.response && err.response.data && err.response.data._error
          );
        dispatch(setProcessing(false));
      });
  };
};

export const updateUser = (callback, cb, errorCallback) => {
  return (dispatch, getState) => {
    dispatch(setProcessing(true));

    const { user, formData } = getState().user;
    const { email, phoneNumber } = formData;

    const isVerificationRequired = (user) =>
      user.email !== email || user.phoneNumber !== phoneNumber;

    const loginAxios = isVerificationRequired(user)
      ? axios.post(UPDATE_USER, {
          email,
          phoneNumber,
        })
      : Promise.resolve({ data: { verificationCode: "NOT_REQUIRED" } });

    loginAxios
      .then((response) => {
        let {
          verificationCode,
          _id,
          emailVerificationRequired,
          smsVerificationRequired,
        } = response.data;

        if (
          emailVerificationRequired === false &&
          smsVerificationRequired === false
        ) {
          dispatch(updateUserProfile("NOT_REQUIRED", cb, errorCallback));
        }

        if (verificationCode) {
          dispatch(updateUserProfile(verificationCode, cb, errorCallback));
        } else {
          dispatch(
            setUserRegistration({ callback: cb, next: updateUserProfile })
          );

          callback &&
            callback({
              emailVerificationRequired,
              smsVerificationRequired,
              _id,
            });
          dispatch(setProcessing(false));
        }
      })
      .catch((err) => {
        dispatch(
          _verifyUserError(
            err.response && err.response.data ? err.response.data._error : ""
          )
        );
        errorCallback &&
          errorCallback(
            err.response && err.response.data ? err.response.data._error : ""
          );
        dispatch(setProcessing(false));
      });
  };
};

export const verifyUser = (callback, cb, errorCallback) => {
  return (dispatch, getState) => {
    dispatch(setProcessing(true));

    let { email, phoneNumber } = getState().user.formData;

    AxiosGlobal.post(SERVER_URL + "v1" + USER_VERIFY, { email, phoneNumber })
      .then((response) => {
        let {
          verificationCode,
          _id,
          emailVerificationRequired,
          smsVerificationRequired,
        } = response.data;

        if (verificationCode) {
          dispatch(register(verificationCode, cb, errorCallback));
        } else {
          dispatch(setUserRegistration({ callback: cb, next: register }));

          callback &&
            callback({
              emailVerificationRequired,
              smsVerificationRequired,
              _id,
            });
          dispatch(setProcessing(false));
        }
      })
      .catch((err) => {
        dispatch(
          _verifyUserError(
            err.response && err.response.data ? err.response.data._error : ""
          )
        );
        let errorMessage = handleError(err);
        if (Array.isArray(errorMessage)) {
          NotificationManager.error(
            errorMessage.join(", "),
            " ",
            NOTIFICATION_TIME
          );
        } else {
          NotificationManager.error(errorMessage, " ", NOTIFICATION_TIME);
        }
        errorCallback &&
          errorCallback(err.response && err.response.data._error);
        dispatch(setProcessing(false));
      });
  };
};

const register = (verificationCode, callback, errorCallback) => {
  return (dispatch, getState) => {
    const { formData } = getState().user;
    let { password } = getState().user.formData;
    dispatch(setProcessing(true));
    axios
      .post(USER_REGISTER + verificationCode, formData)
      .then((response) => {
        const { consumer } = response.data;
        const jwt = response.headers["x-auth"];

        if (consumer && jwt) {
          dispatch(login(consumer.email, password));
        }

        callback && callback();
        dispatch(setProcessing(false));
      })
      .catch((err) => {
        errorCallback && errorCallback({ _error: "Error" });
        dispatch(setProcessing(false));
      });
  };
};

export const verifyCodes = (codes, _id, next, callback, errCallback) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    axios
      .post(USER_CHECK_OTP + _id, codes)
      .then((response) => {
        let { verificationCode } = response.data;

        dispatch(next(verificationCode, callback, errCallback));
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        dispatch(_verifyCodesError(errorMessage));
        // NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);

        errCallback && errCallback(errorMessage);
        dispatch(setProcessing(false));
      });
  };
};

export const getAllTickets = (self, status, page, pageSize, resetTicket) => {
  if (page === undefined && pageSize === undefined) {
    page = 1;
    pageSize = 10;
  }

  const paginate = true;

  return (dispatch) => {
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setProcessing(true));
    }

    let axiosPromise = null;

    if (self === true) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=true"
      );
    }

    if (self === true && status === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=false&self=true"
      );
    }

    if (self === true && status === true) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=true"
      );
    }

    if (self === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=false"
      );
    }

    if (self === false && status === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=false&self=false"
      );
    }

    if (self === false && status === true) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=false"
      );
    }

    if (status === true && self === "") {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true"
      );
    }

    if (status === true && self === true) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=true"
      );
    }

    if (status === true && self === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true&self=false"
      );
    }

    if (status === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=false"
      );
    }

    if (self === "" && status === "") {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=true"
      );
    }

    if (self === "" && status === false) {
      axiosPromise = axios.get(
        USER_GET_ALL_TICKETS +
          "?paginate=" +
          paginate +
          "&page=" +
          page +
          "&pageSize=" +
          pageSize +
          "&upcoming=false"
      );
    }

    axiosPromise
      .then((response) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        const { data } = response.data;

        dispatch({
          type: GET_ALL_TICKETS,
          payload: { data, resetTicket },
        });
        dispatch({
          type: SET_TICKET_PAGINATION,
          payload: response.data,
        });
      })
      .catch((err) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        dispatch({
          type: GET_ALL_TICKETS,
          payload: null,
        });
      });
  };
};

export const userWalletTopUp = (amount, nonce) => {
  var newConversionRates = JSON.parse(localStorage.getItem("conversionRates"));
  // newConversionRates.push(localStorage.getItem("conversionRates"))

  var conversionRatesGivenAmount = localStorage.getItem(
    "conversionRatesGivenAmount"
  );
  // conversionRatesGivenAmount = parseInt(conversionRatesGivenAmount)
  // newConversionRates.push(localStorage.getItem("conversionRates"))

  return (dispatch) => {
    dispatch(setMessage(null));
    dispatch(setProcessing(true));

    axios
      .post(USER_TOP_UP_WALLET, {
        balance: parseFloat(conversionRatesGivenAmount),
        paymentNonce: nonce,
        conversionDetails: newConversionRates,
      })
      .then((res) => {
        dispatch(setTopUpAmount(0));
        dispatch(setMessage(res.data._message));
        dispatch(setUserWallet(res.data.data.consumerWallet));
        dispatch(setProcessing(false));
        dispatch(setCurrentStateToSession());
      })
      .catch((err) => {
        console.error(err);
        dispatch(setProcessing(false));
      });
  };
};

export const userViewProfile = () => {
  return (dispatch) => {
    axios
      .get(USER_VIEW_PROFILE)
      .then((response) => {
        const { data } = response.data;
        if (typeof data.profileImageKey !== "undefined") {
          dispatch(setProfileImage(data.profileImageKey));
        } else {
          dispatch(setProfileImage(null));
        }
        dispatch(setUserWallet(data.consumerWallet));
        dispatch(addWishListIds(data.eventSlotIds));

        dispatch(authenticateUser(data));
        dispatch(setCurrentStateToSession());
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };
};

export const changeConsumerPassword = (existingPassword, newPassword) => {
  return (dispatch) => {
    dispatch(setProcessing(true));

    axios
      .put(USER_CHANGE_PASSWORD, { existingPassword, newPassword })
      .then((response) => {
        dispatch(setProcessing(false));

        NotificationManager.success("Password Updated Successfully!", "", 3000);
      })
      .catch((err) => {
        //err && err.response && err.response.data && err.response.data._error
        NotificationManager.error("Invalid Existing Password", "", 3000);
        dispatch(setProcessing(false));
      });
  };
};

export const logout = (cb) => {
  return (dispatch) => {
    dispatch(setProfileImage(null));
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    dispatch(resetWishListIds());
    cb && cb();
  };
};

export const fetchUserProfile = () => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    axios
      .get(USER_PROFILE_INFO)
      .then((response) => {
        dispatch(setProcessing(false));
        let { consumerWallet } = response.data.data;
        dispatch(setUserWallet(consumerWallet));
        dispatch(setProfileData(response.data.data));
      })
      .catch((err) => {
        dispatch(setProcessing(false));
      });
  };
};

export const resendOtp = () => {
  return (dispatch) => {
    dispatch(setProcessing(true));

    axios
      .get(USER_PROFILE_INFO)
      .then((response) => {
        dispatch(setProcessing(false));
        let { consumerWallet } = response.data.data;
        dispatch(setUserWallet(consumerWallet));
      })
      .catch((err) => {
        //err && err.response && err.response.data && err.response.data._error
        dispatch(setProcessing(false));
      });
  };
};

export const getConversion = ({ from = "GHS", to = "USD", amount = 1 }) => {
  return (dispatch) => {
    dispatch(setProcessing(true));

    const url = `/currency/get-conversion?from=${from}&to=${to}&amount=${amount}`;
    axios
      .get(url)
      .then(({ data: { data } }) => {
        dispatch(setProcessing(false));
        /**
         * Local Storage is kept keeping in view the
         * existing code (legacy) to avoid breaking any code.
         */
        localStorage.setItem("conversionRates", JSON.stringify(data));
        localStorage.setItem(
          "conversionRatesGivenAmount",
          JSON.stringify(data.givenAmount)
        );
        const currencyConversion = {
          from: data.currencyConvertFrom,
          to: data.currencyConvertTo,
          givenAmount: data.givenAmount,
          convertedAmount: data.convertedAmount,
        };
        dispatch(setConvertedCurrency(currencyConversion));
      })
      .catch((err) => {
        dispatch(setProcessing(false));
        console.error("Conversion Rates Error::", err);
      });
  };
};

export const getCalendarEvents = (
  fromDate = null,
  toDate = null,
  saveCallback
) => {
  let data = {
    paginate: true,
    page: 1,
    skip: 0,
    pageSize: "",
  };

  if (fromDate && toDate) {
    data.from = fromDate;
    data.to = toDate;
  }

  return (dispatch) => {
    dispatch(setProcessing(true));
    axios
      .post(GET_USER_CALENDAR_EVENTS, data, "v2")
      .then((response) => {
        const data = response.data && response.data.data;
        dispatch(setProcessing(false));
        saveCallback(data);
      })
      .catch((err) => {
        dispatch(setProcessing(false));
        let error =
          err.response && err.response.data && err.response.data._error;
        console.error(error);
      });
  };
};

export const setUserPurchasedTickets = (eventId, callback) => {
  let data = {
    eventId: eventId,
  };
  return (dispatch) => {
    axios
      .post(CONSUMER_EVENT_TICKETS, data)
      .then((response) => {
        let data = response.data && response.data.data;
        callback && callback(data);
        dispatch(_setUserPurchasedTickets(data));
      })
      .catch((err) => {
        let error =
          err.response && err.response.data && err.response.data._error;
        console.error(error);
      });
  };
};

export const getConsumerBasicInfo = (phoneNumber, resultCallback) => {
  phoneNumber = phoneNumber.replace(" ", "");
  phoneNumber = phoneNumber.replace("-", "");
  phoneNumber = phoneNumber.replace("+", "");
  axios
    .get(`${CONSUMER_BASIC_INF0}/?phoneNumber=%2B${phoneNumber}`)
    .then((response) => {
      let data = response && response.data;
      resultCallback && resultCallback(data);
    })
    .catch((err) => {
      let error = err.response && err.response.data && err.response.data._error;
      console.error(error);
    });
};

// const setConsumerBasicInfo = (payload) => {
//     return {
//         type: SET_CONSUMER_BASIC_INFO,
//         payload
//     }
// };

const _setUserPurchasedTickets = (payload) => {
  return {
    type: SET_USER_PURCHASED_TICKETS,
    payload,
  };
};
