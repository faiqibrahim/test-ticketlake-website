import axios from "../../../utils/axios";
import { resultSliceActions } from "./result-Slice";

const converApiStuctureToNomineeResultData = (data) => {
  const resultData = [];
  if (Array.isArray(data)) {
    data.map((nominee) => {
      return resultData.push({
        id: nominee._id,
        imgSrc: nominee.image,
        nomineeName: nominee.name,
        nomineeVotes: nominee.totalVotes,
      });
    });
  }

  return resultData;
};

export const getClosedEventNomineeListingByCategoryId = (categoryID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-nominees/fetch-by-category-id/${categoryID}`)
      .then((response) => {
        const { data } = response;

        const nomineeResultData = converApiStuctureToNomineeResultData(
          data.data
        );
        dispatch(resultSliceActions.getResultListing(nomineeResultData));
        cb && cb(null, response);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
