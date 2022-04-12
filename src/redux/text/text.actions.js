import { TextTypes } from "./text.types";

export const setTextData = (textInfo) => ({
    type: TextTypes.SET_TEXT_DATA,
    payload: textInfo
});

export const setTextLang = (lang) => ({
    type: TextTypes.SET_TEXT_LANG,
    payload: lang
});