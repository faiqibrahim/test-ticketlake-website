// Library
import _ from "lodash";
import moment from "moment";

export const getTicketClassConfigData = (classesConfig, ticketClasses) => {
  let classData = [];
  ticketClasses.forEach((singleItem) => {
    const configItem = searchInArr(
      classesConfig,
      singleItem.ticketClassId,
      "_id"
    );

    const { ticketClassType } = configItem;

    if (ticketClassType !== "PASS") {
      classData.push(
        formatObject({
          ...singleItem,
          ...configItem,
        })
      );
    }
  });
  console.log("Tickets", classData);
  return classData;
};

const searchInArr = (classesArray, classId, key = "ticketClassId") => {
  return classesArray.filter((item) => item[key] === classId)[0];
};

export const formatObject = (obj) => {
  return {
    uniqueId: obj._id ? obj._id : obj.ticketClassId,
    ticketClassId: obj.ticketClassId,
    ticketClassName: obj.ticketClassName,
    ticketClassColor: obj.ticketClassColor,
    ticketClassPrice: obj.ticketClassPrice,
    availableTickets: obj.availableTickets,
    ticketClassType: obj.ticketClassType,
    ticketClassQty: obj.ticketClassQty ? obj.ticketClassQty : 0,
  };
};

const seatFormatedObject = (seat) => {
  return {
    purchased: seat.purchased,
    rowNumber: seat.rowNumber,
    seatNumber: seat.seatNumber,
    ticketClassId: seat.ticketClassId,
    rowName: seat.rowName ? seat.rowName : seat.seatNumber,
    seatName: seat.seatNumber ? seat.seatNumber : seat.seatNumber,
    lock: seat.lock ? seat.lock : false,
  };
};

export const searchSeatsFromObject = (arr, index) => {
  let seatsData = [];
  arr.forEach((rows, rowIndex) => {
    rows.forEach((seat, seatIndex) => {
      if (seat.ticketClassId === index && seat.purchased === false) {
        seat.rowNumber = rowIndex;
        seat.seatNumber = seatIndex;
        seatsData.push(seatFormatedObject(seat));
      }
    });
  });
  return seatsData;
};

export const getSeatsFromResponse = (seat, ticketData) => {
  const seats = [];
  ticketData.forEach((item, i) => {
    if (seats[item.ticketClassName]) {
      seats[item.ticketClassName].push(
        searchSeatsFromObject(seat, item.ticketClassId)
      );
    } else {
      seats[item.ticketClassName] = searchSeatsFromObject(
        seat,
        item.ticketClassId
      );
    }
  });
  return seats;
};

export const seatsQtySearch = (billSummary, seats, isCustomEvent) => {
  const arr = [];
  billSummary.forEach((item) => {
    if (item.ticketClassType !== "PASS") {
      for (let i = 0; i < parseInt(item.ticketClassQty); i++) {
        const seatObject = isCustomEvent
          ? seats[item.ticketClassName][i]
          : seats[i];
        arr.push(
          formatAssignedSeatsObject({
            ...item,
            ...seatObject,
          })
        );
      }
    }
  });

  return arr;
};

export const formatAssignedSeatsObject = (obj, self = false) => {
  return {
    sectionId: obj.sectionId || "abc",
    sectionName: obj.sectionName || "X-Wing",
    rowNumber: obj.rowNumber,
    seatNumber: obj.seatNumber,
    seatName: obj.seatName,
    rowName: obj.rowName,
    userInfo: {
      name: typeof obj.userInfo === "undefined" ? "" : obj.userInfo.name,
      phoneNumber:
        typeof obj.userInfo === "undefined" ? "" : obj.userInfo.phoneNumber,
      email: typeof obj.userInfo === "undefined" ? "" : obj.userInfo.email,
      DOB: typeof obj.userInfo === "undefined" ? "6/6/19" : obj.userInfo.DOB,
    },
    ticketClassId: obj.ticketClassId,
    ticketClassType: obj.ticketClassType,
    self: self,
    ticket: {
      name: obj.ticketClassName ? obj.ticketClassName : obj.ticket.name,
      price: obj.ticketClassPrice
        ? obj.ticketClassPrice
        : obj.ticket && obj.ticket.price
        ? obj.ticket.price
        : null,
      color: obj.ticketClassColor ? obj.ticketClassColor : obj.ticket.color,
      available: obj.availableTickets
        ? obj.availableTickets
        : obj.ticket.available,
    },
    uniqueId: obj.uniqueId,
    ...obj,
  };
};

