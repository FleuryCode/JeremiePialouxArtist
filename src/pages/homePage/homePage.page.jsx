import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom'
import './homePage.styles.scss';
import Jumbotron, { JumbotronItem } from "../../components/jumbotron/jumbotron.component";
import PortfolioContainer from "../../components/portfolioContainer/portfolioContainer.component";
// Redux
import { connect } from "react-redux";
import testImageOne from '../../assets/testImageOne.jpg';
import testImageTwo from '../../assets/testImageTwo.jpeg';
import testImageThree from '../../assets/testImageThree.jpeg';

const HomePage = ({textData}) => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
        };
    }, [location]);


    return (
        <div className="homepageContainer container-fluid">
            <div className="row">
                <div className="col-12 p-0 d-flex justify-content-center">
                    <Jumbotron>
                        <JumbotronItem image={testImageOne} />
                        <JumbotronItem image={testImageTwo} />
                        <JumbotronItem image={testImageThree} />
                    </Jumbotron>
                </div>
            </div>
            <div className="row p-0 mt-4">
                <div className="col-12 d-flex flex-column p-5 mx-auto">
                    <h1 className="px-2">Mon Art</h1>
                    <h5 className="px-2">{textData.homeInfo}</h5>
                </div>
            </div>
            <div id="portfolio" className="row p-0">
                <div className="col-12 p-0">
                    <PortfolioContainer />
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(HomePage);
