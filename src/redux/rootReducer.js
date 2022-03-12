import { combineReducers } from "redux";
import portfolioReducer from './portfolio/portfolio.reducer';

export default combineReducers({
    portfolio: portfolioReducer
});