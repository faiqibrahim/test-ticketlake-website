import * as actions from './venue-action-types';

const initState = {
    venueTypes: [],
    nearByCinemas: []
};

const reducer = (state = initState, action) => {
    let newState = {...state};

    switch (action.type) {
        case actions.ALL_VENUE_TYPES:
            setVenueTypes(newState, action.payload);
            break;
        case actions.ALL_NEAREST_VENUES:
            setNearestVenues(newState, action.payload);
            break;
        default : {
            // do nothing
        }
    }
    return newState;
};

const setVenueTypes = (state, data) => {
    state.venueTypes = data;
};

const setNearestVenues = (state, data) => {
    state.nearByCinemas = data;
};

export default reducer;

