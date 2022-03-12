import React, { useEffect } from "react";
import './portfolioContainer.styles.scss';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase.utils';
import { connect } from "react-redux";
import { getDownloadURL, ref } from "firebase/storage";
import { async } from "@firebase/util";

const PortfolioContainer = ({imageNames}) => {
    
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
    }

    useEffect(() => {
        testFunction();
    });



    return (
        <div className="mainPortfolioContainer">
            <h3>Testing Portfolio</h3>
        </div>
    );
}

const mapStateToProps = (state) => ({
    imageNames: state.portfolio.imageNames
});


export default connect(mapStateToProps)(PortfolioContainer);