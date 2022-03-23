import React, { useEffect, useState } from "react";
import './portfolioPiece.styles.scss';
import { useLocation } from "react-router-dom";
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
    for (let i = 0; i < imageData.length; i++) {
        if (location === `/portfolio/${imageData[i].link}`) {
            data = imageData[i];
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
    }, [imageData]);


    return (
        <div className="portfolioPieceContainer container-fluid p-4">
            <div className="row">
                <div className="col-12 d-flex justify-content-center mb-4">
                    <h1>{data.title}</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-8">
                    <SpecificPortfolioImages images={images} />
                </div>
                <div className="col-12 col-md-4 p-4">
                    <h3>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto, illum eius. Velit ducimus harum expedita quia tempora, facilis debitis cumque eos mollitia nihil, voluptas aliquam voluptatibus consequatur quibusdam fugiat amet. Lore</h3>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    imageData: state.portfolio.imageData
});

export default connect(mapStateToProps)(PortfolioPiece);