import axios from "../../../utils/axios";

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

const convertAllCategoriesApiStructureToListingData = (eventID, data, cb) => {
  let convertEventData = [];

  let noOfAsyncTasks = data.length;
  for (let category of data) {
    convertEventData.push({
      id: category._id,
      name: category.title,
    });
    noOfAsyncTasks--;
  }

  if (noOfAsyncTasks === 0) {
    eventNameFromApi(eventID, function(response) {
      convertEventData.unshift(response.name);
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
              cb && cb(null, response);
            }
          );
        } else {
          cb && cb(null, response);
        }
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
