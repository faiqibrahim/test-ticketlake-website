// Axios
import axios from "../../utils/axios";
import _ from "lodash";
// Helpers
import {
  getTicketClassConfigData,
  formatObject,
  getSeatsFromResponse,
  seatsQtySearch,
  setCheckoutDataPaypal,
  checkTicketsForMySelf,
  checkSeatsAssigned,
  getPassesConfigData,
  formatObjectForPasses,
  arrangePassesSeatsWithEventSlots,
  arrangeAllPassesSeatsData,
  setAssignedSeatsForPasses,
  checkPassesForMySelf,
  getPassesTicketClassesData,
  checkEvent,
  setHubtelCheckoutData,
  setHubtelTopUpData,
  setRavePayCheckoutData,
  getValues,
  setRavePayTopUpData,
} from "./ticket-helper";
// URLs
import {
  EVENTS_GET_EVENT_DETAIL,
  TICKET_PURCHASE,
  CLIENT_ID_GET,
  PASSES_GET_SEATS,
  SEND_SMS_OTP,
  VERIFY_SMS_OTP,
  INITIATE_HUBTEL_DIRECT_PAYMENT,
  DIRECT_PAYMENT_STATUS,
  PAYMENT_RESPONSE_CODE,
  GET_ORDER_DETAILS,
  RAVEPAY_PAYMENT_REQUEST,
  SEAT_TICKET_PURCHASE,
} from "../../utils/config";
// Import Redux Action
import { errorHandling } from "../user/user-actions";

import { NotificationManager } from "react-notifications";
import { NOTIFICATION_TIME } from "../../utils/common-utils";
import { handleError } from "../../utils/store-utils";
import { showContentOutsideMainWrapper } from "../common/common-actions";
import { macAddress, seatSessionKey } from "../../utils/constant";

// Actions
export const MOVE_STEP = "ACTION_TICKET_MOVE_STEP";
export const PROCESSING = "ACTION_TICKET_PROCESSING";
export const SETTING_BILL_SUMMARY = "ACTION_TICKET_BILL_SUMMARY";
export const SET_EVENT = "ACTION_GET_EVENT_DETAIL";
export const SET_SEATS = "ACTION_SEATS_SETS";
export const SET_ASSIGNED_SEATS = "ACTION_SET_ASSIGNED_SEATS";
export const SET_ASSIGNED_PASS = "ACTION_SET_ASSIGNED_PASSES";
export const SET_TOTAL_BILL = "ACTION_SET_TOTAL_BILL";
export const SET_TICKET_CURRENCY = "ACTION_SET_TICKET_CURRENCY";
export const SET_PAYMENT_SUCCESS = "ACTION_SET_PAYMENT_SUCCESS";
export const RESET_REDUX = "ACTION_RESET_REDUX";
export const ASSIGNED_SEATS_FOR_DISPLAY = "ACTION_DISPLAY_ASSIGNED_SEATS";
export const ASSINGED_SEATS_FLAG = "ACTION_ASSIGNED_SEATS_FLAG";
export const SET_CLIENT_TOKEN = "ACTION_SET_CLIENT_TOKEN";
export const SET_ERROR = "ACTION_SET_ERROR";
export const SET_ERROR_MESSAGE = "ACTION_SET_ERROR_MESSAGE";
export const SET_PASSES_DATA = "ACTION_SET_PASSES_DATA";
export const SET_PASSES_SEATS = "ACTION_SET_PASSES_SEATS";
export const SET_PASSES_ASSIGNED_SEATS = "ACTION_SET_PASSES_ASSIGNED_SEATS";
export const SET_PASSES_ASSIGNED_SEATS_FOR_DISPLAY =
  "ACTION_SET_PASSES_ASSIGNED_SEATS_FOR_DISPLAY";
