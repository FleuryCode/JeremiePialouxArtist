import { PortfolioTypes } from "./portfolio.types";

const INITIAL_STATE = {
    imagesDownloading: true,
    imageData: []
};

const portfolioReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PortfolioTypes.SET_IMAGES_DOWNLOADING:
            return {
                ...state,
                imagesDownloading: action.payload
            };
        case PortfolioTypes.SET_IMAGE_DATA:
            return {
                ...state,
                imageData: action.payload
            };
        default:
            return state;
    };
};

export default portfolioReducer;