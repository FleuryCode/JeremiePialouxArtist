import React from "react";
import './customButton.styles.scss';

const CustomButton = ({ text, onClick, messageSending }) => {
    return (
        <div onClick={onClick} className="customButtonContainer">
            {
                messageSending ?
                    <div className="spinner-border p-1" role="status">
                        
                    </div>
                    :
                    <h4>{text}</h4>
            }

        </div>
    );
}

export default CustomButton;