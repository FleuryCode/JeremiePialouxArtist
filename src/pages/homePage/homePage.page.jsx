import React, { useEffect } from "react";
import PortfolioContainer from "../../components/portfolioContainer/portfolioContainer.component";
import { useLocation } from 'react-router-dom'
import './homePage.styles.scss';
import Jumbotron, { JumbotronItem } from "../../components/jumbotron/jumbotron.component";
import testImageOne from '../../assets/testImageOne.jpg';
import testImageTwo from '../../assets/testImageTwo.jpeg';
import testImageThree from '../../assets/testImageThree.jpeg';

const HomePage = () => {
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
                <div className="col-8 d-flex flex-column p-5 mx-auto">
                    <h4 className="px-5">Mon Art</h4>
                    <h5 className="px-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eos nisi culpa nam perferendis, ullam magni ab facilis delectus explicabo, ex fuga impedit ratione dolore odio. Quo sapiente vel sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate, voluptatem eveniet consequuntur iusto veritatis officiis corporis nam ab, autem, ipsa nisi. Illum quaerat repellat beatae aperiam doloribus. Natus, tempore? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nisi dolores excepturi ex aliquid ut beatae, praesentium esse nobis molestiae tempore deserunt itaque, architecto, nihil consectetur unde sapiente eum repellat.</h5>
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

export default HomePage;
