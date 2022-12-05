import React from 'react';

import '../styles/reorderButton.css'

function showReorder(setReorder) {
    setReorder(true);
}

function ReorderButton(props) {
    const {setReorderVisible} = props;
    return (
        <button id="reorderButton" onClick={() => {showReorder(setReorderVisible)}}>Reorder</button>
    );

}


export default ReorderButton;