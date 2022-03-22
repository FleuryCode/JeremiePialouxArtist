import React, { useEffect } from "react";
import './portfolioContainer.styles.scss';
import { storage } from '../../firebase/firebase.utils';
import { connect } from "react-redux";
import { setImagesDownloading, setImagesUrls } from "../../redux/portfolio/portfolio.actions";
import { getDownloadURL, ref } from "firebase/storage";
import ImageLoading from "../imagesLoading/imageLoading.component";
import PortfolioImage from "../portfolioImage/portfolioImage.component";

const PortfolioContainer = ({ imageNames, imagesDownloading, imagesUrls, imageData, setImagesDownloading, setImagesUrls }) => {

    console.log(imageData);
    // Image Data Now Available.
    const getImageUrl = async () => {
        let imageUrls = [];
        for (let i = 0; i < imageNames.length; i++) {
            await getDownloadURL(ref(storage, `Portfolio/${imageNames[i]}`))
                .then((url) => {
                    imageUrls.push(url);
                })
                .catch((error) => {
                    console.log(error);
                });
        };

        if (imageUrls.length > 0 && imageNames.length === imageUrls.length) {
            setImagesUrls(imageUrls);
            setImagesDownloading(false);
        }
    }

    useEffect(() => {
        getImageUrl();
    }, [imageNames]);


    return (
        <div className="mainPortfolioContainer container-fluid p-0 m-0">
            <div className="row p-0 m-0">
                <div className="col-12 d-flex justify-content-center my-3">
                    <h1>PORTFOLIO</h1>
                </div>
            </div>
            <div className={`${imagesDownloading ? 'd-flex justify-content-center' : 'd-none'} row py-3 px-0 m-0`}>
                {
                    imageNames.map(name => (
                        <div key={name} className="col-12 col-md-4">
                            <ImageLoading />
                        </div>
                    ))
                }
            </div>
            <div className={`${imagesDownloading ? 'd-none' : 'd-flex'} row py-3 px-0 m-0`}>
                {
                    imagesUrls.map(url => (
                        <div key={url} className="col-12 col-md-6 col-lg-4 p-0 m-0">
                            <PortfolioImage image={url} />
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imageNames: state.portfolio.imageNames,
    imagesDownloading: state.portfolio.imagesDownloading,
    imagesUrls: state.portfolio.imagesUrls,
    imageData: state.portfolio.imageData
});

const mapDispatchToProps = (dispatch) => ({
    setImagesDownloading: imagesDownloading => dispatch(setImagesDownloading(imagesDownloading)),
    setImagesUrls: imagesUrls => dispatch(setImagesUrls(imagesUrls))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);