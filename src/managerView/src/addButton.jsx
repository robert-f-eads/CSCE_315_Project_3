import React from 'react';

import '../styles/addButton.css'

/**
 * @param {*} setAddVisible function to set add view visible
 */
function showAdd(setAddVisible) {
    setAddVisible(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for add product view
 */
function AddButton(props) {
    const {setAddVisible} = props;

    return (
        <button id="addButton" onClick={() => {showAdd(setAddVisible)}}>Add Product</button>
    );
}


export default AddButton;
