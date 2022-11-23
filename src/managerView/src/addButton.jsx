import React from 'react';

import '../styles/addButton.css'

function showAdd(setAddVisible) {
    setAddVisible(true);
}

function AddButton(props) {
    const {setAddVisible} = props;

    return (
        <button id="addButton" onClick={() => {showAdd(setAddVisible)}}>Add Product</button>
    );
}


export default AddButton;
