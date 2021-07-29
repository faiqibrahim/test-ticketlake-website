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
  console.log("voteCastData", voteCastData);
  return (dispatch) => {
    axios
      .post("/votes/cast-vote", voteCastData)
      .then((response) => {
        const { data } = response;

        dispatch(voteCastActions.castFreeVote(data));
        cb && cb(null, response);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
