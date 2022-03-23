import React from "react";
import './portfolioImage.styles.scss';
import { Link } from "react-router-dom";

const PortfolioImage = ({ image }) => {
    const handleClick = (data) => {
        console.log(data);
    };
    return (
        <div onClick={() => handleClick(image)} className="portfolioImageContainer">
            <img src={image} alt="Portfolio Piece" />
        </div>
    );
}

export default PortfolioImage;