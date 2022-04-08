import { combineReducers } from "redux";
import portfolioReducer from './portfolio/portfolio.reducer';
import textReducer from "./text/text.reducer";

export default combineReducers({
    portfolio: portfolioReducer,
    text: textReducer
});