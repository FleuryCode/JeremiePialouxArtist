import React, { useState, useEffect } from 'react';
import './contact.styles.scss';
import CustomInput from '../../components/customInput/customInput.component';
import CustomTextArea from '../../components/customTextArea/customTextArea.component';
import ArrowSendingButton from '../../components/arrowSendingButton/arrowSendingButton.component';
import ReCAPTCHA from 'react-google-recaptcha';
import { KEYS } from '../../Keys';
import axios from 'axios';
//Redux
import { connect } from 'react-redux';

const ContactPage = ({ language }) => {
  const [recaptchaToken, setRecaptchaToken] = useState('');
  const [messageSending, setMessageSending] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [displayMessage, setDisplayMessage] = useState('');
  // Message Data
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  //SEO
  useEffect(() => {
    if (language === 'FR') {
      document.title = `Contactez - KAMONN`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          `Contactez Kamonn pour obtenir des informations sur ses peintures telles que les prix, les dimensions ou les demandes personnalisées.`
        );
    } else {
      document.title = `Contact - KAMONN`;
      document
        .querySelector('meta[name="description"]')
        .setAttribute(
          'content',
          `Contact Kamonn for information about his paintings such as prices, dimensions or custom requests.`
        );
    }
  }, [language]);

  window.scrollTo({top: 0, behavior: 'smooth'});

  const inputChangeHandle = (event) => {
    const { value, name } = event.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'message':
        setMessage(value);
        break;
      default:
        break;
    }
  };

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
      'g-recaptcha-response': recaptchaToken,
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
    }
  };

  const sendButtonClick = async (event) => {
    if (email !== '' && message !== '') {
      event.preventDefault();
      setMessageSending(true);
      await sendAxiosMessage();
      setMessageSending(false);
    } else {
      setMessageSent(true);
      setDisplayMessage('Veuillez remplir toutes les informations');
    }
  };

  return (
    <div className="contactPageContainer container-fluid">
      <form className="row pt-5">
        <div className="col-12 col-md-8 my-2 d-flex justify-content-center me-auto flex-column">
          <label className="inputLabel" htmlFor="email">
            EMAIL
          </label>
          <CustomInput
            id={'email'}
            type={'email'}
            name={'email'}
            value={email}
            onChange={inputChangeHandle}
          />
        </div>
        <div className="col-12 col-md-8 my-4 d-flex justify-content-center me-auto flex-column">
          <label className="inputLabel" htmlFor="message">
            MESSAGE
          </label>
          <CustomTextArea
            id={'message'}
            name={'message'}
            value={message}
            onChange={inputChangeHandle}
          />
        </div>
        <div className="col-12 col-md-6 my-4">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={recaptchaKey}
            onChange={updateRecaptcha}
          />
        </div>
        <div className="col-12 col-md-2 my-4 d-flex align-items-center">
          <ArrowSendingButton
            messageSending={messageSending}
            onClick={sendButtonClick}
          />
        </div>
        <div
          className={`${
            messageSent ? 'd-flex' : 'd-none'
          } col-12 justify-content-center mt-5`}
        >
          <h4 className="displayMessage">{displayMessage}</h4>
        </div>
      </form>
      <div className="row mt-auto d-flex justify-content-center">
        <p className='text-center'>Copyright &copy; 2022 Kamonn</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  language: state.text.language,
});

export default connect(mapStateToProps)(ContactPage);
