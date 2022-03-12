import { PortfolioTypes } from "./portfolio.types";

export const setImageNames = (imageNameArray) => ({
    type: PortfolioTypes.SET_IMAGE_NAMES,
    payload: imageNameArray
});

export const setImagesDownloading = (imagesDownloading) => ({
    type: PortfolioTypes.SET_IMAGES_DOWNLOADING,
    payload: imagesDownloading
});