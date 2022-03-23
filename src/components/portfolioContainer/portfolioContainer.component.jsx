import React from "react";
import './portfolioContainer.styles.scss';
import ImageLoading from "../imagesLoading/imageLoading.component";
import PortfolioImage from "../portfolioImage/portfolioImage.component";
// Redux
import { connect } from "react-redux";

const PortfolioContainer = ({ imagesDownloading, imagesUrls, imageData }) => {

    return (
        <div className="mainPortfolioContainer container-fluid p-0 m-0">
            <div className="row p-0 m-0">
                <div className="col-12 d-flex justify-content-center my-3">
                    <h2>PORTFOLIO</h2>
                </div>
            </div>
            <div className={`${imagesDownloading ? 'd-flex justify-content-center' : 'd-none'} row py-3 px-0 m-0`}>
                {
                    imageData.map(name => (
                        <div key={name.imageName} className="col-12 col-md-4">
                            <ImageLoading />
                        </div>
                    ))
                }
            </div>
            <div className={`${imagesDownloading ? 'd-none' : 'd-flex'} row py-3 px-0 m-0`}>
                {
                    imagesUrls.map((url, index) => (
                        <div key={url} className="col-12 col-md-6 col-lg-4 p-0 m-0">
                            <PortfolioImage image={url} data={imageData[index]} />
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imagesDownloading: state.portfolio.imagesDownloading,
    imagesUrls: state.portfolio.imagesUrls,
    imageData: state.portfolio.imageData
});


export default connect(mapStateToProps)(PortfolioContainer);