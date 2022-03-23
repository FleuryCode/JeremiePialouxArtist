import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage.page';
import AboutPage from './pages/aboutPage/about.page';
import ContactPage from './pages/contactPage/contact.page';
import Navigation from './components/navigation/navigation.component';
import PortfolioPage from './pages/portfolioPage/portfolio.page';
// Redux
import { setImageData, setImagesUrls, setImagesDownloading } from './redux/portfolio/portfolio.actions';
import { connect } from 'react-redux';
// Firebase
import { getDownloadURL, ref } from "firebase/storage";
import { db, storage } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import firebaseApp from './firebase/firebase.utils';


function App({ setImagesUrls, setImageData, setImagesDownloading }) {

  const getImageUrls = async (imageDataArray) => {
    let imageUrls = [];
    for (let i = 0; i < imageDataArray.length; i++) {
      await getDownloadURL(ref(storage, `Portfolio/${imageDataArray[i].imageName}`))
        .then((url) => {
          imageUrls.push(url);
        })
        .catch((error) => {
          console.log(error);
        });

    };
    setImagesUrls(imageUrls);
    setImagesDownloading(false);
  };

  const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
    const data = doc.data().images;
    // Organizing based on ID.
    data.sort((a, b) => {
      return a.id - b.id;
    });
    let imageDataArray = [];
    data.forEach((image) => {
      imageDataArray.push(image);
    });
    setImageData(imageDataArray);
    getImageUrls(imageDataArray);

  });

  useEffect(() => {
    dataArray();
  });


  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='bio' element={<AboutPage />} />
        <Route exact path='contact' element={<ContactPage />} />
        <Route path='portfolio' element={<PortfolioPage />}>
          <Route path=':portfolioImage' element={<AboutPage />} />
        </Route>
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setImagesDownloading: imagesDownloading => dispatch(setImagesDownloading(imagesDownloading)),
  setImagesUrls: urlsArray => dispatch(setImagesUrls(urlsArray)),
  setImageData: imageDataArray => dispatch(setImageData(imageDataArray))
});

export default connect(null, mapDispatchToProps)(App);
