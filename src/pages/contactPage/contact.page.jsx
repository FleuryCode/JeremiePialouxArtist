import React, { useState } from "react";
import './contact.styles.scss';
import CustomButton from "../../components/customButton/customButton.component";
import CustomInput from "../../components/customInput/customInput.component";
import CustomTextArea from "../../components/customTextArea/customTextArea.component";
import ReCAPTCHA from "react-google-recaptcha";
import { KEYS } from "../../Keys";
import Recaptcha from "react-google-recaptcha/lib/recaptcha";


const ContactPage = () => {
    const [recaptchaToken, setRecaptchaToken] = useState('');
    // Message Data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const inputChangeHandle = (event) => {
        const { value, name } = event.target;
        switch (name) {
            case 'nom':
                setLastName(value)
                break;
            case 'prenom':
                setFirstName(value)
                break;
            case 'email':
                setEmail(value)
                break;
            case 'message':
                setMessage(value)
                break;
            default:
                break;
        }
    }

    // Recaptcha
    const recaptchaRef = React.useRef();
    const recaptchaKey = KEYS.Recaptcha_Token;
    const updateRecaptcha = (token) => {
        setRecaptchaToken(token);
    };
    // FormSpark
    const formSparkId = KEYS.Formspark_ID;
    const formSparkUrl = `https://submit-form.com/${formSparkId}`;




    return (
        <div className="contactPageContainer container-fluid">
            <div className="row">
                <div className="col-12 d-flex justify-content-center">
                    <h1>CONTACTEZ-NOUS</h1>
                </div>
            </div>
            <form className="row p-4">
                <div className="col-12 col-md-6">
                    <CustomInput id={'nom'} type={'text'} name={'nom'} placeholder={'NOM'} value={lastName} onChange={inputChangeHandle} />
                </div>
                <div className="col-12 col-md-6">
                    <CustomInput id={'prenom'} type={'text'} name={'prenom'} placeholder={'PRENOM'} value={firstName} onChange={inputChangeHandle} />
                </div>
                <div className="col-12">
                    <CustomInput id={'email'} type={'email'} name={'email'} placeholder={'EMAIL'} value={email} onChange={inputChangeHandle} />
                </div>
                <div className="col-12">
                    <CustomTextArea id={'message'} name={'message'} placeholder={'MESSAGE'} value={message} onChange={inputChangeHandle} />
                </div>
                <div className="col-8">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaKey}
                        onChange={updateRecaptcha}
                    />
                </div>
                <div className="col-4">
                    <CustomButton text={'ENVOYER'} />
                </div>
            </form>
        </div>
    );
}

export default ContactPage;