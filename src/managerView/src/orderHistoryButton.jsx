import React from 'react';

import '../styles/orderHistoryButton.css'

function showOrderHistory(setOrderHistoryVisible) {
    setOrderHistoryVisible(true);
}

function OrderHistoryButton(props) {
    const {setOrderHistoryVisible} = props;
    return (
        <button id="orderHistoryButton" onClick={() => {showOrderHistory(setOrderHistoryVisible)}}>Order History</button>
    );

}


export default OrderHistoryButton;