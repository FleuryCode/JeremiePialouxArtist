import React from "react";
import './customTextArea.styles.scss';

const CustomTextArea = ({ id, name, placeholder, onChange, value }) => {
    return (
        <div className="customTextAreaContainer">
            <textarea name={name} id={id} placeholder={placeholder} value={value} onChange={onChange}></textarea>
        </div>
    );
}

export default CustomTextArea;