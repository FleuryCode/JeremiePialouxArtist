import React from "react";
import './about.styles.scss';
import ProfilePicture from '../../assets/lowQualProfile.jpeg';
import { peinture, abstrait, matiere, lumiere } from "../../websiteText";
// Redux
import { connect } from "react-redux";

const AboutPage = ({ textData, language }) => {
    // TEXT CHANGES
    // Peinture
    let peintureText = peinture;
    if(textData.peinture !== '' && textData.peintureEn !== '') {
        if(language === 'FR') {
            peintureText = textData.peinture
        }else {
            peintureText = textData.peintureEn
        }
    }
    // Abstrait
    let abstraitText = abstrait;
    if(textData.abstrait !== '' && textData.abstraitEn !== '') {
        if(language === 'FR') {
            abstraitText = textData.abstrait
        }else {
            abstraitText = textData.abstraitEn
        }
    }
    // Matière
    let matiereText = matiere;
    if(textData.matiere !== '' && textData.matiereEn !== '') {
        if(language === 'FR') {
            matiereText = textData.matiere
        }else {
            matiereText = textData.matiereEn
        }
    }
    // Lumière et Couleur
    let lumiereText = lumiere;
    if(textData.lumiere !== '' && textData.lumiereEn !== '') {
        if(language === 'FR') {
            lumiereText = textData.lumiere
        }else {
            lumiereText = textData.lumiereEn
        }
    }


    return (
        <div className="aboutPageContainer container-fluid">
            <div className="row aboutInfo d-none d-md-flex">
                <div className="col-6 p-4">
                    {/* Peinture */}
                    <div className="peinture">
                        <h2>Peinture</h2>
                        <p>{peintureText}</p>
                    </div>
                    {/* Matiere */}
                    <div className="matiere mt-5">
                        <h2>Matière</h2>
                        <p>{matiereText}</p>
                    </div>
                </div>
                <div className="col-6 p-4">
                    <div className="profilePicture d-flex justify-content-center">
                        <img src={ProfilePicture} alt="Kamonn Profile" />
                    </div>
                    {/* Abstrait */}
                    <div className="abstrait mt-5">
                        <h2>Abstrait</h2>
                        <p>{abstraitText}</p>
                    </div>
                    {/* Lumière et Couleur */}
                    <div className="lumiere mt-5">
                        <h2>Lumière et Couleur</h2>
                        <p>{lumiereText}</p>
                    </div>
                </div>
            </div>
            <div className="row aboutInfo d-flex d-md-none">
                <div className="col-12 p-4">
                    <div className="profilePicture d-flex justify-content-center">
                        <img src={ProfilePicture} alt="Kamonn Profile" />
                    </div>
                </div>
                <div className="col-12 p-4">
                    {/* Peinture */}
                    <div className="peinture">
                        <h2>Peinture</h2>
                        <p>{peintureText}</p>
                    </div>
                </div>
                <div className="col-12 p-4">
                    {/* Abstrait */}
                    <div className="abstrait">
                        <h2>Abstrait</h2>
                        <p>{abstraitText}</p>
                    </div>
                </div>
                <div className="col-12 p-4">
                    {/* Matiere */}
                    <div className="matiere">
                        <h2>Matière</h2>
                        <p>{matiereText}</p>
                    </div>
                </div>
                <div className="col-12 p-4">
                    {/* Lumière et Couleur */}
                    <div className="lumiere">
                        <h2>Lumière et Couleur</h2>
                        <p>{lumiereText}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    textData: state.text.textData,
    language: state.text.language
});

export default connect(mapStateToProps)(AboutPage);