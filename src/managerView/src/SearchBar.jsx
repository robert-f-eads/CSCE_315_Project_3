import React from 'react'

import '../styles/SearchBar.css'

export default function SearchBar(props) {
    const {onClickFunction} = props;

    return (
        <>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossOrigin="anonymous"></script>
            <div className="row" style={{ "alignContent": "left !important", "paddingBottom": "10px" }}>
                <div className="col">
                    <div className="search">
                        <input id="itemSearchText" type="text" className="form-control" placeholder="Search for Item"></input>
                        <button className="btn btn-primary" onClick={() => {onClickFunction(document.getElementById("itemSearchText").value)}}>
                            <i className="fa fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}