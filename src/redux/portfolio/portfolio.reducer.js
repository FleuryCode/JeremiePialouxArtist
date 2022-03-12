import { PortfolioTypes } from "./portfolio.types";

const INITIAL_STATE = {
    imageNames: [],
    imagesDownloading: false
};

const portfolioReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PortfolioTypes.SET_IMAGE_NAMES:
            return {
                ...state,
                imageNames: action.payload
            };
        case PortfolioTypes.SET_IMAGES_DOWNLOADING:
            return {
                ...state,
                imagesDownloading: action.payload
            };
        default:
            return state;
    };
};

export default portfolioReducer;