export const SET_PASSES_TICKET_CLASSES = "ACTION_SET_PASSES_TICKET_CLASSES";
export const SET_COUPON_PROCESSING = "ACTION_SET_COUPON_PROCESSING";
export const SET_COUPONS_VALUE = "SET_COUPONS_VALUE";
export const HUBTEL_RESPONSE = "HUBTEL_RESPONSE";
export const RESET_COUPON_VALUE = "RESET_COUPON_VALUE";
export const VERIFICATION_CREDENTIALS = "VERIFICATION_CREDENTIALS";
export const Phone_N_HUBTEL_CHANNEL = "Phone_N_HUBTEL_CHANNEL";
export const SET_SPLIT_PAYMENT = "SET_SPLIT_PAYMENT";
export const SHOW_CHECKOUT_DIALOGUE = "SHOW_CHECKOUT_DIALOGUE";
export const SET_ORDER_DETAILS = "SET_ORDER_DETAILS";
export const SAVE_ORDER_ITEM_DETAILS = "SAVE_ORDER_ITEM_DETAILS";
export const MAINTAIN_CHECKOUT_DATA = "MAINTAIN_CHECKOUT_DATA";
export const SET_RAVEPAY_RESPONSE = "SET_RAVEPAY_RESPONSE";
export const RETRY_PAYMENT_PROCESS = "RETRY_PAYMENT_PROCESS";

let count;

export const setCopounValue = (value) => {
  return {
    type: SET_COUPONS_VALUE,
    payload: value,
  };
};
export const resetCopounValue = () => {
  return {
    type: RESET_COUPON_VALUE,
  };
};
export const setCouponProcessing = (payload) => {
  return {
    type: SET_COUPON_PROCESSING,
    payload: payload,
  };
};
export const setClientToken = () => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    axios
      .get(CLIENT_ID_GET)
      .then((response) => {
        dispatch(setProcessing(false));
      })
      .catch((err) => {
        console.error(err);
        dispatch(setProcessing(false));
      });
  };
};

export const getEventDetail = (id) => {
  return (dispatch, getState) => {
    dispatch(setProcessing(true));
    axios
      .get(EVENTS_GET_EVENT_DETAIL + id)
      .then((response) => {
        dispatch(setError(false));
        const { data: eventDetail } = response.data;
        const {
          parentEventInfo,
          ticketClasses,
          seats: eventSeats,
        } = eventDetail;
        const {
          currency,
          ticketClassesConfig,
          customSeatingPlan: customSeats,
          passConfigs,
        } = parentEventInfo;
        const checkEventForDate = checkEvent(eventDetail);

        dispatch(setTicketCurrency(currency));
        const ticketData = getTicketClassConfigData(
          ticketClassesConfig,
          ticketClasses
        );

        customSeats && dispatch(setSeats(eventSeats.seats, ticketData));

        dispatch(setEvent(response));

        const passesData = getPassesConfigData(
          ticketClasses,
          passConfigs,
          ticketClassesConfig
        );

        dispatch(
          setPassesTicketClasses(getPassesTicketClassesData(passesData))
        );

        dispatch(setAssignedPassesFlag(passesData.length > 0));
        dispatch(setPassesData(passesData));

        dispatch(setBillSummary(_.concat(passesData, ticketData)));

        if (checkEventForDate) {
          dispatch(setError(true));
          dispatch(setErrorMessage("The event has been finished"));
        }
        dispatch(setProcessing(false));
      })
      .catch((err) => {
        dispatch(setError(true));
        dispatch(setErrorMessage(err));
        dispatch(setProcessing(false));
      });
  };
};

export const setBillSummary = (arr, wallet = 0) => {
  const billSumamry = [];
  const sum = [0];
  arr.forEach((item) => {
    if (item.ticketClassType === "PASS") {
      sum.push(item.passPrice * item.ticketClassQty);
      billSumamry.push(formatObjectForPasses(item));
    } else {
      sum.push(item.ticketClassPrice * item.ticketClassQty);
      billSumamry.push(formatObject(item));
    }
  });

  return (dispatch, getState) => {
    let totalBill = sum.reduce((partial_sum, a) => partial_sum + a);

    let couponData = getState().ticket.couponValue;

    if (couponData && couponData.discountType === "percentage") {
      let percentedValue = totalBill * (couponData.discountValue / 100);
      couponData.couponDeduction = percentedValue;
      totalBill = totalBill - percentedValue;

      totalBill = totalBill >= 0 ? totalBill : 0;
    } else if (couponData) {
      let fixedValue = couponData.discountValue;
      couponData.couponDeduction = fixedValue;
      totalBill -= fixedValue;
      totalBill = totalBill >= 0 ? totalBill : 0;
    }

    if (wallet) {
      // let walletRemain = 0;
      // if (wallet === totalBill || wallet.availableBalance > totalBill) {
      //     dispatch(setTotalBill(walletRemain));
      // } else {
      //     walletRemain = totalBill - wallet.availableBalance;
      //     dispatch(setTotalBill(walletRemain.toFixed(2)));
      // }
      dispatch(setTotalBill(totalBill.toFixed(2)));
    } else {
      dispatch(setTotalBill(totalBill.toFixed(2)));
    }

    if (couponData) {
      dispatch(setCopounValue(couponData));
    }

    dispatch({
      type: SETTING_BILL_SUMMARY,
      payload: billSumamry,
    });
  };
};

