import axios from "../../../utils/axios";

import { voteCastActions } from "./vote-cast-Slice";

const convertVoteCastDataToApiStructure = (data) => {
  const convertVoteCastData = {
    votingEventId: data.votingEventId,
    votingCategoryId: data.votingCategoryId,
    votingNomineeId: data.id,
  };
  return convertVoteCastData;
};

export const saveFreeVoteCast = (voteData, cb) => {
  const voteCastData = convertVoteCastDataToApiStructure(voteData);

  return (dispatch) => {
    axios
      .post("/votes/cast-vote", voteCastData)
      .then((response) => {
        const { data } = response;
        console.log("data", data);
        dispatch(voteCastActions.castFreeVote(data.data));
        cb && cb(null, response);
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 400) {
          dispatch(
            voteCastActions.eventNotStarted({
              error: error.response.data._error,
            })
          );
          cb && cb(error);
        }
        cb && cb(error);
      });
  };
};

export const savePaidVoteCast = (voteData, cb) => {
  return (dispatch) => {
    axios
      .post("/votes/cast-vote", voteData)
      .then((response) => {
        const { data } = response;
        dispatch(voteCastActions.castPaidVote(data));
        cb && cb(null, response);
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 400) {
          dispatch(
            voteCastActions.eventNotStarted({
              error: error.response.data._error,
            })
          );
          cb && cb(error);
        }
        cb && cb(error);
      });
  };
};
