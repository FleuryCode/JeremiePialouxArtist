import React from "react";
import './portfolioContainer.styles.scss';
import PortfolioImage from "../portfolioImage/portfolioImage.component";
// Redux
import { connect } from "react-redux";

const PortfolioContainer = ({ imagesDownloading, imageData }) => {

    return (
        <div className="mainPortfolioContainer container-fluid p-0 m-0">
            <div className={`${imagesDownloading ? 'd-none' : 'd-flex'} row py-3 px-0 m-0 portfolioImagesHolder`}>
                {
                    imageData.map((image) => (
                        <div key={image.id} className={`col-12 col-md-6 col-lg-4 p-0 m-0`}>
                            <PortfolioImage image={image} />
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imagesDownloading: state.portfolio.imagesDownloading,
    imageData: state.portfolio.imageData
});


export default connect(mapStateToProps)(PortfolioContainer);