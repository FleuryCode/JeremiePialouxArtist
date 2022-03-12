import React from "react";
import './portfolioImage.styles.scss';

const PortfolioImage = ({ image }) => {
    return (
        <div className="portfolioImageContainer">
            <img src={image} alt="Portfolio Piece" />
        </div>
    );
}

export default PortfolioImage;