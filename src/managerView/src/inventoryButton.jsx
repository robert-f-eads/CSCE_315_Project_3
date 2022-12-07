import React from 'react';

import '../styles/inventoryButton.css'

/**
 * @param {*} setInventoryVisible function to set inventory view visible
 */
function showInventory(setInventoryVisible) {
    setInventoryVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for inventory view
 */
function InventoryButton(props) {
    const {setInventoryVisible} = props;

    return (
        <button id="inventoryButton" onClick={() => {showInventory(setInventoryVisible)}}>Get Inventory</button>
    );
}


export default InventoryButton;