import axios from "../../../utils/axios";
import moment from "moment";

import { votingEventActions } from "./event-Slice";

const convertAllEventApiStructureToListingData = (data) => {
  let convertEventData = [];

  if (Array.isArray(data)) {
    data.forEach((element) => {
      const checkDateStartTime = moment(element.startTime).diff(
        moment(new Date())
      );

      if (checkDateStartTime < 0 && element.active) {
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
      }
    });
  }

  return convertEventData;
};

export const getAllVotingEvents = (eventsLimit, cb) => {
  return (dispatch) => {
    axios
      .get(
        `/voting-events/listing/all?limit=${eventsLimit}&sortBy=startTime&sortOrder=-1`
      )
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
