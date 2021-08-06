import axios from "../../../utils/axios";

import { breadCrumbsAction } from "./bread-crumb-Slice";

let categoryNameFromApi = function getEventNameFromIDinCategories(
  categoryID,
  cb
) {
  axios
    .get(`/voting-categories/${categoryID}`)
    .then((response) => {
      const { data } = response;
      cb && cb(data.data);
    })
    .catch((error) => {
      cb && cb(error);
    });
};

const getEventCategoryNamesFromApi = (data, categoryID, cb) => {
  const eventCategoryNames = [];

  eventCategoryNames.push({
    eventName: data.data.name,
  });

  categoryNameFromApi(categoryID, (response) => {
    eventCategoryNames.push({ categoryName: response.title });
    cb(eventCategoryNames);
  });
};

export const getEventBreadCrumbs = (eventID, categoryID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-events/${eventID}`)
      .then((response) => {
        const { data } = response;
        getEventCategoryNamesFromApi(data, categoryID, (eventCategoryNames) => {
          dispatch(breadCrumbsAction.getBreadCrumbs(eventCategoryNames));
          cb && cb(null, data);
        });
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
