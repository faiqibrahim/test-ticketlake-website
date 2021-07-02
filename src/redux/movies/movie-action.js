import axios from '../../utils/axios';
import {NotificationManager} from 'react-notifications';
import {handleError} from "../../utils/store-utils";
import {NOTIFICATION_TIME} from "../../utils/common-utils";
import * as actions from './movie-action-types';
import {
    GET_TRENDING_EVENTS,
    GET_SHOWING_IN_CINEMAS_EVENTS,
    GET_UPCOMING_EVENTS,
    GET_NEAR_BY_EVENTS,
    GET_ALL_SUB_CATEGORIES,
    GET_SUB_CATEGORY_EVENTS,
    SHOWING_IN_CINEMAS,
    UPCOMING_EVENTS_FOR_CINEMA,
    PROMOTED_EVENTS_FOR_CINEMA,
    TRENDING_EVENTS_FOR_CINEMA,
    SERVER_API_VERSION
} from "../../utils/config";

export const getTrendingEvents = (categoryId, paginate = true, page = 1, skip = 0, pageSize = 4, callback) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        isFeatured: true
    };
    return (dispatch, getState) => {
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        axios.post(GET_TRENDING_EVENTS, JSONObj, SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setTrendingEvents(data && data.data));
                callback && callback(data);
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const getShowingInCinemasEvents = (categoryId, paginate = true, page = 1, skip = 0, pageSize = 4, callback) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        upcoming: false
    };

    return (dispatch, getState) => {
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        axios.post(GET_SHOWING_IN_CINEMAS_EVENTS, JSONObj, SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setShowingInCinemasEvents(data && data.data));
                callback && callback(data);
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const getUpcomingEvents = (categoryId, paginate = true, page = 1, skip = 0, pageSize = 4, callback) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        upcoming: true
    };

    return (dispatch, getState) => {
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        axios.post(GET_UPCOMING_EVENTS, JSONObj, SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setUpcomingEvents(data && data.data));
                callback && callback(data);
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const getNearByEvents = (categoryId, paginate = true, page = 1, skip = 0, pageSize = 4, callback) => {
    return (dispatch, getState) => {
        let latitude = '', longitude = '';
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;
                    let JSONObj = {
                        paginate: paginate,
                        page: page,
                        skip: skip,
                        pageSize: pageSize,
                        categories: [categoryId],
                        latitude: latitude,
                        longitude: longitude
                    };
                    let eventsCountry = getState().user.eventsCountry;
                    JSONObj.country = eventsCountry.label;
                    axios.post(GET_NEAR_BY_EVENTS, JSONObj, SERVER_API_VERSION)
                        .then(response => {
                            const data = response.data;
                            dispatch(setNearByEvents(data && data.data));
                            callback && callback(data);
                        })
                        .catch(err => {
                            console.error('err', err);
                        });

                },
                () => {
                    console.log("Location Error!")
                },
                {
                    enableHighAccuracy: true
                });
        } else {
            console.log("Browser Location is block, Allow Browser location for this page!")
        }
    }
};

