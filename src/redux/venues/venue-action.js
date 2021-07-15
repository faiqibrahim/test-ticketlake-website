import axios from '../../utils/axios';
import {NotificationManager} from 'react-notifications';
import {handleError} from "../../utils/store-utils";
import {NOTIFICATION_TIME} from "../../utils/common-utils";
import * as actions from './venue-action-types';
import {
    GET_ALL_VENUE_TYPES,
    GET_NEAREST_VENUES
} from "../../utils/config";

export const getVenueTypes = (cb) => {
    return (dispatch) => {
        axios.get(GET_ALL_VENUE_TYPES)
            .then(response => {
                const {data} = response.data;
                dispatch(setVenueTypes(data));
                cb && cb();
            })
            .catch(err => {
                console.error('err', err);
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    }
};

export const getNearByCinemas = (latitude, longitude, cb,categories) => {
    return (dispatch, getState) => {
        const {venueTypes} = getState().venue;
        let venueTypeID = '';

        for (let i = 0; i < venueTypes.length; i++) {
            if (venueTypes[i].name.toLowerCase().includes('cinema'.toLowerCase())) {
                venueTypeID = venueTypes[i]._id
            }
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                    latitude = position.coords.latitude;
                    longitude = position.coords.longitude;

                    if(venueTypeID !== ''){
                        let JSONObj = {
                            venueTypes: [venueTypeID],
                            latitude: latitude,
                            longitude: longitude,
                            categories:categories
                        };
                        axios.post(`${GET_NEAREST_VENUES}?paginate=true&page=1&skip=30`, JSONObj)
                            .then(response => {
                                const {data} = response.data;
                                dispatch(setNearByCinemas(data));
                                cb && cb(data)
                            })
                            .catch(err => {
                                console.error('err', err);
                                let errorMessage = handleError(err);
                                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
                            });
                    }
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

const setVenueTypes = (payload) => {
    return {
        type: actions.ALL_VENUE_TYPES,
        payload
    }
};

const setNearByCinemas = (payload) => {
    return {
        type: actions.ALL_NEAREST_VENUES,
        payload
    }
};
