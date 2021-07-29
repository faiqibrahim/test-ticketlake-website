import axios from "../../../utils/axios";

import { votingCategoryActions } from "./category-Slice";

const convertAllCategoriesApiStructureToListingData = (data) => {
  let convertEventData = [];
  if (Array.isArray(data)) {
    data.forEach((element) => {
      convertEventData.push({
        id: element._id,
        name: element.title,
      });
    });
  }

  return convertEventData;
};

export const getAllVotingCategories = (eventID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-categories/fetch-by-event-id/${eventID}`)
      .then((response) => {
        const { data } = response;
        const eventsList = convertAllCategoriesApiStructureToListingData(
          data.data
        );
        dispatch(votingCategoryActions.getAllCategories(eventsList));
        cb && cb(null, response);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