const setSeats = (eventSeats, ticketData) => {
  const seatDataFromResponse = eventSeats[0].seats;
  const seats = getSeatsFromResponse(seatDataFromResponse, ticketData);
  const assignedSeatFlag = checkSeatsAssigned(seats) > 0;
  return (dispatch) => {
    dispatch(setAssignedSeatsFlag(assignedSeatFlag));
    dispatch(setSeating(seats));
  };
};

const setPassesSeatsData = (
  billSummary,
  event,
  passData,
  passTicketClasses
) => {
  return (dispatch) => {
    dispatch(setProcessing(true));
    const passesRequest = billSummary
      .filter(
        ({ ticketClassType, ticketClassQty }) =>
          ticketClassType === "PASS" && ticketClassQty
      )
      .map(({ uniqueId }) => {
        return { id: uniqueId };
      });

    const passesSeats = [];
    if (passesRequest.length) {
      dispatch(setProcessing(true));
      const eventParentId = event.data.data.parentEventInfo._id;

      let promise = new Promise((resolve) => {
        const length = passesRequest.length;
        let counter = 0;
        _.forEach(passesRequest, (item) => {
          axios
            .post(PASSES_GET_SEATS, {
              parentEventId: eventParentId,
              passId: item.id,
            })
            .then((res) => {
              counter++;
              passesSeats.push(arrangePassesSeatsWithEventSlots(res.data.data));
              if (counter === length) {
                resolve();
              }
            })
            .catch((err) => {
              console.error("ERR: ", err);
            });
        });
      });

      promise.then(() => {
        const passesUniqueSeats = arrangeAllPassesSeatsData(
          passesSeats,
          passData
        );
        dispatch(setPassesSeats(passesUniqueSeats));
        const assignedSeats = setAssignedSeatsForPasses(
          billSummary,
          passesUniqueSeats,
          _.keys(passesUniqueSeats),
          passData,
          passTicketClasses
        );
        dispatch(setPassesAssignedSeats(assignedSeats));
        dispatch(setPassesAssignedSeatsForDisplay(assignedSeats));

        dispatch(setProcessing(false));
      });

      promise.catch(() => {
        dispatch(setProcessing(false));
      });
    }
  };
};

export const setAssignedSeats = (
  billSummary,
  seats,
  wallet = 0,
  event,
  passData,
  passTicketClasses,
  venueSeats,
  isCustomEvent,
  stepCB
) => {
  return (dispatch) => {
    dispatch(setProcessing(true));

    dispatch(setBillSummary(billSummary, wallet));

    seats = isCustomEvent ? seats : venueSeats;
    const assignedSeats = seatsQtySearch(billSummary, seats, isCustomEvent);

    dispatch({
      type: SET_ASSIGNED_SEATS,
      payload: assignedSeats,
    });

    dispatch(setAssignedSeatsForDisplay(assignedSeats));
    if (isCustomEvent) {
      dispatch(
        setPassesSeatsData(billSummary, event, passData, passTicketClasses)
      );
    }

    stepCB && stepCB();
    dispatch(setProcessing(false));
  };
};

export const setAssignedBillFromForm = (
  index,
  val,
  rowNumber,
  seatNumber,
  assignedSeats
) => {
  return (dispatch) => {
    assignedSeats.forEach((item) => {
      if (item.seatNumber === seatNumber && item.rowNumber === rowNumber) {
        item.self = false;
        item.userInfo[index] = val;
      }
    });
    dispatch(setAssignedSeatsInner(assignedSeats));
  };
};
export const setAssignedBillFromFormForPasses = (
  index,
  val,
  uniqueId,
  passId,
  assignedSeats
) => {
  return (dispatch) => {
    _.forEach(assignedSeats, (item) => {
      if (item.passId === passId && item.uniqueIndex === uniqueId) {
        item.userInfo[index] = val;
      }
    });
    dispatch(setPassesAssignedSeats(assignedSeats));
  };
};