export const getAllSubCategories = (categoryId) => {
    return (dispatch) => {
        axios.get(GET_ALL_SUB_CATEGORIES + categoryId, 'v2')
            .then(response => {
                const {data} = response.data;
                dispatch(setAllSubCategories(data && data.children));
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const getSubCategoriesEvents = (categoryId, paginate = true, page = 1, skip = 0, pageSize = 4, cb) => {

    let categories = (Array.isArray(categoryId)) ? categoryId:[categoryId];
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories:categories
    };

    return (dispatch, getState) => {
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        axios.post(GET_SUB_CATEGORY_EVENTS, JSONObj, SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setSubCategoryEvents(data && data.data));
                cb && cb(data);
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const showingInCinema = (categoryId, cinemaId, paginate = true, page = 1, skip = 0, pageSize = 50) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        upcoming: false,
        venues: [cinemaId]
    };

    return (dispatch, getState) => {
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        dispatch(setProcessing(true));
        axios.post(SHOWING_IN_CINEMAS, JSONObj, SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setShowingInCinemaInfo(data && data.data))
                dispatch(setProcessing(false));
            })
            .catch(err => {
                dispatch(setProcessing(false));
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};


export const upcomingEventsForCinema = (categoryId, cinemaId, paginate = true, page = 1, skip = 0, pageSize = 50) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        upcoming: true,
        venues: [cinemaId]
    };
    return (dispatch, getState) => {
        dispatch(setProcessing(true));
        let eventsCountry = getState().user.eventsCountry;
        JSONObj.country = eventsCountry.label;
        axios.post(UPCOMING_EVENTS_FOR_CINEMA, JSONObj,SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setUpcomingEventsForCinema(data && data.data));
                dispatch(setProcessing(false));

            })
            .catch(err => {
                dispatch(setProcessing(false));
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};


export const promotedEventsForCinema = (categoryId, cinemaId, paginate = true, page = 1, skip = 0, pageSize = 50) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        isFeatured: true,
        venues: [cinemaId]
    };
    return (dispatch) => {
        dispatch(setProcessing(true));
        axios.post(PROMOTED_EVENTS_FOR_CINEMA, JSONObj,SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setPromotedEventsForCinema(data && data.data));
                dispatch(setProcessing(false));
            })
            .catch(err => {
                dispatch(setProcessing(false));
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const trendingEventsForCinema = (categoryId, cinemaId, paginate = true, page = 1, skip = 0, pageSize = 50) => {
    let JSONObj = {
        paginate: paginate,
        page: page,
        skip: skip,
        pageSize: pageSize,
        categories: [categoryId],
        venues: [cinemaId]
    };
    return (dispatch) => {
        dispatch(setProcessing(true));
        axios.post(TRENDING_EVENTS_FOR_CINEMA, JSONObj,SERVER_API_VERSION)
            .then(response => {
                const data = response.data;
                dispatch(setTrendingEventsForCinema(data && data.data));
                dispatch(setProcessing(false));
            })
            .catch(err => {
                dispatch(setProcessing(false));
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

const setTrendingEvents = (payload) => {
    return {
        type: actions.ALL_TRENDING_EVENTS,
        payload
    }
};

const setShowingInCinemasEvents = (payload) => {
    return {
        type: actions.ALL_SHOWING_IN_CINEMAS_EVENTS,
        payload
    }
};

const setUpcomingEvents = (payload) => {
    return {
        type: actions.ALL_UPCOMING_EVENTS,
        payload
    }
};

const setNearByEvents = (payload) => {
    return {
        type: actions.ALL_NEAR_BY_EVENTS,
        payload
    }
};

const setAllSubCategories = (payload) => {
    return {
        type: actions.SET_ALL_SUB_CATEGORIES,
        payload
    }
};

const setSubCategoryEvents = (payload) => {
    return {
        type: actions.SET_SUB_CATEGORY_EVENTS,
        payload
    }
};

const setShowingInCinemaInfo = (payload) => {
    return {
        type: actions.SET_SHOWING_IN_CINEMA_INFO,
        payload
    }
};

const setUpcomingEventsForCinema = (payload) => {
    return {
        type: actions.SET_UPCOMING_EVENTS_FOR_CINEMA,
        payload
    }
};

const setPromotedEventsForCinema = (payload) => {
    return {
        type: actions.SET_PROMOTED_EVENTS_FOR_CINEMA,
        payload
    }
};

const setTrendingEventsForCinema = (payload) => {
    return {
        type: actions.SET_TRENDING_EVENTS_FOR_CINEMA,
        payload
    }
};

export const setCatSecId = (payload, cb) => {
    cb && cb();
    return {
        type: actions.SET_CATEGORY_AND_SECTION_ID,
        payload
    }
};

export const setProcessing = (processing) => {
    return {
        type: actions.PROCESSING,
        payload: processing
    };
};

export const setCinemaData = (payload) => {
    return {
        type: actions.CINEMA_DATA,
        payload
    };
};