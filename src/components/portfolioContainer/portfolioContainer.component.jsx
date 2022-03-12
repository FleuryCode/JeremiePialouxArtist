import React, { useEffect } from "react";
import './portfolioContainer.styles.scss';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase.utils';
import { connect } from "react-redux";
import { setImagesDownloading, setImagesUrls } from "../../redux/portfolio/portfolio.actions";
import { getDownloadURL, ref } from "firebase/storage";
import { async } from "@firebase/util";
import ImageLoading from "../imagesLoading/imageLoading.component";
import PortfolioImage from "../portfolioImage/portfolioImage.component";

const PortfolioContainer = ({ imageNames, imagesDownloading, imagesUrls, setImagesDownloading, setImagesUrls }) => {

    // For Future Ref
    // const testData = {
    //     images: [
    //         {
    //             id: 4,
    //             imageName: 'jdf_20191013_183658_edit_web.jpg'
    //         },
    //         {
    //             id: 2,
    //             imageName: 'jdf_20191013_183713_edit_web.jpg'
    //         },
    //         {
    //             id: 3,
    //             imageName: 'jdf_20191013_183725_edit_web.jpg'
    //         },
    //         {
    //             id: 1,
    //             imageName: 'jdf_20191017_133744_edit_web.jpg'
    //         },
    //         {
    //             id: 5,
    //             imageName: 'jdf_20191017_134035_edit_web.jpg'
    //         },
    //         {
    //             id: 6,
    //             imageName: 'jdf_20191017_133744_edit_web.jpg'
    //         }
    //     ]
    // };

    // const setData = async () => {
    //     await setDoc(doc(db, 'Portfolio', 'MainPortfolio'), testData)
    //         .then(() => {
    //             console.log('Completed');
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }


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
    });


    return (
        <div className="mainPortfolioContainer container-fluid">
            <div className={`${imagesDownloading ? 'd-flex justify-content-center' : 'd-none'} row p-3`}>
                {
                    imageNames.map(name => (
                        <div key={name} className="col-12 col-md-4">
                            <ImageLoading />
                        </div>
                    ))
                }
            </div>
            <div className={`${imagesDownloading ? 'd-none' : 'd-flex'} row p-3`}>
                {
                    imagesUrls.map(url => (
                        <div key={url} className="col-12 col-lg-4">
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
    imagesUrls: state.portfolio.imagesUrls
});

const mapDispatchToProps = (dispatch) => ({
    setImagesDownloading: imagesDownloading => dispatch(setImagesDownloading(imagesDownloading)),
    setImagesUrls: imagesUrls => dispatch(setImagesUrls(imagesUrls))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);