export const seatsCheckout = (checkoutData, stepCB) => {
  return (dispatch, getState) => {
    dispatch(setProcessing(true));
    axios
      .post(SEAT_TICKET_PURCHASE, checkoutData, "v2")
      .then(() => {
        dispatch(setPaymentSuccess(true));
        dispatch(setProcessing(false));
        sessionStorage.removeItem(seatSessionKey);
        stepCB && stepCB();
      })
      .catch((err) => {
        dispatch(setProcessing(false));
        dispatch(setPaymentSuccess(false));
        stepCB && stepCB();
      });
  };
};
export const checkout = (
  tickets,
  guestsTickets,
  event,
  paymentNonce,
  allPasses,
  guestPasses,
  conversionDetails,
  stepCB
) => {
  const { data } = event.data;
  return (dispatch, getState) => {
    let couponData = getState().ticket.couponValue;
    dispatch(setProcessing(true));
    const checkoutData = setCheckoutDataPaypal(
      data.parentEventId,
      data._id,
      checkTicketsForMySelf(tickets, guestsTickets),
      paymentNonce,
      checkPassesForMySelf(allPasses, guestPasses),
      couponData.promoCode,
      conversionDetails,
      "wallet"
    );

    axios
      .post(TICKET_PURCHASE, checkoutData)
      .then((response) => {
        dispatch(setPaymentSuccess(true));
        dispatch(setProcessing(false));
        stepCB && stepCB();
      })
      .catch((err) => {
        dispatch(setProcessing(false));
        dispatch(setPaymentSuccess(false));
        stepCB && stepCB();
      });
  };
};

export const removeAssignedSeatsFromDisplay = (
  ticketsArr,
  assignedSeatsFromDisplay,
  passesSeats,
  isCustomSeats,
  cb
) => {
  let assignedSeats = assignedSeatsFromDisplay
    ? [...assignedSeatsFromDisplay]
    : null;

  let passes = passesSeats ? [...passesSeats] : null;

  assignedSeats &&
    assignedSeats.forEach((seat) => {
      seat.userInfo.name = "";
      seat.userInfo.email = "";
      seat.userInfo.phoneNumber = "";
    });

  passes &&
    passes.forEach((seat) => {
      seat.userInfo.name = "";
      seat.userInfo.email = "";
      seat.userInfo.phoneNumber = "";
    });

  if (ticketsArr && ticketsArr.length === 0) {
    return (dispatch) => {
      dispatch(setAssignedSeatsForDisplay(assignedSeatsFromDisplay));
      assignedSeats && dispatch(setAssignedSeatsInner(assignedSeats));
      passes && dispatch(setPassesAssignedSeats(passes));
      dispatch(setPassesAssignedSeatsForDisplay(passesSeats));
      cb && cb();
    };
  } else {
    return (dispatch, getState) => {
      for (let i = 0; i < ticketsArr.length; i++) {
        let splittedString = ticketsArr[i].split("|");
        const {
          assignedSeatsForDisplay,
          passesAssignedSeatsForDisplay,
        } = getState().ticket;
        if (splittedString[0] === "PASS") {
          //let counter = 0;
          const newArray =
            passesAssignedSeatsForDisplay &&
            passesAssignedSeatsForDisplay.filter(
              (item) => item.uniqueIndex !== parseInt(splittedString[4])
            );

          dispatch(setPassesAssignedSeatsForDisplay(newArray));
          assignedSeats && dispatch(setAssignedSeatsInner(assignedSeats));
          passes && dispatch(setPassesAssignedSeats(passes));
          dispatch(setAssignedSeatsForDisplay(assignedSeatsForDisplay));
          cb && cb();
        } else {
          const newArray = [];
          assignedSeatsForDisplay.forEach((item) => {
            const { rowNumber, seatNumber, ticket } = item;
            if (ticket.name === splittedString[1]) {
              const parsedRow = isCustomSeats
                ? parseInt(splittedString[2])
                : splittedString[2];

              const parsedSeat = isCustomSeats
                ? parseInt(splittedString[3])
                : splittedString[3];

              if (!(rowNumber === parsedRow && seatNumber === parsedSeat)) {
                newArray.push(item);
              }
            } else {
              newArray.push(item);
            }
          });

          dispatch(setAssignedSeatsForDisplay(newArray));
          assignedSeats && dispatch(setAssignedSeatsInner(assignedSeats));
          passes && dispatch(setPassesAssignedSeats(passes));
          dispatch(
            setPassesAssignedSeatsForDisplay(passesAssignedSeatsForDisplay)
          );
          cb && cb();
        }
      }
    };
  }
};
export const setError = (error) => {
  return {
    type: SET_ERROR,
    payload: error,
  };
};
export const setErrorMessage = (message) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: message,
  };
};
const setAssignedSeatsInner = (seats) => {
  return {
    type: SET_ASSIGNED_SEATS,
    payload: seats,
  };
};
const setTotalBill = (bill) => {
  return {
    type: SET_TOTAL_BILL,
    payload: bill,
  };
};

