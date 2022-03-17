import React from "react";
import './customInput.styles.scss';

const CustomInput = ({ onChange, id, type, name, placeholder }) => {
    return (
        <div className="customInputContainer">
            <input className="customInput" id={id} type={type} name={name} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}

export default CustomInput;