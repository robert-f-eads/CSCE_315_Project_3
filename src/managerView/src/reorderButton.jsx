import React from 'react';

import '../styles/reorderButton.css'

/**
 * @param {*} setReorderVisible function to set reorder view visible
 */
function showReorder(setReorder) {
    setReorder(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for reorder view
 */
function ReorderButton(props) {
    const {setReorderVisible} = props;
    return (
        <button id="reorderButton" onClick={() => {showReorder(setReorderVisible)}}>Reorder</button>
    );

}


export default ReorderButton;