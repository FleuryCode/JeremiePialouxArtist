import React from 'react';
import './arrowSendingButton.styles.scss';
import {ReactComponent as SendArrowIcon} from '../../assets/sendArrowIcon.svg';

const ArrowSendingButton = ({ messageSending, onClick }) => {
    return (
        <div className="arrowSendingButtonContainer">
            {
                messageSending ?
                    <div class="spinner-border" role="status">
                        <span class="sr-only"></span>
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