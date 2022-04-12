import React, { useState } from "react";
import './contact.styles.scss';
import CustomButton from "../../components/customButton/customButton.component";
import CustomInput from "../../components/customInput/customInput.component";
import CustomTextArea from "../../components/customTextArea/customTextArea.component";
import ReCAPTCHA from "react-google-recaptcha";
import { KEYS } from "../../Keys";
import Recaptcha from "react-google-recaptcha/lib/recaptcha";
import axios from "axios";


const ContactPage = () => {
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [messageSending, setMessageSending] = useState(false);
    const [messageSent, setMessageSent] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');
    // Message Data
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const inputChangeHandle = (event) => {
        const { value, name } = event.target;
        switch (name) {
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

    // Axios Sending
    const sendAxiosMessage = async () => {
        const payload = {
            email: email,
            message: message,
            "g-recaptcha-response": recaptchaToken
        };

        // Sending to FormSpark Servers
        try {
            await axios.post(formSparkUrl, payload);
            // Reset Fields
            setEmail('');
            setMessage('');
            setDisplayMessage('Merci pour votre message');
            setMessageSent(true);
            
            // Reset Recaptcha
            recaptchaRef.current.reset();
        } catch (error) {
            console.log(error);
            setDisplayMessage("Désolé, quelque chose s'est mal passé");
            setMessageSent(true);

        };
    };

    const sendButtonClick = async (event) => {
        if(email !== '' && message !== '') {
            event.preventDefault();
            setMessageSending(true);
            await sendAxiosMessage();
            setMessageSending(false);
        }else {
            setMessageSent(true);
            setDisplayMessage('Veuillez remplir toutes les informations');
        }
    }




    return (
        <div className="contactPageContainer container-fluid">
            <div className="row">
                <div className="col-12 d-flex">
                    <h1>CONTACT</h1>
                </div>
            </div>
            <form className="row p-4">
                <div className="col-12 my-2 d-flex justify-content-center">
                    <CustomInput id={'email'} type={'email'} name={'email'} placeholder={'EMAIL'} value={email} onChange={inputChangeHandle} />
                </div>
                <div className="col-12 my-4 d-flex justify-content-center">
                    <CustomTextArea id={'message'} name={'message'} placeholder={'MESSAGE'} value={message} onChange={inputChangeHandle} />
                </div>
                <div className="col-12 col-md-8 mb-4">
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptchaKey}
                        onChange={updateRecaptcha}
                    />
                </div>
                <div className="col-12 col-md-4">
                    <CustomButton onClick={sendButtonClick} text={'ENVOYER'} messageSending={messageSending} />
                </div>
                <div className={`${messageSent ? 'd-flex' : 'd-none'} col-12 justify-content-center`}>
                    <h4 className="displayMessage">{displayMessage}</h4>
                </div>
            </form>
        </div>
    );
}

export default ContactPage;