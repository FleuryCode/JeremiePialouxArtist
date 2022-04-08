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
import { connect } from 'react-redux';
// Firebase
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase/firebase.utils";
import { collection, onSnapshot, query } from "firebase/firestore";
import firebaseApp from './firebase/firebase.utils';



function App({ setImageData, setImagesDownloading }) {
  const portfolioQuery = query(collection(db, 'Portfolio'));
    const getPortfolioData = onSnapshot(portfolioQuery, (querySnapshot) => {
      const portfolioData = [];
      querySnapshot.forEach((doc) => {
        portfolioData.push(doc.data());
      });
      // Sorting based on ID
      portfolioData.sort((a, b) => {
        return a.id - b.id
      });
      getImageUrls(portfolioData);
    });

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

  useEffect(() => {
    getPortfolioData();
  }, []);

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
  setImageData: imageDataArray => dispatch(setImageData(imageDataArray))
});

export default connect(null, mapDispatchToProps)(App);
