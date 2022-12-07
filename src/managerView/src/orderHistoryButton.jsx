import React from 'react';

import '../styles/orderHistoryButton.css'

/**
 * @param {*} setOrderVisible function to set order history visible
 */
function showOrderHistory(setOrderHistoryVisible) {
    setOrderHistoryVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for order history view
 */
function OrderHistoryButton(props) {
    const {setOrderHistoryVisible} = props;
    return (
        <button id="orderHistoryButton" onClick={() => {showOrderHistory(setOrderHistoryVisible)}}>Order History</button>
    );

}


export default OrderHistoryButton;