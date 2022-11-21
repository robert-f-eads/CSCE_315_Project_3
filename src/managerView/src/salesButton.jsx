import React from 'react';

import '../styles/salesButton.css'

function showSales(setSalesVisible) {
    setSalesVisible(true);
}

function SalesButton(props) {
    const {setSalesVisible} = props;

    return (
        <button id="salesButton" onClick={() => {showSales(setSalesVisible)}}>Get Sales</button>
    );
}


export default SalesButton;