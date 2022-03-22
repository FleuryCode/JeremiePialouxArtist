import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage.page';
import AboutPage from './pages/aboutPage/about.page';
import ContactPage from './pages/contactPage/contact.page';
import Navigation from './components/navigation/navigation.component';
import { setImageNames, setImageData } from './redux/portfolio/portfolio.actions';
import { connect } from 'react-redux';
import { db } from "./firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import firebaseApp from './firebase/firebase.utils';

function App({ setImageNames, setImageData }) {

  const dataArray = onSnapshot(doc(db, 'Portfolio', 'MainPortfolio'), (doc) => {
    const data = doc.data().images;
    // Organizing based on ID.
    data.sort((a, b) => {
      return a.id - b.id;
    });
    let imageNameArray = [];
    let imageDataArray = [];
    data.forEach((image) => {
      imageNameArray.push(image.imageName);
      imageDataArray.push(image);
    });
    setImageNames(imageNameArray);
    setImageData(imageDataArray);

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
      </Routes>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setImageNames: imageNameArray => dispatch(setImageNames(imageNameArray)),
  setImageData: imageDataArray => dispatch(setImageData(imageDataArray))
});

export default connect(null, mapDispatchToProps)(App);
