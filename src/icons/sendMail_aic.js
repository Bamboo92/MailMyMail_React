import React from 'react';
import Lottie from 'react-lottie';
import animationData from './sendMail_aic.json';

const SendMail_aic = ({ isStopped }) => { // Verwendung der Prop `isStopped` anstelle des State

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return <Lottie options={defaultOptions} isStopped={isStopped} style={{ width: '25px', height: '25px', overflow: 'hidden', margin: '0', outline: 'none' }}/>;
};

export default SendMail_aic;