// Actions
import {
  MOVE_STEP,
  PROCESSING,
  SET_EVENT,
  SET_SEATS,
  SETTING_BILL_SUMMARY,
  SET_TOTAL_BILL,
  SET_ASSIGNED_SEATS,
  SET_PAYMENT_SUCCESS,
  RESET_REDUX,
  SET_TICKET_CURRENCY,
  ASSINGED_SEATS_FLAG,
  ASSIGNED_SEATS_FOR_DISPLAY,
  SET_CLIENT_TOKEN,
  SET_ERROR,
  SET_ERROR_MESSAGE,
  SET_ASSIGNED_PASS,
  SET_PASSES_DATA,
  SET_PASSES_SEATS,
  SET_PASSES_ASSIGNED_SEATS,
  SET_PASSES_ASSIGNED_SEATS_FOR_DISPLAY,
  SET_PASSES_TICKET_CLASSES,
  SET_COUPONS_VALUE,
  RESET_COUPON_VALUE,
  SET_COUPON_PROCESSING,
  VERIFICATION_CREDENTIALS,
  Phone_N_HUBTEL_CHANNEL,
  SET_SPLIT_PAYMENT,
  SHOW_CHECKOUT_DIALOGUE,
  SET_ORDER_DETAILS,
  SAVE_ORDER_ITEM_DETAILS,
  MAINTAIN_CHECKOUT_DATA,
  SET_RAVEPAY_RESPONSE,
  RETRY_PAYMENT_PROCESS,
} from "./ticket-actions";

const initialState = {
  step: 1,
  event: null,
  seatsAssignedFlag: false,
  passesAssignedFlag: false,
  ticketCurrency: null,
  seats: null,
  assignedSeats: null,
  billSummary: [],
  allGood: true,
  totalBill: 0,
  assignedSeatsForDisplay: null,
  processing: false,
  successfulPayment: false,
  clientToken: null,
  error: false,
  errorMessage: null,
  passData: null,
  passTicketClasses: null,
  passesSeats: null,
  passesAssignedSeats: null,
  passesAssignedSeatsForDisplay: null,
  couponValue: 0,
  hubtelResponse: [],
  couponProcessing: false,
  verificationCredentials: {},
  phoneNhubtelChannel: "",
  splitPayment: false,
  orderItemDetails: "",
  orderDetails: "",
  maintainCheckoutData: "",
  retryPaymentProcess: false,
  ravePayResponse: null,
};

const reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_COUPONS_VALUE:
      setCouponValue(newState, action.payload);
      break;
    case PROCESSING:
      setProcessing(newState, action.payload);
      break;
    case SET_COUPON_PROCESSING:
      setCouponValidationProcessing(newState, action.payload);
      break;
    case MOVE_STEP:
      setStep(newState, action.payload);
      break;
    case SETTING_BILL_SUMMARY:
      settingBillSummary(newState, action.payload);
      break;
    case SET_EVENT:
      setEvent(newState, action.payload);
      break;
    case SET_SEATS:
      setSeats(newState, action.payload);
      break;
    case SET_ASSIGNED_SEATS:
      setAssignedSeats(newState, action.payload);
      break;
    case SET_ASSIGNED_PASS:
      passesAssignedSeats(newState, action.payload);
      break;
    case SET_TOTAL_BILL:
      setTotalBill(newState, action.payload);
      break;
    case SET_PAYMENT_SUCCESS:
      setPaymentSuccess(newState, action.payload);
      break;
    case SET_TICKET_CURRENCY:
      setTicketCurrency(newState, action.payload);
      break;
    case ASSIGNED_SEATS_FOR_DISPLAY:
      setAssignedSeatsForDisplay(newState, action.payload);
      break;
    case RESET_REDUX:
      resetRedux(newState);
      break;
    case ASSINGED_SEATS_FLAG:
      setAssignedSeatsFlag(newState, action.payload);
      break;
    case SET_CLIENT_TOKEN:
      setClientToken(newState, action.payload);
      break;
    case SET_ERROR:
      setError(newState, action.payload);
      break;
    case SET_ERROR_MESSAGE:
      setErrorMessage(newState, action.payload);
      break;
    case SET_PASSES_DATA:
      setPassData(newState, action.payload);
      break;
    case SET_PASSES_SEATS:
      setPassesSeats(newState, action.payload);
      break;
    case SET_PASSES_ASSIGNED_SEATS:
      setPassesAssignedSeats(newState, action.payload);
      break;
    case SET_PASSES_ASSIGNED_SEATS_FOR_DISPLAY:
      setPassesAssignedSeatsForDisplay(newState, action.payload);
      break;
    case SET_PASSES_TICKET_CLASSES:
      setPassTicketClasses(newState, action.payload);
      break;
    case VERIFICATION_CREDENTIALS:
      setVerificationCredentials(newState, action.payload);
      break;
    case Phone_N_HUBTEL_CHANNEL:
      setPhoneNHubtelChannel(newState, action.payload);
      break;
    case SET_SPLIT_PAYMENT:
      setSplitPayment(newState, action.payload);
      break;
    case SHOW_CHECKOUT_DIALOGUE:
      showCheckoutDialogue(newState, action.payload);
      break;
    case SET_ORDER_DETAILS:
      setOrderDetails(newState, action.payload);
      break;
    case SAVE_ORDER_ITEM_DETAILS:
      saveOrderItemDetails(newState, action.payload);
      break;
    case MAINTAIN_CHECKOUT_DATA:
      maintainCheckoutData(newState, action.payload);
      break;
    case RETRY_PAYMENT_PROCESS:
      retryPaymentProcess(newState, action.payload);
      break;
    case SET_RAVEPAY_RESPONSE:
      setRavePayResponse(newState, action.payload);
      break;
    case RESET_COUPON_VALUE:
      resetCouponValue(newState);
      break;
    default:
      return newState;
  }

  return newState;
};

