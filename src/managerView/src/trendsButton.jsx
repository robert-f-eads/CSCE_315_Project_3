import React from 'react';

import '../styles/trendsButton.css'

function showTrends(setTrendsVisible) {
    setTrendsVisible(true);
}

function TrendsButton(props) {
    const {setTrendsVisible} = props;

    return (
        <button id="trendsButton" onClick={() => {showTrends(setTrendsVisible)}}>Get Trends</button>
    );
}


export default TrendsButton;