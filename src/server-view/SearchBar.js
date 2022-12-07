import React from 'react'
import './SearchBar.css'

export default function SearchBar(props) {
    const {showProducts} = props;

    return (
        <>
        <form class="d-flex" role="search">
                    <input id="prodSearchBar" class="form-control me-2" type="search" placeholder="Search for a product..." aria-label="Search"/>
                    <button class="btn btn-outline-danger" onClick={() => {
                    let inputText = document.getElementById("prodSearchBar").value;
                    showProducts(inputText);
                }}
                type="submit" id="prodSearchButton">Search</button>
        </form>

        {/* <div id="prodSearch">
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

        </div> */}
        </>
    )
}
