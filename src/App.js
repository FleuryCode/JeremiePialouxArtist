import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage.page';
import AboutPage from './pages/aboutPage/about.page';
import ContactPage from './pages/contactPage/contact.page';
import Navigation from './components/navigation/navigation.component';
import PortfolioPage from './pages/portfolioPage/portfolio.page';
import PortfolioPiece from './components/portfolioPiece/portfolioPiece.component';
// Redux
import { setImageData, setImagesDownloading } from './redux/portfolio/portfolio.actions';
import { setTextData } from './redux/text/text.actions';
import { connect } from 'react-redux';
// Firebase
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase/firebase.utils";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import firebaseApp from './firebase/firebase.utils';


const App = ({ setImageData, setImagesDownloading, setTextData }) => {
  console.log('App.JS Launched');


  // Portfolio Data
  const getPortfolioData = async () => {
    const portfolioData = [];
    const querySnapshot = await getDocs(collection(db, 'Portfolio'));
    querySnapshot.forEach((doc) => {
      portfolioData.push(doc.data());
    });
    portfolioData.sort((a, b) => {
      return a.id - b.id
    });
    getImageUrls(portfolioData);
  }


  const getImageUrls = async (imageDataArray) => {
    for (let i = 0; i < imageDataArray.length; i++) {
      await getDownloadURL(ref(storage, `Portfolio/${imageDataArray[i].imageName}`))
        .then((url) => {
          imageDataArray[i].src = url;
        })
        .catch((error) => {
          console.log(error);
        });

    };
    setImageData(imageDataArray);
    setImagesDownloading(false);
  };

  // Text Data
  const getTextData = async () => {
    const docRef = doc(db, 'Text', 'textData');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTextData(docSnap.data());
    }
  }

  useEffect(() => {
    getTextData();
    getPortfolioData();
  });



  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='bio' element={<AboutPage />} />
        <Route exact path='contact' element={<ContactPage />} />
        <Route exact path='portfolio' element={<PortfolioPage />} />
        <Route path='portfolio/:portfolioImage' element={<PortfolioPiece />} />
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setImagesDownloading: imagesDownloading => dispatch(setImagesDownloading(imagesDownloading)),
  setImageData: imageDataArray => dispatch(setImageData(imageDataArray)),
  setTextData: textInfo => dispatch(setTextData(textInfo))
});

export default connect(null, mapDispatchToProps)(App);
