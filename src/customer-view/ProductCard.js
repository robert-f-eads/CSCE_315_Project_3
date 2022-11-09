import React from 'react'
import './ProductCard.css'
import TestImage from './ProductImages/strawberry-kiwi-breeze.png'
import {product, orderItem} from '../dataStructures/dataStructuresExports';

/**
 * @param {orderTicket} currentOrderTicket
 */
function productCardClicked(currentOrderTicket, id, name, price) {
    
    var tempProduct = new product(id, name, price)
    var itemNumber
    var currentItems = currentOrderTicket.getItems
    
    if(currentItems.length === 0) {itemNumber = 0}
    else {itemNumber = currentItems[currentItems.length-1].getItemNumberInOrder + 1}
    
    let temp_item = new orderItem(0, 0, itemNumber, 1, 20, tempProduct)
    currentOrderTicket.addItemToOrder(temp_item)
    alert("Item added to cart");
}


export default function ProductCard(props) {
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

            <div className="card product-card shadow-sm p-3 mb-5" style = {{"height" : "80%"}}>
                <button type="button" onClick={() => {productCardClicked(props.orderTicket, props.pId, props.pName, props.pPrice)}}>
                    <img className="card-img-top" src={TestImage} alt="Card cap"></img>
                    <div className="card-body">
                        <h4 className="card-title"> {props.pName} </h4>
                    </div>
                </button>
            </div>
        </>
    )
}