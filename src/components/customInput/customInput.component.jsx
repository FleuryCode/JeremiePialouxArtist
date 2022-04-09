import React from "react";
import './customInput.styles.scss';

const CustomInput = ({ onChange, id, type, name, placeholder, value }) => {
    return (
        <div className="customInputContainer">
            <input className="customInput" id={id} type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}

export default CustomInput;