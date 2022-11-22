import React from 'react'
import './Modifications.css'
import SearchBar from './SearchBar'

export default function Modifications(props) {
    return (true) ? (
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

            <div className="popup">
                <div className="popup-inner" style={{ "min-height": "80vh", "min-width": "80vw" }}>
                    <div class="modification-view">
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <button onClick={() => { props.func(false) }} style={{ "backgroundColor": "transparent", "color": "maroon" }}>
                                        <i class="fa fa-angle-left" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="row top-panel item-name">
                                {props.itemName}
                            </div>
                        </div>

                        <div class="container">
                            <div class="row">
                                <div class="col header-name">
                                    Size
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-2">
                                    <button>
                                        20oz
                                    </button>

                                </div>
                                <div class="col-2">
                                    <button>
                                        32oz
                                    </button>
                                </div>
                                <div class="col-2">
                                    <button>
                                        40oz
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div class="container">
                            <div class="row">
                                <div class="col header-name">
                                    Subtractions
                                </div>
                            </div>
                            <div class="row">
                               <div class = "container">
                                    hi there i will have buttons
                               </div>

                            </div>
                        </div>

                        <div class="container">
                            <div class="row">
                                <div class="col header-name">
                                    Additions
                                    <br></br>
                                    <SearchBar/>
                                </div>
                            </div>
                            <div class = "row">
                               
                            </div>
                            <div class="row">
                               <div class = "container" style = {{minHeight: "100%"}}>
                                    hi there i will have buttons
                               </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    ) : "";
}
