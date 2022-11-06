import React from 'react'
import './SearchBar.css'

export default function SearchBar() {
    return (
        <div class="row" style={{ "align-content": "left !important", "padding-bottom": "25px" }}>
            <div class="col">
                <div class="search">
                    <input type="text" class="form-control" placeholder="Search for Item"></input>
                    <button class="btn btn-primary">
                        <i class="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}
