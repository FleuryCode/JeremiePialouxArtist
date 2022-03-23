import React, { useState } from "react";
import './specificPortfolioImages.styles.scss';

const SpecificPortfolioImages = ({ images }) => {
    console.log(images)
    const [activeImage, setActiveImage] = useState(0);
    const handleIconClick = (index) => {
        setActiveImage(index);
    };
    return (
        <div className="specificPortfolioImagesContainer container">
            <div className="row">
                <div className="col-12 imagePickerContainer">
                    <div className="heroPortfolioImage">
                        <img src={images[activeImage]} alt="" />
                    </div>
                    <div className="portfolioImageIcons">
                        {
                            images.map((image, index) => (
                                <img onClick={() => handleIconClick(index)} className={`${(activeImage === index) ? 'active' : ''}`} key={image} src={image} alt="Portfolio piece" />
                            ))
                        }
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SpecificPortfolioImages;