const setPaymentSuccess = (success) => {
  return {
    type: SET_PAYMENT_SUCCESS,
    payload: success,
  };
};

const setAssignedSeatsFlag = (flag) => {
  return {
    type: ASSINGED_SEATS_FLAG,
    payload: flag,
  };
};
const setAssignedPassesFlag = (flag) => {
  return {
    type: SET_ASSIGNED_PASS,
    payload: flag,
  };
};

const setSeating = (seats) => {
  return {
    type: SET_SEATS,
    payload: seats,
  };
};
export const setAssignedSeatsForDisplay = (seats) => {
  return {
    type: ASSIGNED_SEATS_FOR_DISPLAY,
    payload: seats,
  };
};

const setTicketCurrency = (currency) => {
  return {
    type: SET_TICKET_CURRENCY,
    payload: currency,
  };
};

export const resetRedux = () => {
  return {
    type: RESET_REDUX,
    payload: null,
  };
};

const setProcessing = (processing) => {
  return {
    type: PROCESSING,
    payload: processing,
  };
};

export const setEvent = (event) => {
  return {
    type: SET_EVENT,
    payload: event,
  };
};
export const setStep = (step) => {
  return {
    type: MOVE_STEP,
    payload: step,
  };
};

export const setPassesData = (passesData) => {
  return {
    type: SET_PASSES_DATA,
    payload: passesData,
  };
};

export const setPassesSeats = (passesData) => {
  return {
    type: SET_PASSES_SEATS,
    payload: passesData,
  };
};
export const setPassesAssignedSeats = (passesData) => {
  return {
    type: SET_PASSES_ASSIGNED_SEATS,
    payload: passesData,
  };
};

export const setPassesAssignedSeatsForDisplay = (passesData) => {
  return {
    type: SET_PASSES_ASSIGNED_SEATS_FOR_DISPLAY,
    payload: passesData,
  };
};

export const setPassesTicketClasses = (passesTicketClasses) => {
  return {
    type: SET_PASSES_TICKET_CLASSES,
    payload: passesTicketClasses,
  };
};

export const setSplitPayment = (boolean) => {
  return {
    type: SET_SPLIT_PAYMENT,
    payload: boolean,
  };
};

export const sendSmsOTP = (phoneNumber, network, cb) => {
  const obj = { phoneNumber };
  return (dispatch) => {
    dispatch(setPhoneNHubtelChannel({ network, phoneNumber }));
    axios
      .post(SEND_SMS_OTP, obj)
      .then((response) => {
        const { verificationCredentials } = response.data;
        dispatch(setVerificationCredentials(verificationCredentials));
        if (cb) {
          cb();
        } else {
          NotificationManager.success("OTP Resent Successfully!", "", 3000);
        }
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
      });
  };
};

export const verifySmsOTP = (smsOTP, cb, errorCB) => {
  return (dispatch, getState) => {
    const { verificationCredentials, retryPaymentProcess } = getState().ticket;
    const obj = {
      smsOTP,
      _id: verificationCredentials && verificationCredentials.tokenId,
    };

    axios
      .post(VERIFY_SMS_OTP, obj)
      .then((response) => {
        dispatch(initiateHubtelDirectPayment(retryPaymentProcess));
        cb && cb();
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        errorCB && errorCB();
        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
      });
  };
};

