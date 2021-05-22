// Action Constants
export const PROCESSING = 'ACTION_COMMON_PROCESSING';
export const CONTENT_OUTSIDE_MAIN_WRAPPER = 'CONTENT_OUTSIDE_MAIN_WRAPPER';
export const ON_MOUSE_OVER = 'ON_MOUSE_OVER';
export const ON_MOUSE_LEAVE = 'ON_MOUSE_LEAVE';

export const setProcessing = (processing) => {
    return {
        type: PROCESSING,
        payload: processing
    }
};

export const showContentOutsideMainWrapper = (boolean) => {
    return {
        type: CONTENT_OUTSIDE_MAIN_WRAPPER,
        payload: boolean
    }
};

export const setOnMouseOver = (boolean) => {
    return {
        type: ON_MOUSE_OVER,
        payload: boolean
    }
};

export const setOnMouseLeave = (boolean) => {
    return {
        type: ON_MOUSE_LEAVE,
        payload: boolean
    }
};