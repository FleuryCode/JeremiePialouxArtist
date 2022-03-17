import React from "react";
import CustomInput from "../../components/customInput/customInput.component";
import CustomTextArea from "../../components/customTextArea/customTextArea.component";
import './contact.styles.scss';

const ContactPage = () => {
    return (
        <div className="contactPageContainer container-fluid">
            <form className="row">
                <div className="col-12 col-md-6">
                    <CustomInput id={'nom'} type={'text'} name={'nom'} placeholder={'NOM'} />
                </div>
                <div className="col-12 col-md-6">
                    <CustomInput id={'prenom'} type={'text'} name={'prenom'} placeholder={'PRENOM'} />
                </div>
                <div className="col-12">
                    <CustomInput id={'email'} type={'email'} name={'email'} placeholder={'EMAIL'} />
                </div>
                <div className="col-12">
                    <CustomTextArea id={'message'} name={'message'} placeholder={'MESSAGE'} />
                </div>
            </form>
        </div>
    );
}

export default ContactPage;