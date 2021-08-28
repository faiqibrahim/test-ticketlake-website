import axios from "axios";
import { SERVER_URL } from "./config";
import store from "../redux/store";

const getOptions = () => {
  return {
    headers: {
      "X-Auth": store.getState().user.token,
      "x-version": 2.5,
    },
  };
};

const prepareUrl = (api, version) => SERVER_URL + version + api;

const wrapper = {
  get: (api, version = "v1") =>
    axios.get(prepareUrl(api, version), getOptions()),
  post: (api, formData = {}, version = "v1") =>
    axios.post(prepareUrl(api, version), formData, getOptions()),
  put: (api, formData = {}, version = "v1") =>
    axios.put(prepareUrl(api, version), formData, getOptions()),
  delete: (api, version = "v1") =>
    axios.delete(prepareUrl(api, version), getOptions()),
};

export default wrapper;
