import React, { useEffect } from "react";
import './portfolioContainer.styles.scss';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase.utils';
import { connect } from "react-redux";
import { setImagesDownloading } from "../../redux/portfolio/portfolio.actions";
import { getDownloadURL, ref } from "firebase/storage";
import { async } from "@firebase/util";
import ImageLoading from "../imagesLoading/imageLoading.component";

const PortfolioContainer = ({ imageNames, imagesDownloading, setImagesDownloading }) => {

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


    const testFunction = async () => {
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
        console.log(imageUrls);
        if (imageUrls.length > 0 && imageNames.length === imageUrls.length) {
            setImagesDownloading(false);
        }
    }

    useEffect(() => {
        testFunction();
    });

    const testStuff = false;



    return (
        <div className="mainPortfolioContainer container-fluid">
            <div className={`${testStuff ? 'd-flex' : 'd-none'} row`}>
                {
                    imageNames.map(name => (
                        <div className="col-4">
                            <ImageLoading />
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

const mapStateToProps = (state) => ({
    imageNames: state.portfolio.imageNames,
    imagesDownloading: state.portfolio.imagesDownloading
});

const mapDispatchToProps = (dispatch) => ({
    setImagesDownloading: imagesDownloading => dispatch(setImagesDownloading(imagesDownloading))
});


export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);