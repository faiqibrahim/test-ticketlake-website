// Library
import _ from "lodash";
import moment from 'moment';

export const getTicketClassConfigData = (res) => {
    const configArr = res && res.data && res.data.data && res.data.data.parentEventInfo && res.data.data.parentEventInfo.ticketClassesConfig;
    const classesArr = res && res.data && res.data.data && res.data.data.ticketClasses;

    let classData = [];
    configArr.forEach(singleItem => {
        if (singleItem.ticketClassType === "REGULAR") {
            classData.push(formatObject({...singleItem, ...searchInArr(classesArr, singleItem._id)}));
        }
    });
    return classData;
};


const searchInArr = (arr, index) => {
    let array = "";
    arr.forEach(singleItem => {
        if (singleItem.ticketClassId === index) {
            array = singleItem;
        }
    });
    return array;
};

export const formatObject = (obj) => {
    return {
        uniqueId: obj._id ? obj._id : obj.ticketClassId,
        ticketClassId: obj.ticketClassId,
        ticketClassConfigId: obj._id,
        ticketClassName: obj.ticketClassName,
        ticketClassColor: obj.ticketClassColor,
        ticketClassPrice: obj.ticketClassPrice,
        availableTickets: obj.availableTickets,
        ticketClassType: obj.ticketClassType,
        ticketClassQty: obj.ticketClassQty ? obj.ticketClassQty : 0
    };
};

const seatFormatedObject = (seat, rowIndex, seatIndex) => {
    return {
        purchased: seat.purchased,
        rowNumber: rowIndex,
        seatNumber: seatIndex,
        ticketClassId: seat.ticketClassId,
        rowName: seat.rowName ? seat.rowName : seatIndex,
        seatName: seat.seatNumber ? seat.seatNumber : seatIndex,
        lock: seat.lock ? seat.lock : false
    };
};

export const searchSeatsFromObject = (arr, index) => {
    let seatsData = [];
    arr.forEach((rows, rowindex) => {
        rows.forEach((seat, seatIndex) => {
            if (seat.ticketClassId === index && seat.purchased === false) {
                seatsData.push(seatFormatedObject(seat, rowindex, seatIndex));
            }
        })
    });
    return seatsData;
};


export const getSeatsFromResponse = (seat, ticketData) => {
    const seats = [];
    ticketData.forEach((item, i) => {
        if (seats[item.ticketClassName]) {
            seats[item.ticketClassName].push(searchSeatsFromObject(seat, item.ticketClassId));
        } else {
            seats[item.ticketClassName] = searchSeatsFromObject(seat, item.ticketClassId);
        }
    });
    return seats;
};

export const seatsQtySearch = (billSummary, seats) => {
    const arr = [];
    billSummary.forEach(item => {
        if (item.ticketClassType === 'REGULAR') {
            for (let i = 0; i < parseInt(item.ticketClassQty); i++) {
                arr.push(formatAssignedSeatsObject({...item, ...seats[item.ticketClassName][i]}));
            }
        }
    });

    return arr;
};

export const formatAssignedSeatsObject = (obj, self = false) => {
    return {
        sectionId: 'abc',
        sectionName: obj.sectionName ? obj.sectionName : "X-Wing",
        rowNumber: obj.rowNumber,
        seatNumber: obj.seatNumber,
        seatName: obj.seatName,
        rowName: obj.rowName,
        userInfo: {
            name: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.name,
            phoneNumber: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.phoneNumber,
            email: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.email,
            DOB: (typeof obj.userInfo === 'undefined') ? '6/6/19' : obj.userInfo.DOB,
        },
        ticketClassId: obj.ticketClassId,
        ticketClassType: obj.ticketClassType,
        self: self,
        ticket: {
            name: obj.ticketClassName ? obj.ticketClassName : obj.ticket.name,
            price: obj.ticketClassPrice ? obj.ticketClassPrice : obj.ticket && obj.ticket.price ? obj.ticket.price : null,
            color: obj.ticketClassColor ? obj.ticketClassColor : obj.ticket.color,
            available: obj.availableTickets ? obj.availableTickets : obj.ticket.available
        },
        uniqueId: obj.uniqueId
    }
};