export const setCheckoutData = (
  mainEventId,
  eventId,
  tickets,
  nonce,
  passes,
  promoCode,
  price,
  walletHubtel
) => {
  if (walletHubtel !== undefined) {
    return {
      mainEventId: mainEventId,
      eventId: eventId,
      tickets: tickets,
      passes: passes,
      purchaseType: "REGULAR",
      promoCode,
      isOffline: false,
      paymentNonce: nonce,
      totalAmount: price,
      // conversionDetails:conversionDetails,
      paymentOption: walletHubtel,
    };
  } else {
    return {
      mainEventId: mainEventId,
      eventId: eventId,
      tickets: tickets,
      passes: passes,
      purchaseType: "REGULAR",
      promoCode,
      isOffline: false,
      paymentNonce: nonce,
      totalAmount: price,
      // conversionDetails:conversionDetails,
    };
  }
};
export const setCheckoutDataPaypal = (
  mainEventId,
  eventId,
  tickets,
  nonce,
  passes,
  promoCode,
  conversionDetails,
  wallt
) => {
  return {
    mainEventId: mainEventId,
    eventId: eventId,
    tickets: tickets,
    passes: passes,
    purchaseType: "REGULAR",
    promoCode,
    isOffline: false,
    paymentNonce: nonce,
    conversionDetails: conversionDetails,
    paymentOption: wallt,
  };
};
export const checkTicketsForMySelf = (allTickets, guestTickets) => {
  let finalTicketArray;
  if (_.size(allTickets) === _.size(guestTickets)) {
    return allTickets;
  }
  let difference = _.difference(allTickets, guestTickets);
  difference.forEach((data) => {
    data.self = true;
  });
  // difference[0].userInfo = {
  //     name: "MYSELF",
  //     phoneNumber: 'MYSELF',
  //     email: "MYSELF",
  //     DOB: 'MYSELF'
  // };
  let newTickets = _.pull(allTickets, difference[0]);
  let concatPasses = _.concat(newTickets, difference);
  finalTicketArray = [...new Set(concatPasses)];
  return finalTicketArray;
};

export const checkSeatsAssigned = (seats) => {
  let totalSeats = 0;
  const seatsKeys = _.keys(seats);
  _.forEach(seatsKeys, (value) => {
    totalSeats = totalSeats + _.size(seats[value]);
  });
  return totalSeats;
};

export const formatObjectForPasses = (obj) => {
  return {
    availablePassCount: obj.availablePassCount,
    availableTickets: obj.availableTickets,
    eventSlotDetail: obj.eventSlotDetail,
    eventSlotIds: obj.eventSlotIds,
    passPrice: obj.passPrice,
    passTitle: obj.passTitle,
    ticketClassColor: obj.ticketClassColor,
    ticketClassId: obj.ticketClassId,
    ticketClassName: obj.ticketClassName,
    ticketClassPrice: obj.ticketClassPrice,
    ticketClassType: obj.ticketClassType,
    uniqueId: obj.uniqueId ? obj.uniqueId : obj._id,
    ticketClassQty: obj.ticketClassQty ? obj.ticketClassQty : 0,
  };
};

export const getPassesConfigData = (
  ticketClasses,
  passConfigs,
  ticketClassesConfig
) => {
  const passConfigArray = [...passConfigs];
  const ticketClassesArray = [...ticketClasses];
  const ticketConfigArray = [...ticketClassesConfig];

  let classData = [];
  passConfigArray.forEach((singleItem) => {
    const { isValid, ticketClassId } = singleItem;
    if (parseInt(singleItem.availablePassCount) > 0 && isValid) {
      ticketConfigArray.forEach((ticketConfigItem) => {
        if (ticketConfigItem.ticketClassType === "PASS") {
          const arraySearch = searchInArr(ticketClassesArray, ticketClassId);
          if (ticketConfigItem._id === arraySearch.ticketClassId) {
            const data = formatObjectForPasses({
              ...arraySearch,
              ...ticketConfigItem,
              ...singleItem,
            });
            classData.push(data);
          }
        }
      });
    }
  });

  console.log("passes", classData);
  return classData;
};

