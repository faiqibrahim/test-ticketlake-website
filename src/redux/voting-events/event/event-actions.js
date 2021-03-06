import axios from "../../../utils/axios";
import moment from "moment";
import { duration } from "../../../commonComponents/Duration/duration";

import { votingEventActions } from "./event-Slice";

/**
 * @convertAllEventApiStructureToListingData
 * @param {*} data
 * @returns
 */

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

/**
 * @getAllVotingEvents
 * @param {*} eventsLimit
 * @param {*} cb
 * @returns
 */

export const getAllVotingEvents = (eventsLimit, cb) => {
  const sortBy = "startTime";
  const sortOrder = "-1";
  const active = true;
  const excludeUpComing = true;

  return (dispatch) => {
    axios
      .get(
        `/voting-events/listing/all?active=${active}&excludeUpComing=${excludeUpComing}&limit=${eventsLimit}&sortBy=${sortBy}&sortOrder=${sortOrder}&hasNominees=true`
      )
      .then((response) => {
        const { data } = response;
        const eventsList = convertAllEventApiStructureToListingData(data.data);

        dispatch(votingEventActions.setAllEvents(eventsList));
        cb && cb(null, response);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};

/**
 * @getSingleVotingEvent
 * @param {*} eventID
 * @param {*} cb
 * @returns
 */

const convertEventApiStructureToEventData = (data) => {
  const startDateTime = moment(data.startTime, "YYYY/MM/DD");
  const endDateTime = moment(data.endTime, "YYYY/MM/DD");

  const startMonth = startDateTime.format("MMM");
  const startDate = startDateTime.format("D");

  const endMonth = endDateTime.format("MMM");
  const endDate = endDateTime.format("D");

  const { totalVotes } = data;

  const checkBalloting = data.secretBalloting
    ? "Secret Balloting"
    : totalVotes === 1
    ? `<span style="color:#ec1b23">${totalVotes} Vote</span>`
    : `<span style="color:#ec1b23">${totalVotes} Votes</span>`;

  const remainingTime = duration(data);

  const organizationName = data.organization
    ? `Organized by <a href=/organisers/details/${data.organization._id}>${data.organization.name}</a>`
    : null;

  const votePriceButton = remainingTime.eventEnd
    ? "View Results"
    : data.votePrice
    ? `Vote Now (${data.currency ? data.currency : "GHS"}${data.votePrice} )`
    : "Vote Now (Freeee)";

  const eventData = [
    {
      id: data._id,
      votingImage: data.images[0],
      description: data.description,
      startTime: data.startTime,
      votePrice: votePriceButton,
    },
    {
      startAndEndMonth: `${startMonth} - ${endMonth}`,
      startAndEndDate: `${startDate} - ${endDate}`,
      votingEventName: data.name,
      borderBar: null,
      votingOrganization: organizationName,
      secretBalloting: checkBalloting,
      endTime: remainingTime.eventEnd ? "Winner Announced" : remainingTime,
    },
  ];

  return eventData;
};

export const getSingleVotingEvent = (eventID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-events/${eventID}`)
      .then((response) => {
        const { data } = response;

        const eventData = convertEventApiStructureToEventData(data.data);

        dispatch(votingEventActions.setSingleEvent(eventData));
        cb && cb(null, data);
      })
      .catch((error) => {
        cb && cb(error);
      });
  };
};

/**
 * @getVotingEventSatus
 * @param {*} eventID
 * @param {*} cb
 */

const extractEventStatusFromApi = (data) => {
  const remainingTime = duration(data);

  return remainingTime.eventEnd ? remainingTime.eventEnd : false;
};

export const getVotingEventStatus = (eventID, cb) => {
  return (dispatch) => {
    axios
      .get(`/voting-events/${eventID}`)
      .then((response) => {
        const { data } = response;

        const eventStatus = extractEventStatusFromApi(data.data);
        dispatch(votingEventActions.setEventStatus(eventStatus));
        cb && cb(null, data);
      })
      .catch((error) => cb && cb(error));
  };
};
