import React from "react";
import './portfolio.styles.scss';
import PortfolioContainer from "../../components/portfolioContainer/portfolioContainer.component";
import PortfolioPiece from "../../components/portfolioPiece/portfolioPiece.component";

const PortfolioPage = () => {
    return (
        <div className="portfolioPageContainer">
            <PortfolioPiece />
            <PortfolioContainer />
        </div>
    );
}

export default PortfolioPage;