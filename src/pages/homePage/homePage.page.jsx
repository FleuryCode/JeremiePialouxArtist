import React, { useEffect, useState } from "react";
import PortfolioContainer from "../../components/portfolioContainer/portfolioContainer.component";
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
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setImageNames: imageNameArray => dispatch(setImageNames(imageNameArray))
});

export default connect(null, mapDispatchToProps)(HomePage);
