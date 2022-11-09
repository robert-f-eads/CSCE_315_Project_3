import React, { useState } from 'react'
import './MainPanel.css'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import SideBar from './SideBar'
import { getProductsByName } from '../databaseConnections/sharedFunctions'
import ProductCard from './ProductCard'
import {CheckDisplay} from '../customer-view/CustomerView';

function showProducts(productName, setProducts) {
    console.log("Showing products");
    getProductsByName(productName).then(res => {
        console.log(res);
        setProducts(res);
    });
}

export default function MainPanel() {
    const [products, setProducts] = useState([]);

    return (
        // <>
            // <div id="allContent">
                <div id="mainPanel">
                    <img id="logo" alt="Smoothie King Logo" src={SmoothieKingLogo}></img>
                    <SearchBar showProducts={(productName) => {showProducts(productName, setProducts)}}></SearchBar>
                    <div id="products">
                        <CheckDisplay dataProp={products} hasSearched={true}/>
                        {/* {products.map(product => {
                            return (
                                <div key={product.id} class="productCardContainer">
                                    <ProductCard productName={product.name}/>
                                </div>
                            )
                        })} */}
                    </div>
            // </div>
        // </>
    )
}

