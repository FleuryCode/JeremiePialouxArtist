import { TextTypes } from "./text.types";

export const setTextData = (textInfo) => ({
    type: TextTypes.SET_TEXT_DATA,
    payload: textInfo
});