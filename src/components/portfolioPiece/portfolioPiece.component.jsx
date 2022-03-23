import React from "react";
import './portfolioPiece.styles.scss';
import { useLocation } from "react-router-dom";
// Redux
import { connect } from "react-redux";

const PortfolioPiece = ({imageData}) => {
    const location = useLocation().pathname;
    let data = {}
    for (let i = 0; i < imageData.length; i++) {
        if (location === `/portfolio/${imageData[i].link}`) {
            data = imageData[i];
        }
    };

    console.log(data);
    
    
    return (
        <div className="portfolioPieceContainer">
            test
        </div>
    );
}

const mapStateToProps = (state) => ({
    imageData: state.portfolio.imageData
});

export default connect(mapStateToProps)(PortfolioPiece);