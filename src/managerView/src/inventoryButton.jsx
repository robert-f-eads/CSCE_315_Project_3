import React from 'react';

import '../styles/inventoryButton.css'

class InventoryButton extends React.Component {
    render() {
        return (
            <button id="inventoryButton" onClick={() => {this.showInventory()}}>Get Inventory</button>
        );
    }

    showInventory() {
        console.log("Showing inventory.");
    }
}


export default InventoryButton;