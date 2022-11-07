import React from 'react';

import '../styles/inventoryButton.css'

class InventoryButton extends React.Component {
    render() {
        return (
            <button id="inventoryButton" onClick={() => {this.showInventory()}}>Get Inventory</button>
        );
    }

    showInventory() {
        console.log("showing inventory");
        document.getElementById("contentContainer").innerHTML = <p>hello</p>;
    }
}


export default InventoryButton;