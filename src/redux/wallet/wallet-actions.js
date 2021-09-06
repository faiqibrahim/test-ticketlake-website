import axios from "../../utils/axios";

// URLs
import { GET_WALLET_TRANSACTION_HISTORY } from "../../utils/config";

export const SET_WALLET_TRANSACTION = "ACTION_SET_WALLET_TRANSACTION";
export const SET_WALLET_PAGINATION = "ACTION_SET_WALLET_PAGINATION";
export const PROCESSING = "ACTION_WALLET_PROCESSING";
export const PAGINATION_PROCESSING = "ACTION_WALLET_PAGINATION_PROCESSING";

export const getTransactionHistory = (page, pageSize) => {
  return (dispatch) => {
    if (parseInt(page) > 1) {
      dispatch(setPaginationProcessing(true));
    } else {
      dispatch(setProcessing(true));
    }
    axios
      .post(
        GET_WALLET_TRANSACTION_HISTORY,
        { paginate: true, page, pageSize },
        "v2"
      )
      .then((response) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }

        const { data } = response.data;

        dispatch({
          type: SET_WALLET_TRANSACTION,
          payload: {
            data,
            page: page,
          },
        });
        dispatch({
          type: SET_WALLET_PAGINATION,
          payload: response.data,
        });
      })
      .catch((err) => {
        if (parseInt(page) > 1) {
          dispatch(setPaginationProcessing(false));
        } else {
          dispatch(setProcessing(false));
        }
        console.error("Err:", err);
      });
  };
};

const setProcessing = (processing) => {
  return {
    type: PROCESSING,
    payload: processing,
  };
};

const setPaginationProcessing = (processing) => {
  return {
    type: PAGINATION_PROCESSING,
    payload: processing,
  };
};
