// Axios
import axios from '../../utils/axios';
// URLs
import {
    WISHLIST_API_GET_IDS,
    WISHLIST_API_TOGGLE,
    GET_WISHLIST_EVENTS
} from '../../utils/config';
import {NOTIFICATION_TIME} from "../../utils/common-utils";
import {NotificationManager} from 'react-notifications';

// Actions
export const ADD_WISHLIST_IDS = 'ACTION_WISHLIST_ADD_IDS';
export const WISHLIST_PROCESSING = 'ACTION_WISHLIST_PROCESSING';
export const RESET_WISHLIST_IDS = 'ACTION_WISHLIST_IDS_RESET';
export const GET_ALL_WISHLIST_EVENTS = 'ACTION_GET_ALL_WISHLIST_EVENTS';

export const resetWishListIds = () => {
    return {
        type: RESET_WISHLIST_IDS,
        payload: null
    }
};
export const addWishListIds = (wishList) => {
    return {
        type: ADD_WISHLIST_IDS,
        payload: wishList
    };
};

const setProcessing = (processing) => {
    return {
        type: WISHLIST_PROCESSING,
        payload: processing
    };
};
export const getWishListIdsFromApi = () => {
    return ((dispatch) => {
        axios.get(WISHLIST_API_GET_IDS)
            .then(respose => {
                dispatch(addWishListIds(respose.data.data));
            })
            .catch(err => {
                console.error("ERR", err);
            })
    });
};

export const wishListToggle = (eventSlotId, dispatchSecond, isRemove, page, cb) => {
    return ((dispatch) => {
        axios.post(WISHLIST_API_TOGGLE, {eventSlotId: eventSlotId})
            .then(respose => {
                const {data} = respose.data;
                dispatch(addWishListIds(data));
                if (dispatchSecond) {
                    dispatch(getWishlistEvents(true, page, 0, 6, true, cb));
                }
                let message =  respose.data && respose.data.isFavorite === true ?
                    'Event has added to wishlist' : 'Event has removed from wishlist';
                NotificationManager.success(message,'',NOTIFICATION_TIME);
            })
            .catch(err => {
                console.error("ERR", err);
            })
    });
};

export const getWishlistEvents = (paginate, page, skip, pageSize, all, cb) => {
    return ((dispatch) => {
        const body = {
            paginate,
            page,
            skip,
            pageSize,
            all,
        };
        dispatch(setProcessing(true));
        axios.post(GET_WISHLIST_EVENTS, body)
            .then(respose => {
                if(page !== 1 && (respose.data && respose.data.data.length < 1) ){
                    dispatch(getWishlistEvents(true, 1, 0, 6, true));
                    cb && cb();
                }
                dispatch(setProcessing(false));
                dispatch({
                    type: GET_ALL_WISHLIST_EVENTS,
                    payload: respose.data
                });
            })
            .catch(err => {
                dispatch({
                    type: GET_ALL_WISHLIST_EVENTS,
                    payload: null
                });
                dispatch(setProcessing(false));
            })
    });
};
