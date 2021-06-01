import {
  LOGIN,
  FACEBBOOKLOGIN,
  GOOGLELOGIN,
  RESET_USER,
  SAVE_FORM_DATA,
  CONSUMER,
  USER_REGISTRATION,
  LOGOUT,
  PROCESSING,
  VERIFY_USER_ERROR,
  SET_TOKEN_IN_STATE,
  SET_PROFILE_IMAGE,
  SET_PROFILE_DATA,
  USER_AUTHENTICATION,
  ERROR_HANDLING,
  SUCCESS_MESSAGE,
  GET_ALL_TICKETS,
  SET_MESSAGE,
  SET_TOP_UP_AMOUNT,
  SET_CURRENT_STATE_TO_SESSION,
  PROFILE_PICTURE_PROCESSING,
  PAGINATION_PROCESSING,
  SET_TICKET_PAGINATION,
  VERIFY_CODE_ERROR,
  SET_REDIRECT_TO,
  SET_USER_WALLET,
  RESET_REDUX_KEY,
  SET_EVENTS_COUNTRY,
  SET_BACK_URL,
  SET_CONVERTED_CURRENCY,
  FACEBBOOKLOGINDATA,
  GOOGLELOGINDATA,
  SET_USER_PURCHASED_TICKETS,
  SET_CONSUMER_BASIC_INFO,
} from "./user-actions";

const getAuthState = () => {
  const userKey = "user-auth";
  let userState = sessionStorage.getItem(userKey);
  if (userState && userState.length) {
    return JSON.parse(userState);
  }
  return null;
};

const _initState = {
  token: null,
  redirectTo: null,
  userWallet: null,
  authenticated: false,
  userWishList: null,
  message: null,
  profileImage: null,
  error: false,
  formData: null,
  user: null,
  callback: null,
  next: null,
  processing: false,
  profilePictureProcessing: false,
  success: null,
  allTickets: null,
  codeError: null,
  topUpAmount: null,
  paginateProcessing: "",
  ticketPagination: "",
  eventsCountry: { label: "Ghana", countryCode: "GH" },
  isCurrencyConverted: false,
  currencyConversion: {
    from: "",
    to: "",
    givenAmount: 0,
    convertedAmount: 0,
  },
  backUrl: null,
  activeFacebookUser: false,
  activeGoogleUser: false,
  userPurchasedTickets: null,
  consumerBasicInfo: null,
};

const initState = () => {
  const prevState = getAuthState();
  if (!prevState) {
    return { ..._initState };
  }
  return prevState;
};

const reducer = (state = initState(), action) => {
  let newState = { ...state };

  switch (action.type) {
    case LOGIN:
      login(newState, action.payload);
      break;
    case FACEBBOOKLOGIN:
      loginFacebook(newState, action.payload);
      break;
    case GOOGLELOGIN:
      loginGoogle(newState, action.payload);
      break;
    case FACEBBOOKLOGINDATA:
      loginFacebookData(newState, action.payload);
      break;
    case GOOGLELOGINDATA:
      loginGoogleData(newState, action.payload);
      break;
    case SET_PROFILE_IMAGE:
      setProfileImage(newState, action.payload);
      break;
    case SET_PROFILE_DATA:
      setProfileData(newState, action.payload);
      break;
    case CONSUMER:
      setUser(newState, action.payload);
      break;
    case USER_REGISTRATION:
      setUserRegistration(newState, action.payload);
      break;
    case SAVE_FORM_DATA:
      newState.formData = action.payload;
      break;
    case SET_BACK_URL:
      newState.backUrl = action.payload;
      break;
    case RESET_USER:
      resetRedux(newState);
      break;
    case LOGOUT:
      logout(newState);
      break;
    case PROCESSING:
      setProcessing(newState, action.payload);
      break;
    case VERIFY_USER_ERROR:
      verifyUserError(newState, action.payload);
      break;
    case VERIFY_CODE_ERROR:
      verifyCodeError(newState, action.payload);
      break;
    case SUCCESS_MESSAGE:
      successMessage(newState, action.payload);
      break;
    case GET_ALL_TICKETS:
      setAllTickets(newState, action.payload);
      break;
    case SET_TICKET_PAGINATION:
      setTicketPagination(newState, action.payload);
      break;
    case SET_TOKEN_IN_STATE:
      setTokenInState(newState, action.payload);
      break;
    case USER_AUTHENTICATION:
      authenticateUser(newState, action.payload);
      break;
    case ERROR_HANDLING:
      errorHandling(newState, action.payload);
      break;
    case SET_REDIRECT_TO:
      setRedirectTo(newState, action.payload);
      break;
    case SET_USER_WALLET:
      setUserWallet(newState, action.payload);
      break;
    case SET_TOP_UP_AMOUNT:
      setTopUpAmount(newState, action.payload);
      break;
    case SET_CONVERTED_CURRENCY:
      setConvertedCurrency(newState, action.payload);
      break;
    case SET_MESSAGE:
      setMessage(newState, action.payload);
      break;
    case PROFILE_PICTURE_PROCESSING:
      setProfilePictureProcessing(newState, action.payload);
      break;
    case SET_CURRENT_STATE_TO_SESSION:
      setCurrentStateToSession(newState);
      break;
    case PAGINATION_PROCESSING:
      setPaginateProcessing(newState, action.payload);
      break;
    case RESET_REDUX_KEY:
      resetReduxKeys(newState, action.payload);
      break;
    case SET_EVENTS_COUNTRY:
      saveEventsCountry(newState, action.payload);
      break;

    case SET_USER_PURCHASED_TICKETS:
      setUserPurchasedTickets(newState, action.payload);
      break;
    case SET_CONSUMER_BASIC_INFO:
      setConsumerBasicInfo(newState, action.payload);
      break;
    default: {
      return newState;
    }
  }
  return newState;
};

