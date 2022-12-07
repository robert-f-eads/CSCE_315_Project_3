import React from 'react';

import '../styles/salesButton.css'

/**
 * @param {*} setSalesVisible function to set sales view visible
 */
function showSales(setSalesVisible) {
    setSalesVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for sales view
 */
function SalesButton(props) {
    const {setSalesVisible} = props;

    return (
        <button id="salesButton" onClick={() => {showSales(setSalesVisible)}}>Get Sales</button>
    );
}


export default SalesButton;