import React from 'react';

import '../styles/inventoryButton.css'

function showInventory(setInventoryVisible) {
    setInventoryVisible(true);
}

function InventoryButton(props) {
    const {setInventoryVisible} = props;

    return (
        <button id="inventoryButton" onClick={() => {showInventory(setInventoryVisible)}}>Get Inventory</button>
    );
}


export default InventoryButton;