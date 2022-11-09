import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
    const {showProducts} = props;

    return (
        <div id="prodSearch">
            <input type="text" placeholder="Search for Item" id="prodSearchBar"></input>
            <button
                onClick={() => {
                    let inputText = document.getElementById("prodSearchBar").value;
                    showProducts(inputText);
                }}
                type="submit"
                id="prodSearchButton">
            </button>
        </div>
    )
}