export const setCheckoutData = (mainEventId, eventId, tickets, nonce, passes,promoCode,price, walletHubtel) => {
    if(walletHubtel!==undefined){
        return {
            mainEventId: mainEventId,
            eventId: eventId,
            tickets: tickets,
            passes: passes,
            purchaseType: "REGULAR",
            promoCode,
            isOffline: false,
            paymentNonce: nonce,
            totalAmount:price,
            // conversionDetails:conversionDetails,
            paymentOption:walletHubtel
        }
    }else{
        return {
            mainEventId: mainEventId,
            eventId: eventId,
            tickets: tickets,
            passes: passes,
            purchaseType: "REGULAR",
            promoCode,
            isOffline: false,
            paymentNonce: nonce,
            totalAmount:price,
            // conversionDetails:conversionDetails,
        }
    }
};
export const setCheckoutDataPaypal = (mainEventId, eventId, tickets, nonce, passes,promoCode,conversionDetails, wallt) => {
    return {
        mainEventId: mainEventId,
        eventId: eventId,
        tickets: tickets,
        passes: passes,
        purchaseType: "REGULAR",
        promoCode,
        isOffline: false,
        paymentNonce: nonce,
        conversionDetails:conversionDetails,
        paymentOption : wallt
    }
};
export const checkTicketsForMySelf = (allTickets, guestTickets) => {
    let finalTicketArray;
    if (_.size(allTickets) === _.size(guestTickets)) {
        return allTickets;
    }
    let difference = _.difference(allTickets, guestTickets);
    difference.forEach(data => {
        data.self = true
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
        eventSlotDetail:obj.eventSlotDetail,
        eventSlotIds: obj.eventSlotIds,
        passPrice: obj.passPrice,
        passTitle: obj.passTitle,
        ticketClassColor: obj.ticketClassColor,
        ticketClassId: obj.ticketClassId,
        ticketClassName: obj.ticketClassName,
        ticketClassPrice: obj.ticketClassPrice,
        ticketClassType: obj.ticketClassType,
        uniqueId: obj.uniqueId ? obj.uniqueId : obj._id,
        ticketClassQty: obj.ticketClassQty ? obj.ticketClassQty : 0
    };
};

export const getPassesConfigData = (res) => {

    const configArr = res && res.data && res.data.data && res.data.data.parentEventInfo && res.data.data.parentEventInfo.passConfigs;
    const classesArr = res && res.data && res.data.data && res.data.data.ticketClasses;
    const ticketConfigArray = res && res.data && res.data.data && res.data.data.parentEventInfo && res.data.data.parentEventInfo.ticketClassesConfig;
    let classData = [];
    configArr.forEach(singleItem => {
        if (parseInt(singleItem.availablePassCount) > 0 && singleItem.isValid) {
            ticketConfigArray.forEach((ticketConfigItem) => {
                if (ticketConfigItem.ticketClassType === 'PASS') {
                    const arraySearch = searchInArr(classesArr, singleItem.ticketClassId);
                    if (ticketConfigItem._id === arraySearch.ticketClassId) {
                        const data = formatObjectForPasses({...arraySearch, ...ticketConfigItem, ...singleItem});
                        classData.push(data);
                    }
                }
            });

        }
    });


    return classData;
};

export const arrangePassesSeatsWithEventSlots = (arr, passData) => {
    const seats = [];
    _.forEach(arr, (item) => {
        const allSeats = item.seats && item.seats.seats[0] && item.seats.seats[0].seats;
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
        resSeats.push(seatFormatedObject(item, 0, key));
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

export const setAssignedSeatsForPasses = (billSummary, seats, eventSlots, passData, passTicketClasses) => {
    const arr = [];
    _.forEach(billSummary, (item) => {
        if (item.ticketClassType === 'PASS') {
            for (let i = 0; i < parseInt(item.ticketClassQty); i++) {
                const tempObj = formatPassesMainObject(item, i);
                tempObj.seats = assignSingleSeatsToPasses(item.eventSlotIds, seats, passTicketClasses, item.uniqueId);
                arr.push(tempObj);
            }
        }

    });


    return arr;
};

const assignSingleSeatsToPasses = (passesSlots, allSeats, passTicketClasses, passId) => {
    const seats = [];
    const seatsCopy = {...allSeats};
    _.forEach(passesSlots, (item) => {
        const seatArr = seatsCopy[item];
        if (seatArr && seatArr.length) {
            for (let i = 0; i < seatArr.length; i++) {
                const singleSeat = seatArr[i];
                if (singleSeat.ticketClassId === passTicketClasses[passId]) {

                    if (!singleSeat.purchased) {
                        singleSeat.purchased = true;
                        seats.push(formatPassesSingleSeatObj({
                            slotId: item,
                            seats: singleSeat,
                            ticketClass: singleSeat.ticketClassId
                        }));
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
            seatName: obj.seats.seatName
        }
    }
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
            name: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.name,
            phoneNumber: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.phoneNumber,
            email: (typeof obj.userInfo === 'undefined') ? '' : obj.userInfo.email,
            DOB: "6/6/19"
        },
        seats: obj.seats ? obj.seats : []
    }
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
    difference.forEach(data => {
        data.self = true
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

    return  now.isAfter(eventEndTime);
};

export const setHubtelCheckoutData = (mainEventId, eventId, tickets, passes, price,
                                      paymentOption, phoneNumber, hubtelChannel, paymentDescription, promoCode) => {
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
        promoCode
    }
};

export const setHubtelTopUpData = (phoneNumber, hubtelChannel, paymentDescription, price) => {
    return {
        CustomerMsisdn: phoneNumber,
        hubtelChannel,
        paymentDescription: paymentDescription,
        paymentType: "topUP",
        totalAmount: price
    }
};

export const setRavePayTopUpData = (macAddress, paymentDescription, amount) => {
    return {
        meta: {consumer_mac : macAddress},
        paymentDescription: paymentDescription,
        paymentOption: "paymentGateWay",
        paymentType: "topUp",
        purchaseType: "REGULAR",
        totalAmount: amount
    }
};

export const setRavePayCheckoutData = (mainEventId, eventId, tickets, passes, price, paymentOption, paymentDescription,
                                       mac_address, promoCode) => {
    return {
        meta: {consumer_mac : mac_address},
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
        promoCode
    }
};

export const getValues = (getState) => {
    let ticket = getState().ticket;
    let tickets = ticket.assignedSeats;
    let event = ticket.event && ticket.event.data && ticket.event.data.data;
    let allPasses = ticket.passesAssignedSeats;
    let wallet = getState().user && getState().user.userWallet;
    let splitPayment = ticket.splitPayment;
    let splitPaymentAmount = parseFloat(ticket.totalBill) - wallet.availableBalance;
    let passesCount = allPasses !== null ? allPasses.length : 0;
    let ticketsCount = tickets !== null ? tickets.length : 0;
    let network = ticket.phoneNhubtelChannel ? ticket.phoneNhubtelChannel.network : null;
    let phoneNumber = ticket.phoneNhubtelChannel ? ticket.phoneNhubtelChannel.phoneNumber : null;
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
        paymentDescription: `${ticketsCount} ticket(s) & ${passesCount} pass(es) purchased for ${event && event.eventTitle}`,
        paymentOption: splitPayment ? 'wallet&paymentGateway' : 'paymentGateWay',
        network,
        phoneNumber,
        promoCode : couponData.promoCode,
        topUpAmount
    }
};