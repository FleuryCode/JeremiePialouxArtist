import React, { useEffect, useState } from "react";
import './portfolioPiece.styles.scss';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
// Firebase
import { storage } from "../../firebase/firebase.utils";
import { getDownloadURL, ref } from "firebase/storage";
import SpecificPortfolioImages from "../specificPortfolioImages/specificPortfolioImages.component";
import Loading from "../loading/loading.component";

const PortfolioPiece = ({ imageData, language, imagesDownloading }) => {
    const [images, setImages] = useState([]);
    const location = useLocation().pathname;


    let data = {}
    let dataIndex = 0;

    for (let i = 0; i < imageData.length; i++) {
        if (location === `/portfolio/${imageData[i].link}`) {
            data = imageData[i];
            dataIndex = i;
        }
    };

    const getImages = async () => {
        let imageUrls = []
        if (imageData.length > 0) {
            for (let j = 0; j < data.otherImages.length; j++) {
                await getDownloadURL(ref(storage, `Portfolio/${data.otherImages[j]}`))
                    .then((url) => {
                        imageUrls.push(url);
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            };
            setImages(imageUrls);
        }
    };

    useEffect(() => {
        getImages();
    }, [imageData, location]);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location, imageData]);

    // Prev and Next Links
    // Prev
    let prevLink = '';
    let nextLink = '';
    if (imageData.length > 0) {
        
        if (dataIndex === 0) {
            prevLink = imageData[imageData.length - 1].link;
        } else {
            prevLink = imageData[dataIndex - 1].link;
        }
        // Next
        if (dataIndex === imageData.length - 1) {
            nextLink = imageData[0].link;
        } else {
            nextLink = imageData[dataIndex + 1].link;
        }
    }




    return (
        <div className="portfolioPieceContainer container-fluid p-2">
            {
                imagesDownloading ?
                <Loading />
                :
                <div></div>
            }
            <div className="row">
                <div className="col-12 col-md-8">
                    <SpecificPortfolioImages images={images} />
                </div>
                <div className="col-12 col-md-4 px-4">
                    <div className="mb-5 mt-5 mt-md-0">
                        <h1>{data.title}</h1>
                    </div>
                    <div className="pieceInfoBox mb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <h6>Date de Creation</h6>
                                </div>
                                <div className="col-7">
                                    <h3>{data.creationDate}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="lineBreak"></div>
                    </div>
                    <div className="pieceInfoBox mb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <h6>Technique</h6>
                                </div>
                                <div className="col-7">
                                    <h3>{
                                        (language === 'FR') ?
                                            data.technique
                                            :
                                            data.enTechnique
                                    }</h3>
                                </div>
                            </div>
                        </div>
                        <div className="lineBreak"></div>
                    </div>
                    <div className="pieceInfoBox mb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <h6>Dimensions</h6>
                                </div>
                                <div className="col-7">
                                    <h3>{`${data.realHeight} x ${data.realWidth}`}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="lineBreak"></div>
                    </div>
                    <div className="pieceInfoBox mb-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-5">
                                    <h6>Description</h6>
                                </div>
                                <div className="col-7">
                                    <h3>{
                                        (language === 'FR') ?
                                            data.description
                                            :
                                            data.enDescription
                                    }</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5 mb-3">
                <div className="col-12">
                    <div className="portfolioNavigation">
                        <Link to={`/portfolio/${prevLink}`} className="prevContainer me-auto ms-4">
                            <p>PRECEDENT</p>
                        </Link>
                        <Link to={`/portfolio/${nextLink}`} className="nextContainer ms-auto me-4">
                            <p>SUIVANT</p>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imageData: state.portfolio.imageData,
    language: state.text.language,
    imagesDownloading: state.portfolio.imagesDownloading
});

export default connect(mapStateToProps)(PortfolioPiece);