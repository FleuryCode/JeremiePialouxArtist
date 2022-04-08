import { PortfolioTypes } from "./portfolio.types";

export const setImagesDownloading = (imagesDownloading) => ({
    type: PortfolioTypes.SET_IMAGES_DOWNLOADING,
    payload: imagesDownloading
});

export const setImageData = (imageData) => ({
    type: PortfolioTypes.SET_IMAGE_DATA,
    payload: imageData
});