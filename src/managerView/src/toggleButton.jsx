import React from 'react';

import '../styles/toggleButton.css'

/**
 * @param {*} setComponent function to set component visibility
 */
function showComponent(setComponent) {
    setComponent(true);
}

/**
 * @param {*} props data to use in display
 * @returns a button for toggling a view
 */
function ToggleButton(props) {
    const {name, setComponent} = props;

    return (
        <button className="managerToggleButton" onClick={() => {showComponent(setComponent)}}>{name}</button>
    );

}


export default ToggleButton;