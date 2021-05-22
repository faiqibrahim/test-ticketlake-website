import {dateSplitter} from "../../utils/common-utils";
import _ from 'lodash';

export const valueAlreadyExists = (list, value) => {
    let found = false;
    if (typeof list !== 'undefined') {
        for (let i = 0; list && i < list.length; i++) {
            if (list[i] === value.sectionId) {
                found = true;
                break;
            }
        }
    }
    return found;
};

export const dateAlreadyExists = (list, value) => {
    let found = false;
    let dateValue = dateSplitter(value && value.eventDateTimeSlot && value.eventDateTimeSlot.eventStartTime);
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

export const getTags = (tagsArr) => {
    const tags = [];
    _.forEach(tagsArr, (item) => {
        tags.push({value: item, title: item});
    });
    return tags;
};