const setCurrentStateToSession = (state) => {
  sessionStorage.setItem("user-auth", JSON.stringify(state));
};
const setTopUpAmount = (state, wallet) => {
  state.topUpAmount = wallet;
};

export const setConvertedCurrency = (state, currencyConversion) => {
  state.isCurrencyConverted = true;
  state.currencyConversion = { ...currencyConversion };
};

const setProfilePictureProcessing = (state, processing) => {
  state.profilePictureProcessing = processing;
};

const setUserWallet = (state, wallet) => {
  state.userWallet = wallet;
};

const authenticateUser = (state, user) => {
  state.user = user;
  if (!state.error) {
    state.authenticated = true;
    sessionStorage.setItem("user-auth", JSON.stringify(state));
  }
};

const setMessage = (state, message) => {
  state.message = message;
};
const errorHandling = (state, errors) => {
  state.error = errors.error;
  state.message = errors.errorMessage;
};

const setTokenInState = (state, args) => {
  state.token = args;
};

const setAllTickets = (state, data) => {
  if (!Array.isArray(data && data.data)) {
    console.error("Ticket data is invalid of type");
  }
  if (data && data.resetTicket === true) {
    state.allTickets = null;
    if (state.allTickets === null) {
      state.allTickets = data && data.data;
    }
  } else if (data) {
    state.allTickets = [...state.allTickets, ...data.data];
  }
};

const setTicketPagination = (state, data) => {
  state.ticketPagination = data;
};

const loginFacebook = (state, data) => {
  state.activeFacebookUser = data;
};
const loginGoogle = (state, data) => {
  state.activeGoogleUser = data;
};
const loginFacebookData = (state, data) => {
  localStorage.setItem("fbLoacalData", JSON.stringify(data));
  state.activeFacebookUserData = data;
};
const loginGoogleData = (state, data) => {
  localStorage.setItem("googleLoacalData", JSON.stringify(data));
  state.activeGoogleUserData = data;
};

const login = (state, data) => {
  state.activeUser = data;
  state.error = data.error;

  if (!state.error) {
    state.authenticated = true;
    sessionStorage.setItem("user-auth", JSON.stringify(state));
  }
};

const setRedirectTo = (state, url) => {
  state.redirectTo = url;
};

const setUserRegistration = (state, user) => {
  state.callback = user.data.callback;
  state.next = user.data.next;
};

const verifyUserError = (state, user) => {
  state.error = user;
};

const verifyCodeError = (state, user) => {
  state.codeError = user;
};

const successMessage = (state, data) => {
  state.success = data;
};

const setUser = (state, user) => {
  if (user) {
    state.user = { ...user };
    state.error = user._error;
  } else {
    state.user = null;
  }
};

const resetRedux = (state) => {
  state.formData = null;
  state.error = false;
};

const setProfileImage = (state, profileImage) => {
  if (profileImage) {
    state.profileImage = profileImage;
  } else {
    state.profileImage = "/images/default-dp.png";
  }
  // state.profilePictureProcessing = false;
  // sessionStorage.setItem('user-auth', JSON.stringify(state));
};
const setProfileData = (state, data) => {
  state.profileData = data;
};

const logout = (state) => {
  sessionStorage.removeItem("user-auth");
  state.user = null;
  state.authenticated = false;
  state.activeUser = null;
  state.error = false;
  state.message = null;
  state.token = null;
  state.redirectTo = null;
  state.userWallet = null;
};

const resetReduxKeys = (state, key) => {
  if (key === "error" || key === "authenticated") {
    state[key] = false;
  } else {
    state[key] = null;
  }
};
const setProcessing = (state, processing) => {
  state.processing = processing;
  state.isCurrencyConverted = false;
};

const setPaginateProcessing = (state, data) => {
  state.paginateProcessing = data;
};

const saveEventsCountry = (state, selectedCountry) => {
  state.eventsCountry = { ...selectedCountry };
  sessionStorage.setItem("user-auth", JSON.stringify(state));
};

const setUserPurchasedTickets = (state, data) => {
  state.userPurchasedTickets = data;
};
const setConsumerBasicInfo = (state, data) => {
  state.consumerBasicInfo = data;
};

export default reducer;
