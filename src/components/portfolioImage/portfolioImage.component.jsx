import React from "react";
import './portfolioImage.styles.scss';
import { Link } from "react-router-dom";

const PortfolioImage = ({ image, data}) => {
    console.log(data);
    return (
        <Link to={`/portfolio/${data.link}`} className="portfolioImageContainer">
            <img src={image} alt="Portfolio Piece" />
        </Link>
    );
}

export default PortfolioImage;