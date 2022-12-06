import React from 'react';

import '../styles/excessButton.css'

function showExcess(setExcessVisible) {
    setExcessVisible(true);
}

function ExcessButton(props) {
    const {setExcessVisible} = props;

    return (
        <button id="excessButton" onClick={() => {showExcess(setExcessVisible)}}>Get Excess</button>
    );
}


export default ExcessButton;