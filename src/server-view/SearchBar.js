import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
    const {showProducts} = props;

    return (
        <>
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
        <div id="genreBar">
            <button type="submit" class="prodSearchButton">Feel Energized</button>
            <button type="submit" class="prodSearchButton">Get Fit</button>
            <button type="submit" class="prodSearchButton">Manage Weight</button>
            <button type="submit" class="prodSearchButton">Be Well</button>

        </div>
        </>
    )
}
