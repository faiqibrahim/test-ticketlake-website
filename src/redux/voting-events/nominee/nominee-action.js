/* eslint-disable no-loop-func */
import axios from "../../../utils/axios";

import { votingNomineeActions } from "./nominee-Slice";

let votingTypeApi = function getSingleEventTypeFromApi(eventID, cb) {
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

const convertAllNomineesApiStructureToListingData = (
  votingCategoryId,
  data,
  cb
) => {
  let convertEventData = [];

  let noOfAsyncTasks = data.length;

  for (let element of data) {
    votingTypeApi(element.votingEventId, function(response) {
      convertEventData.push({
        id: element._id,
        imgSrc: element.image,
        nomineeName: element.name,
        voteCount: element.totalVotes,
        balloting: response.secretBalloting,
        votingType: response.votingType,
        nextVoteTime: response.nextVoteTime,
        votingEventId: response._id,
        votingCategoryId: votingCategoryId,
      });

      noOfAsyncTasks--;
      if (noOfAsyncTasks === 0) cb(convertEventData);
    });
  }
};

export const getAllVotingNominees = (categoryID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-nominees/fetch-by-category-id/${categoryID}`)
      .then((response) => {
        const { data } = response;

        convertAllNomineesApiStructureToListingData(
          categoryID,
          data.data,
          function(eventsList) {
            dispatch(votingNomineeActions.getAllNominees(eventsList));
            cb && cb(null, response);
          }
        );
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