export const arrangePassesSeatsWithEventSlots = (arr) => {
  const seats = [];
  _.forEach(arr, (item) => {
    const allSeats =
      item.seats && item.seats.seats[0] && item.seats.seats[0].seats;
    // const eventSlotId = item.eventSlotId;
    const eventSlotId = item._id;
    _.forEach(allSeats, (itemer) => {
      if (seats[eventSlotId]) {
        seats[eventSlotId].push(formatSeatsForPasses(itemer));
      } else {
        seats[eventSlotId] = formatSeatsForPasses(itemer);
      }
    });
  });

  return seats;
};
const formatSeatsForPasses = (seats) => {
  const resSeats = [];
  _.forEach(seats, (item, key) => {
    item.rowNumber = 0;
    item.seatNumber = key;
    resSeats.push(seatFormatedObject(item));
  });
  return resSeats;
};
export const arrangeAllPassesSeatsData = (arr) => {
  const passesSeats = [];
  _.forEach(arr, (nextArray) => {
    for (let key in nextArray) {
      if (!passesSeats[key]) {
        passesSeats[key] = nextArray[key];
      }
    }
  });

  return passesSeats;
};

// export const

export const setAssignedSeatsForPasses = (
  billSummary,
  seats,
  eventSlots,
  passData,
  passTicketClasses
) => {
  const arr = [];
  _.forEach(billSummary, (item) => {
    if (item.ticketClassType === "PASS") {
      for (let i = 0; i < parseInt(item.ticketClassQty); i++) {
        const tempObj = formatPassesMainObject(item, i);
        tempObj.seats = assignSingleSeatsToPasses(
          item.eventSlotIds,
          seats,
          passTicketClasses,
          item.uniqueId
        );
        arr.push(tempObj);
      }
    }
  });

  return arr;
};

const assignSingleSeatsToPasses = (
  passesSlots,
  allSeats,
  passTicketClasses,
  passId
) => {
  const seats = [];
  const seatsCopy = { ...allSeats };
  _.forEach(passesSlots, (item) => {
    const seatArr = seatsCopy[item];
    if (seatArr && seatArr.length) {
      for (let i = 0; i < seatArr.length; i++) {
        const singleSeat = seatArr[i];
        if (singleSeat.ticketClassId === passTicketClasses[passId]) {
          if (!singleSeat.purchased) {
            singleSeat.purchased = true;
            seats.push(
              formatPassesSingleSeatObj({
                slotId: item,
                seats: singleSeat,
                ticketClass: singleSeat.ticketClassId,
              })
            );
            break;
          }
        }
      }
    }
  });
  return seats;
};

const formatPassesSingleSeatObj = (obj) => {
  return {
    slotId: obj.slotId,
    ticketClass: obj.ticketClass,
    seat: {
      sectionId: "abc",
      sectionName: "X-Wing",
      rowNumber: obj.seats.rowNumber,
      seatNumber: obj.seats.seatNumber,
      rowName: obj.seats.rowName,
      seatName: obj.seats.seatName,
    },
  };
};

const formatPassesMainObject = (obj, uniqueIndex) => {
  return {
    uniqueIndex: uniqueIndex,
    passId: obj.uniqueId,
    ticketClassType: obj.ticketClassType,
    passTitle: obj.passTitle,
    ticketClassColor: obj.ticketClassColor,
    ticketClassId: obj.ticketClassId,
    self: obj.self ? obj.self : false,
    userInfo: {
      name: typeof obj.userInfo === "undefined" ? "" : obj.userInfo.name,
      phoneNumber:
        typeof obj.userInfo === "undefined" ? "" : obj.userInfo.phoneNumber,
      email: typeof obj.userInfo === "undefined" ? "" : obj.userInfo.email,
      DOB: "6/6/19",
    },
    seats: obj.seats ? obj.seats : [],
  };
};

export const checkPassesForMySelf = (allPasses, guestPasses) => {
  let finalPassesArray;
  if (allPasses === null) {
    return [];
  }
  if (_.size(allPasses) === _.size(guestPasses)) {
    return allPasses;
  }
  let difference = _.difference(allPasses, guestPasses);
  difference.forEach((data) => {
    data.self = true;
  });
  // difference[0].userInfo = {
  //     name: "MYSELF",
  //     phoneNumber: 'MYSELF',
  //     email: "MYSELF",
  //     DOB: 'MYSELF'
  // };
  let newTickets = _.pull(allPasses, difference[0]);
  let concatTickets = _.concat(newTickets, difference);
  finalPassesArray = [...new Set(concatTickets)];
  return finalPassesArray;
};

