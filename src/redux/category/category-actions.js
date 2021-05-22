import axios from '../../utils/axios';
import {NotificationManager} from 'react-notifications';
import {handleError} from "../../utils/store-utils";
import {NOTIFICATION_TIME} from "../../utils/common-utils";
import * as actions from './category-action-types';

// Setting Version 1 Categories which does not include n level
const setCategories = (payload) => {
    return {
        type: actions.ALL_CATEGORIES,
        payload
    }
};

// Setting Parent Categories
const setParentCategories = (payload) => {
    return {
        type: actions.SET_PARENT_CATEGORIES,
        payload
    }
};

// Setting Child Categories
const setChildCategories = (payload) => {
    return {
        type: actions.SET_CHILD_CATEGORIES,
        payload
    }
};

// Setting Processing
const setCategoryProcessing = (payload) => {
    return {
        type: actions.SET_CATEGORY_PROCESSING,
        payload
    }
};

// Fetching Categories for search & nav which does not have images
export const getAllCategories = (cb, version = 'v1') => {
    return (dispatch) => {
        axios.get('/categories/get-all-categories', version)
            .then(response => {
                if (version === 'v2') {
                    if(response.data && response.data.data){
                        cb && cb(response.data.data);
                    }else{
                        cb && cb([]);
                    }

                } else {
                    dispatch(setCategories(response.data.data));
                }
            })
            .catch((err) => {
                dispatch(setCategories([]));
                let errorMessage = handleError(err);
                NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
            });
    };
};

// Fetching Parent Categories which have images
export const fetchParentCategories = (version = 'v2') => {
    return (dispatch) => {
        dispatch(setCategoryProcessing(true));
        axios.get('/categories/get-all-parent-categories', version)
            .then(response => {
                dispatch(setParentCategories(response.data.data));

            }).catch(err => {
            dispatch(setCategoryProcessing(false));
            let errorMessage = handleError(err);
            NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
        })
    }
};

// Fetching Child Categories which have images
export const fetchChildCategories = (parentId,cb, version = 'v2') => {
    return (dispatch) => {
        dispatch(setCategoryProcessing(true));
        axios.get(`/categories/get-all-sub-categories/${parentId}`, version)
            .then(response => {
                cb && cb();
                dispatch(setCategoryProcessing(false));
                dispatch(setChildCategories(response.data && response.data.data));

            }).catch(err => {
            dispatch(setCategoryProcessing(false));
            let errorMessage = handleError(err);
            NotificationManager.error(errorMessage, '', NOTIFICATION_TIME);
        })
    }
};