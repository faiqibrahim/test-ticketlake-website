
export const CHANGE_LANGUAGE = 'ACTION_CHANGE_LANGUAGE';

export const setLanguage = (props)=>{
    return{
        type:CHANGE_LANGUAGE,
        payload:props
    }
};
