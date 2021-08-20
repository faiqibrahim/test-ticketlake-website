import axios from "../../../utils/axios";
import moment from "moment";

import { votingCategoryActions } from "./category-Slice";

let eventNameFromApi = function getEventNameFromIDinCategories(eventID, cb) {
  axios
    .get(`/voting-events/${eventID}`)
    .then((response) => {
      const { data } = response;
      cb && cb(data.data);
    })
    .catch((error) => {
      cb && cb(error);
    });
};

const checkClosedEvents = (endDate) => {
  const currentDate = new moment();
  const endTime = new moment(endDate);

  let duration = moment.duration(endTime.diff(currentDate));

  let { years, months, days, hours, minutes } = duration._data;

  const daysInYear = 365;
  const daysInMonths = moment().daysInMonth();

  days += daysInMonths * months + daysInYear * years;

  const endEvent =
    (days === 0 || days < 0) &&
    (hours === 0 || hours < 0) &&
    (minutes === 0 || minutes < 0)
      ? true
      : false;
  return endEvent;
};

const convertAllCategoriesApiStructureToListingData = (eventID, data, cb) => {
  let convertEventData = [];

  let noOfAsyncTasks = data.length;
  for (let category of data) {
    convertEventData.push({
      id: category._id,
      name: category.title,
      image: category.image,
    });
    noOfAsyncTasks--;
  }

  if (noOfAsyncTasks === 0) {
    eventNameFromApi(eventID, function(response) {
      const endEvent = checkClosedEvents(response.endTime);
      convertEventData.unshift(response.name);
      convertEventData.splice(1, 0, { endEvent });

      cb(convertEventData);
    });
  }
};

export const getAllVotingCategories = (eventID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-categories/fetch-by-event-id/${eventID}`)
      .then((response) => {
        const { data } = response;
        if (data.data.length > 0) {
          convertAllCategoriesApiStructureToListingData(
            eventID,
            data.data,
            function(categoriesList) {
              dispatch(votingCategoryActions.getAllCategories(categoriesList));
              cb && cb(null, data.data);
            }
          );
        } else {
          cb && cb(null, data.data);
        }
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
