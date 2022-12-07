import React, { useState } from 'react'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import { getProductsByName } from '../databaseConnections/sharedFunctions'
import ProductCard from './ProductCard'

export default function OrderPanel() {
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

            <div class="container h-100">
                {/* <div class="row">
                    <img id="logo" alt="Smoothie King Logo" src={SmoothieKingLogo}></img>

                </div> */}
                <div class="row m-3 mb-5">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Item Name</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Each</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody class="table-group-divider">
                            <tr>
                            <td scope="row">My Ass</td>
                            <td>1</td>
                            <td>$1.69</td>
                            <td>$1.69</td>
                            </tr>
                            <tr>
                            <td scope="row">Bootie</td>
                            <td>2</td>
                            <td>$3.33</td>
                            <td>$6.66</td>
                            </tr>
                            <tr>
                            <td scope="row">Wholesomeness</td>
                            <td>1</td>
                            <td>$5.20</td>
                            <td>$5.20</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="row row-cols-2 m-3">
                    <div class="col">
                        <h5>Subtotal:</h5>
                    </div>
                    <div class="col">
                        <h5 style={{textAlign: 'right'}}>$69.90</h5>
                    </div>
                    <div class="col">
                        <h5>Tax:</h5>
                    </div>
                    <div class="col">
                        <h5 style={{textAlign: 'right'}}>$5.00</h5>
                    </div>
                    <div class="col">
                        <h5>Total:</h5>
                    </div>
                    <div class="col">
                        <h5 style={{textAlign: 'right'}}>$74.90</h5>
                    </div>                    
                </div>

                {/* <div class="row mt-5 m-3">
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">Subtotal:</th>
                            <td>$69.90</td>
                            </tr>
                            <tr>
                            <th scope="row">Tax:</th>
                            <td>$5.00</td>
                            </tr>
                            <tr>
                            <th scope="row">Total:</th>
                            <td>$74.90</td>
                            </tr>
                        </tbody>
                    </table>
                </div> */}
                
                <div class="row m-3">
                    <button type="button" class="btn btn-danger mb-3 fw-bold" data-bs-toggle="button">Cancel Order</button>
                    <button type="button" class="btn btn-danger fw-bold" data-bs-toggle="button">Pay ($)</button>

                </div>
                
                
            </div>
        </>
    )
}