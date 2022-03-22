import React, { useEffect, useState } from "react";
import PortfolioContainer from "../../components/portfolioContainer/portfolioContainer.component";
import { useLocation } from 'react-router-dom'
import './homePage.styles.scss';
import { db } from "../../firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setImageNames } from "../../redux/portfolio/portfolio.actions";
import Jumbotron, { JumbotronItem } from "../../components/jumbotron/jumbotron.component";
import testImageOne from '../../assets/testImageOne.jpg';
import testImageTwo from '../../assets/testImageTwo.jpeg';
import testImageThree from '../../assets/testImageThree.jpeg';

const HomePage = ({ setImageNames }) => {
    const location = useLocation();
    useEffect(()=> {
        if (location.hash) {
            let elem = document.getElementById(location.hash.slice(1))
            if (elem) {
                elem.scrollIntoView({behavior: "smooth"})
            }
        } else {
        window.scrollTo({top:0 ,left:0, behavior: "smooth"})
        };
}, [location,])
    const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
        const data = doc.data().images;
        // Organizing based on ID.
        data.sort((a, b) => {
            return a.id - b.id;
        });
        let imageNameArray = [];
        data.forEach((image) => {
            imageNameArray.push(image.imageName);
        });
        setImageNames(imageNameArray);

    });

    useEffect(() => {
        dataArray();
    });


    return (
        <div className="homepageContainer container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <Jumbotron>
                        <JumbotronItem image={testImageOne} />
                        <JumbotronItem image={testImageTwo} />
                        <JumbotronItem image={testImageThree} />
                    </Jumbotron>
                </div>
            </div>
            <div className="row p-0 mt-4">
                <div className="col-12 p-5">
                    <h4 className="px-5">Mon Art</h4>
                    <p className="px-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit eos nisi culpa nam perferendis, ullam magni ab facilis delectus explicabo, ex fuga impedit ratione dolore odio. Quo sapiente vel sed? Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita voluptate, voluptatem eveniet consequuntur iusto veritatis officiis corporis nam ab, autem, ipsa nisi. Illum quaerat repellat beatae aperiam doloribus. Natus, tempore? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium nisi dolores excepturi ex aliquid ut beatae, praesentium esse nobis molestiae tempore deserunt itaque, architecto, nihil consectetur unde sapiente eum repellat.</p>
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

const mapDispatchToProps = (dispatch) => ({
    setImageNames: imageNameArray => dispatch(setImageNames(imageNameArray))
});

export default connect(null, mapDispatchToProps)(HomePage);