export const initiateHubtelDirectPayment = (tryAgain) => {
  return (dispatch, getState) => {
    let hubtelPaymentData;
    const ticket = getState().ticket;
    const tickets = ticket.assignedSeats;
    const guestTickets = ticket.assignedSeatsForDisplay;
    const event = ticket.event && ticket.event.data && ticket.event.data.data;
    const allPasses = ticket.passesAssignedSeats;
    const guestPasses = ticket.passesAssignedSeatsForDisplay;
    const wallet = getState().user && getState().user.userWallet;
    const { network, phoneNumber } = getState().ticket.phoneNhubtelChannel;
    const splitPayment = ticket.splitPayment;
    const splitPaymentAmount =
      parseFloat(ticket.totalBill) - wallet.availableBalance;
    const price = splitPayment
      ? splitPaymentAmount.toFixed(2)
      : ticket.totalBill;
    const topUpAmount = getState().user.topUpAmount;
    let couponData = getState().ticket.couponValue;
    count = 1;

    let passesCount = allPasses !== null ? allPasses.length : 0;
    let ticketsCount = tickets !== null ? tickets.length : 0;

    let paymentDescription = `${ticketsCount} ticket(s) & ${passesCount} pass(es) purchased for ${event &&
      event.eventTitle}`;
    let paymentOption = splitPayment
      ? "wallet&paymentGateway"
      : "paymentGateWay";

    let checkoutData = setHubtelCheckoutData(
      event && event.parentEventId,
      event && event._id,
      checkTicketsForMySelf(tickets, guestTickets),
      checkPassesForMySelf(allPasses, guestPasses),
      price,
      paymentOption,
      phoneNumber,
      network,
      paymentDescription,
      couponData.promoCode
    );

    if (tryAgain) {
      checkoutData = ticket.maintainCheckoutData;
      dispatch(
        contentOutsideMainWrapper(true, () => {
          dispatch(showCheckoutDialogue({ statusDialogue: true }));
        })
      );
      count = 1;
    } else {
      dispatch(_setCheckoutData(checkoutData));
    }

    const topUpAmountData = setHubtelTopUpData(
      phoneNumber,
      network,
      `topUp of ${topUpAmount}`,
      topUpAmount
    );

    hubtelPaymentData =
      checkoutData &&
      ((checkoutData.tickets && checkoutData.tickets.length > 0) ||
        (checkoutData.passes && checkoutData.passes.length > 0))
        ? checkoutData
        : topUpAmountData;

    axios
      .post(INITIATE_HUBTEL_DIRECT_PAYMENT, hubtelPaymentData)
      .then((response) => {
        const { result } = response && response.data;
        const checkoutId = result && result.Data && result.Data.TransactionId;
        dispatch(directPaymentStatus(checkoutId));
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
        dispatch(contentOutsideMainWrapper(false));
      });
  };
};

const directPaymentStatus = (checkoutId) => {
  let checkInternally = true;
  if (count === 10) {
    checkInternally = false;
  }

  return (dispatch) => {
    axios
      .get(
        DIRECT_PAYMENT_STATUS +
          checkoutId +
          "?checkInternally=" +
          checkInternally
      )
      .then((response) => {
        const { data } = response.data;
        let transObjectToSend = null;

        if (data && data.code === PAYMENT_RESPONSE_CODE.paymentPending) {
          // Pending State
          if (count <= 10) {
            setTimeout(() => {
              dispatch(directPaymentStatus(checkoutId));
              count++;
            }, 10000);
          } else {
            dispatch(
              contentOutsideMainWrapper(true, () => {
                dispatch(showCheckoutDialogue({ failureDialogue: true }));
              })
            );
          }
        } else {
          const respData = data && data.data ? data.data : null;
          if (respData !== null) {
            transObjectToSend = respData.transObjectToSend;
          }
          dispatch(setOrderDetails(transObjectToSend));
          dispatch(
            contentOutsideMainWrapper(true, () => {
              dispatch(showCheckoutDialogue({ successDialogue: true }));
            })
          );
        }
      })
      .catch(() => {
        dispatch(
          contentOutsideMainWrapper(true, () => {
            dispatch(showCheckoutDialogue({ failureDialogue: true }));
          })
        );
      });
  };
};

