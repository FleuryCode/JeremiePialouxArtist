import React from 'react';
import './arrowSendingButton.styles.scss';
import {ReactComponent as SendArrowIcon} from '../../assets/sendArrowIcon.svg';

const ArrowSendingButton = ({ messageSending, onClick }) => {
    return (
        <div className="arrowSendingButtonContainer justify-content-md-end justify-content-start">
            {
                messageSending ?
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                    :
                    <div onClick={onClick} className="sendArrowContainer">
                        <SendArrowIcon />
                    </div>
            }
        </div>
    );
}

export default ArrowSendingButton;