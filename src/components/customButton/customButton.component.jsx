import React from "react";
import './customButton.styles.scss';

const CustomButton = ({ text, onClick, }) => {
    return (
        <div onClick={onClick} className="customButtonContainer">
            {text}
        </div>
    );
}

export default CustomButton;