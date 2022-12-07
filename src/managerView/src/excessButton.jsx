import React from 'react';

import '../styles/excessButton.css'

/**
 * @param {*} setExcessVisible function to set excess view visible
 */
function showExcess(setExcessVisible) {
    setExcessVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for excess view
 */
function ExcessButton(props) {
    const {setExcessVisible} = props;

    return (
        <button id="excessButton" onClick={() => {showExcess(setExcessVisible)}}>Get Excess</button>
    );
}


export default ExcessButton;