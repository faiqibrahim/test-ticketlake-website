import {
    ADD_WISHLIST_IDS,
    WISHLIST_PROCESSING,
    RESET_WISHLIST_IDS,
    GET_ALL_WISHLIST_EVENTS,
} from './wishlist-actions';

const initialState = {
    wishListIds: null,
    wishList: null,
    processing: false
};

const reducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {

        case ADD_WISHLIST_IDS:
            setWishListIds(newState, action.payload);
            break;
        case WISHLIST_PROCESSING:
            setProcessing(newState, action.payload);
            break;
        case GET_ALL_WISHLIST_EVENTS:
            getAllWishlistEvents(newState, action.payload);
            break;
        case RESET_WISHLIST_IDS:
            resetWishListIds(newState);
            break;
        default:
            return newState;

    }

    return newState;
};

const resetWishListIds = (state) => {
    state.wishListIds = null;
};
const setWishListIds = (state, wishListIds) => {
    state.wishListIds = wishListIds;
};
const getAllWishlistEvents = (state, data) => {
    state.wishList = data;
};
const setProcessing = (state, processing) => {
    state.processing = processing;
};
export default reducer;