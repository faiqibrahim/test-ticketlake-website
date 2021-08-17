import axios from "../../../utils/axios";

export const filterOptions = [
  { option: "All", value: "all" },
  { option: "Today", value: "today" },
  { option: "Tomorrow", value: "tomorrow" },
  { option: "Next 7 days", value: "week" },
  { option: "Next 30 days", value: "month" },
];

export const eventsFilterOption = [
  { option: "All", value: "all" },
  { option: "Active", value: "true" },
  { option: "Past", value: "false" },
];

export const getOrganiserData = (_id) => {
  const url = `/organizations/detail/${_id}`;
  return axios.get(url);
};

export const saveReviewInDB = (organizationId, review, rating) => {
  const url = "/organizations/review/save";

  return axios.post(url, { organizationId, review, rating });
};

export const getOrganisationEvents = (_id, active, timeframe) => {
  const url = `/events/fetch-org-events/${_id}?&active=${active}&timeframe=${timeframe}`;
  return axios.get(url);
};
