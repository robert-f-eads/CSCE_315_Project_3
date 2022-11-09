import React from 'react'
import './MainPanel.css'
import SmoothieKingLogo from './logo2.png'
import SearchBar from './SearchBar'
import SideBar from './SideBar'


export default function MainPanel() {
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
                                <div key={product.id} className="productCardContainer">
                                    <ProductCard productName={product.name}/>
                                </div>
                            )
                        })} */}
                    </div>
            // </div>
            
        // </>

    )
}

