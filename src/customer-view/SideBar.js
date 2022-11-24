import React from 'react'
import './SideBar.css'
import SmoothieKingLogo from '../Logo.png'
import SearchBar from './SearchBar'

export default function SideBar(props) {
    const { getSearchResults, showCartView, func } = props;
    return (
        <>

            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossOrigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossOrigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>


            <div className="sidebar sticky-top">
                <div className="">
                    <a href="/" className="d-flex mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                        <div className="container" style={{ "paddingBottom": "0px"}}>
                            <div className="row align-items-center text-center">
                                <div className="col">
                                    <img alt="Logo" class="img-responsive" style={{ "max-height": "70px" }} src={SmoothieKingLogo}></img>
                                </div>
                            </div>
                        </div>
                    </a>

                    <hr></hr> 
                    <div className="row" style={{ "paddingBottom": "0px" }}>
                        <div className="col" style={{ "textAlign": "center" }}>
                            <i className="fa fa-user" aria-hidden="true" style={{ "color": "maroon", "fontSize": "25px" }}></i>
                        </div>
                        <div className="col" style={{ "textAlign": "center" }}>
                            <button onClick={() => { props.func(true) }}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" style={{ "color": "maroon", "fontSize": "25px" }}></i>
                            </button>
                        </div>
                    </div>
                    <SearchBar inputId = {props.searchBarId} getSearchResults={getSearchResults}></SearchBar>

                    <ul className="nav nav-pills flex-column mb-auto" style={{ "paddingTop": "0px" }}>
                        <li className="nav-item">
                            <a href="www.google.com" className="nav-link link-dark" aria-current="page">
                                Feel Energized
                            </a>
                        </li>
                        <li>
                            <a href="www.google.com" className="nav-link link-dark">
                                Get Fit
                            </a>
                        </li>
                        <li>
                            <a href="www.google.com" className="nav-link link-dark">
                                Manage Weight
                            </a>
                        </li>
                        <li>
                            <a href="www.google.com" className="nav-link link-dark">
                                Be Well
                            </a>
                        </li>
                        <li>
                            <a href="www.google.com" className="nav-link link-dark">
                                Enjoy A Treat</a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


