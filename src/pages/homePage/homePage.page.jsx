import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './homePage.styles.scss';
import Jumbotron, {
  JumbotronItem,
} from '../../components/jumbotron/jumbotron.component';
import PortfolioContainer from '../../components/portfolioContainer/portfolioContainer.component';
// Redux
import { connect } from 'react-redux';
import HeroImageOne from '../../assets/heroImageOne.jpg';
import HeroImageTwo from '../../assets/heroImageTwo.jpg';
import HeroImageThree from '../../assets/heroImageThree.jpg';

const HomePage = ({ textData, language }) => {
  // Smooth Scrolling to Portfolio
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      const elementPosition = elem.getBoundingClientRect().top;
      const scrollPosition = elementPosition - 80;
      if (elem) {
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [location]);

  //SEO
  useEffect(() => {
    if (language === 'FR') {
      document.title = `Kamonn | Artiste`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          `Kamonn est un peintre basé à Paris, France. Travailler avec des styles abstraits. Les couleurs vives et le design créent des émotions stimulantes.`
        );
    } else {
      document.title = `Kamonn | Artist in Paris`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          `Kamonn is  a painter based out of Paris, France. Working with abstract styles. Bright colors and design create thought provoking emotions.`
        );
    }
  }, [language]);

  // Setting up HomeInfo
  let homeInfo = '';
  if (language === 'FR') {
    homeInfo = textData.homeInfo;
  } else {
    homeInfo = textData.homeInfoEn;
  }

  return (
    <div className="homepageContainer container-fluid">
      <div className="row">
        <div className="col-12 p-0 d-flex justify-content-center">
          <Jumbotron>
            <JumbotronItem image={HeroImageOne} />
            <JumbotronItem image={HeroImageTwo} />
            <JumbotronItem image={HeroImageThree} />
          </Jumbotron>
        </div>
      </div>
      <div className="row p-0 mt-4">
        <div className="col-12 d-flex flex-column mx-auto mainInfoBox">
          <h1 className="px-2">{language === 'FR' ? 'Mon Art' : 'My Art'}</h1>
          <h5 className="px-2">{homeInfo}</h5>
        </div>
      </div>
      <div id="portfolio" className="row p-0 mx-auto">
        <div className="col-12 p-0">
          <PortfolioContainer />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  textData: state.text.textData,
  language: state.text.language,
});

export default connect(mapStateToProps)(HomePage);
