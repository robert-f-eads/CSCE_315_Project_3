import React from 'react';

import '../styles/orderHistoryButton.css'

class OrderHistoryButton extends React.Component {
    render() {
        return (
            <button id="orderHistoryButton" onClick={() => {this.showOrderHistory()}}>Generate Order History</button>
        );
    }

    showOrderHistory() {
        console.log("Showing order history.");
    }
}


export default OrderHistoryButton;