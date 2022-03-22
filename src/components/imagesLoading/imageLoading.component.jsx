import React from "react";
import './imageLoading.styles.scss';

const ImageLoading = () => {
    return (
        <div className="imageLoadingContainer">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default ImageLoading;