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

  for (let nominee of data) {
    votingTypeApi(nominee.votingEventId, function(response) {
      convertEventData.push({
        id: nominee._id,
        imgSrc: nominee.image,
        nomineeName: nominee.name,
        voteCount: nominee.totalVotes,
        balloting: response.secretBalloting,
        votingType: response.votingType,
        nextVoteTime: response.nextVoteTime,
        votingEventId: response._id,
        votingCategoryId: votingCategoryId,
        votePrice: response.votePrice,
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

        if (data.data.length > 0) {
          convertAllNomineesApiStructureToListingData(
            categoryID,
            data.data,
            function(eventsList) {
              dispatch(votingNomineeActions.getAllNominees(eventsList));
              cb && cb(null, response);
            }
          );
        } else {
          dispatch(votingNomineeActions.getAllNominees(data.data));
          cb && cb(null, response);
        }
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
