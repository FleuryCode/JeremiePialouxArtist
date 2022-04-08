import React from "react";
import './about.styles.scss';
// Redux
import { connect } from "react-redux";

const AboutPage = ({ textData }) => {
    return (
        <div className="aboutPageContainer container-fluid">
            <div className="row aboutInfo">
                <div className="col-12">
                    <h1>A Propos</h1>
                </div>
                <div className="col-12">
                    <p>{textData.aboutInfo}</p>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData
});

export default connect(mapStateToProps)(AboutPage);