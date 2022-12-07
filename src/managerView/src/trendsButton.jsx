import React from 'react';

import '../styles/trendsButton.css'

/**
 * @param {*} setTrendsVisible function to set trends view visible
 */
function showTrends(setTrendsVisible) {
    setTrendsVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for trends view
 */
function TrendsButton(props) {
    const {setTrendsVisible} = props;

    return (
        <button id="trendsButton" onClick={() => {showTrends(setTrendsVisible)}}>Get Trends</button>
    );
}


export default TrendsButton;