export const getPassesTicketClassesData = (passData) => {
  const arr = [];

  _.forEach(passData, (item) => {
    if (!arr[item.uniqueId]) {
      arr[item.uniqueId] = item.ticketClassId;
    }
  });

  return arr;
};

export const checkEvent = (data) => {
  const eventEndTime = moment(data.eventDateTimeSlot.eventEndTime);

  const now = moment();

  return now.isAfter(eventEndTime);
};

export const setHubtelCheckoutData = (
  mainEventId,
  eventId,
  tickets,
  passes,
  price,
  paymentOption,
  phoneNumber,
  hubtelChannel,
  paymentDescription,
  promoCode
) => {
  return {
    mainEventId,
    eventId,
    tickets,
    passes,
    purchaseType: "REGULAR",
    isOffline: false,
    totalAmount: price,
    paymentOption,
    CustomerMsisdn: phoneNumber,
    hubtelChannel,
    paymentDescription: paymentDescription,
    paymentType: "ticketPurchasing",
    promoCode,
  };
};

export const setHubtelTopUpData = (
  phoneNumber,
  hubtelChannel,
  paymentDescription,
  price
) => {
  return {
    CustomerMsisdn: phoneNumber,
    hubtelChannel,
    paymentDescription: paymentDescription,
    paymentType: "topUP",
    totalAmount: price,
  };
};

export const setRavePayTopUpData = (macAddress, paymentDescription, amount) => {
  return {
    meta: { consumer_mac: macAddress },
    paymentDescription: paymentDescription,
    paymentOption: "paymentGateWay",
    paymentType: "topUp",
    purchaseType: "REGULAR",
    totalAmount: amount,
  };
};

export const setRavePayCheckoutData = (
  mainEventId,
  eventId,
  tickets,
  passes,
  price,
  paymentOption,
  paymentDescription,
  mac_address,
  promoCode
) => {
  return {
    meta: { consumer_mac: mac_address },
    mainEventId,
    eventId,
    tickets,
    passes,
    purchaseType: "REGULAR",
    isOffline: false,
    totalAmount: price,
    paymentOption,
    paymentDescription: paymentDescription,
    paymentType: "ticketPurchasing",
    promoCode,
  };
};

export const getValues = (getState) => {
  let ticket = getState().ticket;
  let tickets = ticket.assignedSeats;
  let event = ticket.event && ticket.event.data && ticket.event.data.data;
  let allPasses = ticket.passesAssignedSeats;
  let wallet = getState().user && getState().user.userWallet;
  let splitPayment = ticket.splitPayment;
  let splitPaymentAmount =
    parseFloat(ticket.totalBill) - wallet.availableBalance;
  let passesCount = allPasses !== null ? allPasses.length : 0;
  let ticketsCount = tickets !== null ? tickets.length : 0;
  let network = ticket.phoneNhubtelChannel
    ? ticket.phoneNhubtelChannel.network
    : null;
  let phoneNumber = ticket.phoneNhubtelChannel
    ? ticket.phoneNhubtelChannel.phoneNumber
    : null;
  let couponData = ticket.couponValue;
  let topUpAmount = getState().user.topUpAmount;

  return {
    ticket: ticket,
    tickets: tickets,
    guestTickets: ticket.assignedSeatsForDisplay,
    event: event,
    allPasses: allPasses,
    guestPasses: ticket.passesAssignedSeatsForDisplay,
    wallet: wallet,
    splitPayment: splitPayment,
    splitPaymentAmount: splitPaymentAmount,
    price: splitPayment ? splitPaymentAmount.toFixed(2) : ticket.totalBill,
    paymentDescription: `${ticketsCount} ticket(s) & ${passesCount} pass(es) purchased for ${event &&
      event.eventTitle}`,
    paymentOption: splitPayment ? "wallet&paymentGateway" : "paymentGateWay",
    network,
    phoneNumber,
    promoCode: couponData.promoCode,
    topUpAmount,
  };
};
