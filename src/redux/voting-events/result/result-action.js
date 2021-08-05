import axios from "../../../utils/axios";
import { winnerSliceActions } from "./result-Slice";

const converApiStuctureToNomineeResultData = (data) => {
  const resultData = {};

  if (Array.isArray(data)) {
    resultData.push({
      id: data._id,
      imgSrc: data.image,
      nomineeName: data.name,
      voteCount: data.totalVotes,
    });
  }

  return resultData;
};

export const getClosedEventNomineeListingByEventId = (eventId, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-nominees/fetch-by-event-id/${eventId}`)
      .then((response) => {
        const { data } = response;

        const nomineeResultData = converApiStuctureToNomineeResultData(
          data.data
        );
        dispatch(winnerSliceActions).resultListing(nomineeResultData);
      })
      .catch((error) => {});
  };
};
