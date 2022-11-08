import React from 'react'
import SideBar from './SideBar.js'
import CartView from './CartView.js'
import 'font-awesome/css/font-awesome.min.css';
import { orderTicket, dateTime, orderItem, product } from './../dataStructures/dataStructuresExports'
import 'reactjs-popup/dist/index.css';
import ProductCard from './ProductCard.js';
import MenuView from './MenuView.js';

var ticket = new orderTicket(0, new dateTime("06-03-2002"), "Alexia", 0, 0, 10);
ticket.addItemToOrder(new orderItem(4, 0, 1, 1, 32, new product(1, "Temp-item", 6.99)))
ticket.addItemToOrder(new orderItem(5, 0, 2, 1, 20, new product(4, "Temp-item2", 7.99)))

var showCart = false;

function ShowCartView() {
    console.log("showing cart");
    return (
        <>
            <CartView orderTicket={ticket} />
        </>
    )
}

const getShowCart = (bool) => {
    showCart = bool;
    console.log(bool);
}

export default function CustomerView() {
    return (
        <>
            <div class="container-fluid px-0">
                <div class="row g-0">
                    <div class="col-3">
                        <SideBar ShowCartView={ShowCartView} func={getShowCart} />
                    </div>
                    <div class="col-9">
                        {/*<div className="row" style={{ "background-image": "url(banner.png)", "backgroundSize": "cover", "padding-bottom": "100px" }}>*/}

                        <div className="container-fluid">

                        <div className="row" style={{ "background-image": "url(banner.png)", "height": "170px", "backgroundSize": "cover", "padding-bottom": "100px" }}></div>
                            {/*this is main*/}
                            <div className="row">
                                <MenuView></MenuView>
                            </div>
                            <div className="row" style={{ "padding-top": "100px" }}>
                                <CartView orderTicket={ticket} trigger={showCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

