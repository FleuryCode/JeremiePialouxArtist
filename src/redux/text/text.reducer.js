import { TextTypes } from "./text.types";

const INITIAL_STATE = {
    textData: {},
    language: 'FR'
};

const textReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TextTypes.SET_TEXT_DATA:
            return {
                ...state,
                textData: action.payload
            }
        case TextTypes.SET_TEXT_LANG:
            return {
                ...state,
                language: action.payload
            }
        default:
            return state;
    };
}

export default textReducer;