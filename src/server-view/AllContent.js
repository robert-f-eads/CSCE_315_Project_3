import React, { useState } from 'react'
import './MainPanel.css'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import { getProductsByName } from '../databaseConnections/sharedFunctions'
import ProductCard from './ProductCard'
import OrderPanel from './OrderPanel'
import ProductPanel from './ProductPanel'
import NavBar from './NavBar'


export default function AllContent(props) {
    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            {/* <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link> */}

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossorigin="anonymous"></script>
            <script>
                new WOW().init();
            </script> */}

            <div class="container-fluid h-100">
                <div class="row">
                    <div class="col p-0">
                        <NavBar></NavBar>
                    </div>
                </div>
                <div class="row h-100">
                    <div class="col border-end border-4 border-light" style={{borderWidth: "0px 0px 8px 0px", borderColor: "#bbbfbc"}}>
                        <OrderPanel></OrderPanel>
                    </div>
                    <div class="col">
                        <ProductPanel></ProductPanel>
                    </div>
                </div>
            </div>
        </>
    )
}
