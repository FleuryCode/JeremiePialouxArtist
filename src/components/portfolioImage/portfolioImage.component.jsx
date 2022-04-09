import React from "react";
import './portfolioImage.styles.scss';
import { Link } from "react-router-dom";

const PortfolioImage = ({ image }) => {
    return (
        <div className="portfolioImageContainer">
            <Link to={`/portfolio/${image.link}`} className="portfolioImageLink">
                <img src={image.src} alt="Portfolio Piece" />
            </Link>
        </div>

    );
}

export default PortfolioImage;