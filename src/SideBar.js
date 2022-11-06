import React from 'react'
import './SideBar.css'
import SmoothieKingLogo from './logo.png'
import SearchBar from './SearchBar.js'

export default function SideBar() {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossorigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>


            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ "width": "280px", "height": "100vh;" }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <div className="container" style = {{"padding-bottom" : "25px"}}>
                        <div className="row">
                            <img alt="Test" src={SmoothieKingLogo}></img>
                        </div>
                    </div>
                </a>
                <div class="row" style={{ "padding-bottom": "25px" }}>
                    <div class="col" style={{ "align-content": "center" }}>
                        <i class="fa fa-user" aria-hidden="true" style={{ "padding-left": "40px", "color": "maroon", "font-size": "25px" }}></i>
                    </div>
                    <div class="col" style={{ "align-content": "center" }}>
                        <i class="fa fa-shopping-cart" aria-hidden="true" style={{ "padding-left": "50px", "color": "maroon", "font-size": "25px" }}></i>
                    </div>
                </div>


                <SearchBar></SearchBar>

                <hr></hr>

                <ul className="nav nav-pills flex-column mb-auto" style = {{"padding-top" : "25px"}}>
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
                        <a href="www.google.com" className="nav-link link-dark">Enjoy A Treat</a>
                    </li>
                </ul>
            </div>
        </>
    )
}