export const ravePayPaymentRequest = () => {
  return (dispatch, getState) => {
    let getData = getValues(getState);
    let topUpAmountData;
    let ravepayPaymentData;
    if (getData !== undefined) {
      ravepayPaymentData = setRavePayCheckoutData(
        getData.event && getData.event.parentEventId,
        getData.event && getData.event._id,
        checkTicketsForMySelf(getData.tickets, getData.guestTickets),
        checkPassesForMySelf(getData.allPasses, getData.guestPasses),
        +getData.price,
        getData.paymentOption,
        getData.paymentDescription,
        macAddress,
        getData.promoCode,
        getData.topUpAmount
      );
    }

    if (getData.topUpAmount) {
      topUpAmountData = setRavePayTopUpData(
        macAddress,
        `topUp of ${getData.topUpAmount}`,
        getData.topUpAmount
      );
    }

    if (getState().ticket.maintainCheckoutData) {
      let maintainCheckoutData = getState().ticket.maintainCheckoutData;
      if (getData.splitPayment) {
        maintainCheckoutData.totalAmount = +getData.splitPaymentAmount.toFixed(
          2
        );
        maintainCheckoutData.paymentOption = "wallet&paymentGateway";
        ravepayPaymentData = maintainCheckoutData;
      } else {
        ravepayPaymentData = maintainCheckoutData;
      }
    } else {
      ravepayPaymentData =
        ravepayPaymentData &&
        ((ravepayPaymentData.tickets &&
          ravepayPaymentData.tickets.length > 0) ||
          (ravepayPaymentData.passes && ravepayPaymentData.passes.length > 0))
          ? ravepayPaymentData
          : topUpAmountData;
      dispatch(_setCheckoutData(ravepayPaymentData));
    }

    axios
      .post(RAVEPAY_PAYMENT_REQUEST, ravepayPaymentData)
      .then((response) => {
        const { data } = response && response.data;
        dispatch(setRavePayResponse(data));
      })
      .catch((err) => {
        const error =
          err.response &&
          err.response.data &&
          err.response.data.error &&
          err.response.data.error._message;
        let errorMessage = handleError(err);
        let errToShow = error ? error : errorMessage;
        dispatch(_setCheckoutData(ravepayPaymentData));
        dispatch(errorHandling(true, errToShow));
        NotificationManager.error(errToShow, "", NOTIFICATION_TIME);
      });
  };
};

export const getOrderDetails = (orderId, cb) => {
  return (dispatch) => {
    axios
      .get(GET_ORDER_DETAILS + orderId)
      .then((response) => {
        const data = response.data;
        dispatch(setOrderItemDetails(data));
        cb && cb();
      })
      .catch((err) => {
        let errorMessage = handleError(err);
        dispatch(errorHandling(true, errorMessage));
        NotificationManager.error(errorMessage, "", NOTIFICATION_TIME);
      });
  };
};

export const showCheckoutDialogue = (payload) => {
  return {
    type: SHOW_CHECKOUT_DIALOGUE,
    payload,
  };
};

const contentOutsideMainWrapper = (value, cb) => {
  return (dispatch) => {
    dispatch(showContentOutsideMainWrapper(value));
    cb && cb();
  };
};

const setVerificationCredentials = (payload) => {
  return {
    type: VERIFICATION_CREDENTIALS,
    payload,
  };
};

const setPhoneNHubtelChannel = (payload) => {
  return {
    type: Phone_N_HUBTEL_CHANNEL,
    payload,
  };
};

const setOrderDetails = (payload) => {
  return {
    type: SET_ORDER_DETAILS,
    payload,
  };
};

const setOrderItemDetails = (payload) => {
  return {
    type: SAVE_ORDER_ITEM_DETAILS,
    payload,
  };
};

const _setCheckoutData = (payload) => {
  return {
    type: MAINTAIN_CHECKOUT_DATA,
    payload,
  };
};

export const retryPaymentProcess = (payload) => {
  return {
    type: RETRY_PAYMENT_PROCESS,
    payload,
  };
};

const setRavePayResponse = (payload) => {
  return {
    type: SET_RAVEPAY_RESPONSE,
    payload,
  };
};
