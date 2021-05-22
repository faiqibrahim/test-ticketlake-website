import {CHANGE_LANGUAGE} from './multilingual-actions';

const LS_KEY_ACTIVE_LANG = 'ACTIVE_LANGUAGE';
const getActiveLanguage = () => localStorage.getItem(LS_KEY_ACTIVE_LANG) || "en";

const initState = () => {
    let initState = {
        activeLanguage: '',
        activeLanguageData: {},
    };

    let activeLang = getActiveLanguage();
    initState.activeLanguageData = initState[activeLang];
    initState.activeLanguage = activeLang;

    return initState;
};

export default function (state = initState(), action) {
    let newState = {...state};

    switch (action.type) {
        case CHANGE_LANGUAGE:
            updateLanguage(newState, action.payload);
            break;
        default :
            break;
    }
    return newState;
}

const updateLanguage = (state, language) => {
    // state.activeLanguageData = {...homePage[language]};
    state.activeLanguage = language;
    localStorage.setItem(LS_KEY_ACTIVE_LANG, state.activeLanguage)
};