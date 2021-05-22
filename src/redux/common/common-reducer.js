// Actions
import * as actions from './common-actions';

const initialState = {
    processing: false,
    contentOutsideMainWrapper: false,
    onMouseOver: false,
    onMouseLeave: false
};

const reducer = (state = initialState, action) => {
    let newState = {...state};

    switch (action.type) {
        case actions.PROCESSING:
            setProcessing(newState, action.payload);
            break;
        case actions.CONTENT_OUTSIDE_MAIN_WRAPPER:
            contentOutsideMainWrapper(newState, action.payload);
            break;
        case actions.ON_MOUSE_OVER:
            onMouseOver(newState, action.payload);
            break;
        case actions.ON_MOUSE_LEAVE:
            onMouseLeave(newState, action.payload);
            break;
        default:
            return newState
    }
    return newState;
};

const setProcessing = (state, processing) => {
    state.processing = processing;
};

const contentOutsideMainWrapper = (state, boolean) => {
    state.contentOutsideMainWrapper = boolean;
};

const onMouseOver = (state, boolean) => {
    state.onMouseOver = boolean;
};

const onMouseLeave = (state, boolean) => {
    state.onMouseLeave = boolean;
};

export default reducer;