const setError = (state, args) => {
  state.error = args;
};
const setErrorMessage = (state, args) => {
  state.errorMessage = args;
};
const resetRedux = (state) => {
  state.step = 1;
  state.event = null;
  state.seats = null;
  state.assignedSeats = null;
  state.passesAssignedSeats = null;
  state.billSummary = [];
  state.totalBill = 0;
  state.processing = false;
  state.successfulPayment = false;
  state.clientToken = null;
  state.passesAssignedFlag = false;
  state.seatsAssignedFlag = false;
  state.assignedSeatsForDisplay = null;
  state.passesAssignedSeatsForDisplay = null;
  state.couponValue = 0;
  state.passData = null;
  state.error = false;
  state.errorMessage = null;
  state.hubtelResponse = [];
  state.maintainCheckoutData = "";
};
const setClientToken = (state, token) => {
  state.clientToken = token;
};
const setTotalBill = (state, bill) => {
  state.totalBill = bill;
};
const setEvent = (state, event) => {
  state.event = event;
};
const setStep = (state, step) => {
  state.step = step;
};
const setSeats = (state, seats) => {
  state.seats = seats;
};
const setCouponValue = (state, couponValue) => {
  state.couponValue = couponValue;
};
const setProcessing = (state, processing) => {
  state.processing = processing;
};
const settingBillSummary = (state, billSummary) => {
  state.billSummary = billSummary;
};
const setAssignedSeats = (state, seats) => {
  state.assignedSeats = [...seats];
};
const setPaymentSuccess = (state, success) => {
  state.successfulPayment = success;
};
const setTicketCurrency = (state, currency) => {
  state.ticketCurrency = currency;
};
const setAssignedSeatsForDisplay = (state, seats) => {
  state.assignedSeatsForDisplay = seats;
};
const setAssignedSeatsFlag = (state, flag) => {
  state.seatsAssignedFlag = flag;
};
const passesAssignedSeats = (state, flag) => {
  state.passesAssignedFlag = flag;
};
const setPassData = (state, passData) => {
  state.passData = passData;
};
const setPassesSeats = (state, passesSeats) => {
  state.passesSeats = passesSeats;
};
const setPassesAssignedSeats = (state, passesAssignedSeats) => {
  state.passesAssignedSeats = [...passesAssignedSeats];
};
const setPassesAssignedSeatsForDisplay = (
  state,
  passesAssignedSeatsForDisplay
) => {
  state.passesAssignedSeatsForDisplay = passesAssignedSeatsForDisplay;
};

const resetCouponValue = (state) => {
  state.couponValue = 0;
};
const setPassTicketClasses = (state, passTicketClasses) => {
  state.passTicketClasses = passTicketClasses;
};

const setCouponValidationProcessing = (state, processing) => {
  state.couponProcessing = processing;
};

const setVerificationCredentials = (state, data) => {
  state.verificationCredentials = data;
};

const setPhoneNHubtelChannel = (state, data) => {
  state.phoneNhubtelChannel = data;
};

const setSplitPayment = (state, data) => {
  state.splitPayment = data;
};

const showCheckoutDialogue = (state, data) => {
  state.statusDialogue = data.statusDialogue;
  state.successDialogue = data.successDialogue;
  state.failureDialogue = data.failureDialogue;
  state.transactionDialogue = data.transactionDialogue;
};

const setOrderDetails = (state, data) => {
  state.orderDetails = data;
};

const saveOrderItemDetails = (state, data) => {
  state.orderItemDetails = data;
};

const maintainCheckoutData = (state, data) => {
  state.maintainCheckoutData = data;
};

const retryPaymentProcess = (state, data) => {
  state.retryPaymentProcess = data;
};

const setRavePayResponse = (state, data) => {
  state.ravePayResponse = data;
};

export default reducer;
