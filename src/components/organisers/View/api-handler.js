import axios from "../../../utils/axios";

export const getOrganisationdata = (countryCode, page) => {
  const url = `/organizations/get-organizations-paginated-data?country=${countryCode}&page=${page}&limit=10`;
  return axios.get(url);
};
