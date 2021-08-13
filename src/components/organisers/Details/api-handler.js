import axios from "../../../utils/axios";

export const filterOptions = [
  { option: "All", value: "all" },
  { option: "Today", value: "today" },
  { option: "Tomorrow", value: "tomorrow" },
  { option: "Next 7 days", value: "next7Days" },
  { option: "Next 30 days", value: "next30Days" },
];

export const eventsFilterOption = [
  { option: "All", value: "all" },
  { option: "Active", value: "active" },
  { option: "Past", value: "past" },
];

export const getOrganiserData = (_id) => {
  const url = `/organizations/detail/${_id}`;
  return axios.get(url);
};
