import * as actions from './category-action-types';


const initState = {
    categories: [],
    selectedCategories:[{title:"Movies",link:"/movies"}],
    parentCategories : null,
    childCategories : null,
    categoryProcessing: false,
};

const reducer = (state = initState, action) => {
    let newState = {...state};

    switch (action.type) {
        case actions.ALL_CATEGORIES:
            setCategories(newState, action.payload);
            break;

        case actions.SET_PARENT_CATEGORIES:
            setParentCategories(newState, action.payload);
            break;

        case actions.SET_CHILD_CATEGORIES:
            setChildCategories(newState, action.payload);
            break;

        case actions.SET_CATEGORY_PROCESSING:
            setCategoryProcessing(newState, action.payload);
            break;
        default : {
            // do nothing
        }
    }
    return newState;
};

const setCategories = (state, data) => {
    state.categories = data;
};

const setParentCategories = (state, data) => {
    state.parentCategories = data;
};
const setChildCategories = (state, data) => {
    state.childCategories = data;
};

const setCategoryProcessing = (state, data) => {
    state.categoryProcessing  = data;
};

export default reducer;

