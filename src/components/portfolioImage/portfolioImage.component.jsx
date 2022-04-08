import React from "react";
import './portfolioImage.styles.scss';
import { Link } from "react-router-dom";

const PortfolioImage = ({image}) => {
    return (
        <Link to={`/portfolio/${image.link}`} className="portfolioImageContainer">
            <img src={image.src} alt="Portfolio Piece" />
        </Link>
    );
}

export default PortfolioImage;