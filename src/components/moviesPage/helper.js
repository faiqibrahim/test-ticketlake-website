import {getDateFromISO, getDayFromISO} from "../../utils/common-utils";

export const dateAlreadyExists = (list, value) => {
    let found = false;
    let dateValue = `${getDayFromISO(value && value.eventDateTimeSlot && value.eventDateTimeSlot.eventStartTime)}, ${getDateFromISO(value && value.eventDateTimeSlot && value.eventDateTimeSlot.eventStartTime)}`
    if (typeof list !== 'undefined') {
        for (let i = 0; list && i < list.length; i++) {
            if (list[i] === dateValue) {
                found = true;
                break;
            }
        }
    }
    return found;
};

export const venueAlreadyExists = (list, value) => {
    let found = false;
    let venueID = value && value.venue && value.venue._id;
    if (typeof list !== 'undefined') {
        for (let i = 0; list && i < list.length; i++) {
            if (list[i] === venueID) {
                found = true;
                break;
            }
        }
    }
    return found;
};

export const getUniqueVenues = (eventSlots) => {
    let uniqueVenueIDs = [];
    let uniqueVenues = [];

    if (typeof eventSlots !== 'undefined') {
        for (let i = 0; i < eventSlots.length; i++) {
            if (!venueAlreadyExists(uniqueVenueIDs, eventSlots[i])) {
                uniqueVenueIDs.push(eventSlots[i].venue._id);
            }
        }
    }

    for (let i = 0; i < uniqueVenueIDs.length; i++) {
        let dataList = [];
        let label = '';
        if (typeof eventSlots !== 'undefined') {
            for (let j = 0; j < eventSlots.length; j++) {
                if (uniqueVenueIDs[i] === eventSlots[j].venue._id) {
                    if (label === '') {
                        label = eventSlots[j].venue.name
                    }
                    dataList.push({
                        data: eventSlots[j]
                    })
                }
            }
        }
        uniqueVenues.push({
            label: label,
            data: dataList
        });
    }
    return uniqueVenues;
};