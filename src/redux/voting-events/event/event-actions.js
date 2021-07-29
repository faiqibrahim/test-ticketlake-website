import axios from "../../../utils/axios";

import { votingEventActions } from "./event-Slice";

const convertAllEventApiStructureToListingData = (data) => {
  let convertEventData = [];

  if (Array.isArray(data)) {
    data.forEach((element) => {
      convertEventData.push({
        id: element._id,
        images: element.images[0],
        name: element.name,
        startTime: element.startTime,
        endTime: element.endTime,
        votingType: element.votingType,
        nextVoteTime: element.nextVoteTime,
        votePrice: element.votePrice ? element.votePrice : 0,
        secretBalloting: element.secretBalloting,
        votingCounting: element.totalVotes,
        active: element.active,
      });
    });
  }

  return convertEventData;
};

export const getAllVotingEvents = (cb) => {
  return (dispatch) => {
    axios
      .get("/voting-events")
      .then((response) => {
        const { data } = response;
        const eventsList = convertAllEventApiStructureToListingData(data.data);
        dispatch(votingEventActions.getAllEvents(eventsList));
        cb && cb(null, response);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};
