import React from 'react';

import '../styles/toggleButton.css'

function showComponent(setComponent) {
    setComponent(true);
}

function ToggleButton(props) {
    const {name, setComponent} = props;

    return (
        <button className="managerToggleButton" onClick={() => {showComponent(setComponent)}}>{name}</button>
    );

}


export default ToggleButton;