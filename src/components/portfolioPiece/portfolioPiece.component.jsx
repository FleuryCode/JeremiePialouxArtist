import React, { useEffect, useState } from "react";
import './portfolioPiece.styles.scss';
import { useLocation } from "react-router-dom";
import { ReactComponent as ArrowIcon } from '../../assets/arrowIcon.svg';
import { Link } from "react-router-dom";
// Redux
import { connect } from "react-redux";
// Firebase
import { storage } from "../../firebase/firebase.utils";
import { getDownloadURL, ref } from "firebase/storage";
import SpecificPortfolioImages from "../specificPortfolioImages/specificPortfolioImages.component";

const PortfolioPiece = ({ imageData }) => {
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

    // Prev and Next Links
    // Prev
    let prevLink = '';
    if(dataIndex === 0) {
        prevLink = imageData[imageData.length - 1].link;
    }else {
        prevLink = imageData[dataIndex - 1].link;
    }
    // Next
    let nextLink = '';
    if(dataIndex === imageData.length - 1) {
        nextLink = imageData[0].link;
    }else {
        nextLink = imageData[dataIndex + 1].link;
    }


    
    return (
        <div className="portfolioPieceContainer container-fluid p-2">
            <div className="row">
                <div className="col-12 d-flex justify-content-center mb-5">
                    <h1>{data.title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8">
                    <SpecificPortfolioImages images={images} />
                </div>
                <div className="col-12 col-md-4 pe-3 mt-5 mt-md-0">
                    <div className="creationDateContainer mb-4">
                        <h6>Date de Creation</h6>
                        <h3>{data.creationDate}</h3>
                    </div>
                    <div className="techniqueContainer mb-4">
                        <h6>Technique</h6>
                        <h3>{data.technique}</h3>
                    </div>
                    <div className="dimensionsContainer mb-4">
                        <h6>Dimensions</h6>
                        <h3>{`${data.realHeight} x ${data.realWidth}`}</h3>
                    </div>
                    <div className="descriptionContainer mb-4">
                        <h6>Description</h6>
                        <h3>{data.description}</h3>
                    </div>
                </div>
            </div>
            <div className="row mt-5 mb-3">
                <div className="col-12">
                    <div className="portfolioNavigation">
                        <Link to={`/portfolio/${prevLink}`} className="prevContainer me-auto ms-4">
                            <div className="prevArrow me-3">
                                <ArrowIcon />
                            </div>
                            <p>Précédent</p>
                        </Link>
                        <Link to={`/portfolio/${nextLink}`} className="nextContainer ms-auto me-4">
                            <p>Suivant</p>
                            <div className="nextArrow ms-3">
                                <ArrowIcon />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imageData: state.portfolio.imageData
});

export default connect(mapStateToProps)(PortfolioPiece);