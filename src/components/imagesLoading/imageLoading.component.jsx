import React from "react";
import './imageLoading.styles.scss';

const ImageLoading = () => {
    return (
        <div className="imageLoadingContainer">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default ImageLoading;