import React from 'react'
import './MainPanel.css'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import SideBar from './SideBar'
import { getProductsByName } from '../databaseConnections/sharedFunctions'
import ProductCard from './ProductCard'

function showProducts(productName) {
    console.log("Showing products");
    getProductsByName(productName).then(res => {
        console.log(res);
    });
}

export default function MainPanel() {
    return (
        // <>
            // <div id="allContent">
                <div id="mainPanel">
                    <img id="logo" alt="Smoothie King Logo" src={SmoothieKingLogo}></img>
                    <SearchBar showProducts={showProducts}></SearchBar>
                    <div id="products">
                        <ProductCard productName = {"Strawberry Kiwi Breeze"}></ProductCard>
                        <ProductCard productName = {"Strawberry Kiwi Breeze"}></ProductCard>
                        <ProductCard productName = {"Strawberry Kiwi Breeze"}></ProductCard>
                        <ProductCard productName = {"Strawberry Kiwi Breeze"}></ProductCard>

                    </div>
            // </div>
        // </>
    )
}

