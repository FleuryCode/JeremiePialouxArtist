import React from 'react';
import './portfolio.styles.scss';
import PortfolioContainer from '../../components/portfolioContainer/portfolioContainer.component';
import { useEffect } from 'react';

const PortfolioPage = () => {
  useEffect(() => {
    document.title = `Kamonn | Artiste`;
    document
      .querySelector('meta[name="description"]')
      .setAttribute(
        'content',
        `Kamonn est un peintre basé à Paris, France. Travailler avec des styles abstraits. Les couleurs vives et le design créent des émotions stimulantes.`
      );
  });
  return (
    <div className="portfolioPageContainer">
      <PortfolioContainer />
    </div>
  );
};

export default PortfolioPage;
