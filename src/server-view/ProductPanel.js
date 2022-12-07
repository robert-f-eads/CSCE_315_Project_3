import React, { useState } from 'react'
import './MainPanel.css'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import { getProductsByName } from '../databaseConnections/sharedFunctions'
import ProductCard from './ProductCard'
import Card from './Card'

function showProducts(productName, setProducts) {
    console.log("Showing products");
    getProductsByName(productName).then(res => {
        console.log(res);
        setProducts(res);
    });
}

export default function ProductPanel() {
    const [products, setProducts] = useState([]);

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            {/* <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link> */}

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossorigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>

            <div class="container">
                {/* <div class="row m-3 justify-content-end">
                    <div class="col-6">
                        <button type="button" class="btn btn-danger" data-bs-toggle="button">Logout</button>
                    </div>
                    
                </div> */}
                {/* <div class="row m-3 me-0 mt-0">
                <div class="col-7 pe-0">
                <ul class="nav nav-pills">
                    <li class="nav-item dropdown border border-dark">
                        <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Hello, Robert Kaliyur</a>
                        <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div> */}

                <div class="row m-3">
                    <SearchBar showProducts={(productName) => {showProducts(productName, setProducts)}}></SearchBar>
                {/* <form class="d-flex" role="search">
                    <input class="form-control me-2" type="search" placeholder="Search for a product..." aria-label="Search"/>
                    <button class="btn btn-outline-danger" type="submit">Search</button>
                </form> */}
                </div>
                
                <div class="row">
                    {/* individual buttons separated  */}
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="button">Feel Energized</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="button">Get Fit</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="button">Manage Weight</button>
                    <button type="button" class="btn btn-primary" data-bs-toggle="button">Be Well</button> */}

                    
                    <div class="btn-group" role="group" aria-label="smoothie categories button group">
                        <input type="radio" class="btn-check" name="btnradio" id="feel-energized-btn" autocomplete="off"/>
                        <label class="btn btn-outline-danger fw-bold" for="btnradio1">Feel Energized</label>

                        <input type="radio" class="btn-check" name="btnradio" id="get-fit-btn" autocomplete="off"/>
                        <label class="btn btn-outline-danger fw-bold" for="btnradio2">Get Fit</label>

                        <input type="radio" class="btn-check" name="btnradio" id="manage-weight-btn" autocomplete="off"/>
                        <label class="btn btn-outline-danger fw-bold" for="btnradio3">Manage Weight</label>

                        <input type="radio" class="btn-check" name="btnradio" id="be-well-btn" autocomplete="off"/>
                        <label class="btn btn-outline-danger fw-bold" for="btnradio4">Be Well</label>
                    </div>
                    {/* <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-danger">Feel Energized</button>
                        <button type="button" class="btn btn-danger">Get Fit</button>
                        <button type="button" class="btn btn-danger">Manage Weight</button>
                        <button type="button" class="btn btn-danger">Be Well</button>
                    </div> */}
                </div>

                <div class="row row-cols-6 g-1 mt-3">
                    {products.map(product => {
                                return (
                                    <div key={product.id} class="productCardContainer">
                                        <Card productName={product.name}/>
                                    </div>
                                )
                            })}
                    {/* <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card> */}
                    {/* <div class="col">
                        <div class="card">
                        <img src="..." class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                        <img src="..." class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                        <img src="..." class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                        <img src="..." class="card-img-top" alt="..."/>
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        </div>
                        </div>
                    </div> */}
                    </div>
            </div>
        </>
    )
}