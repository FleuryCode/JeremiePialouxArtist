import React from "react";
import './customTextArea.styles.scss';

const CustomTextArea = ({ id, name, placeholder, onChange }) => {
    return (
        <div className="customTextAreaContainer">
            <textarea name={name} id={id} placeholder={placeholder} onChange={onChange}></textarea>
        </div>
    );
}

export default CustomTextArea;