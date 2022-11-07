import React from 'react'
import "./CartView.css"
import './CartViewEntry'
import CartViewEntry from './CartViewEntry'

export default function CartView(props) {
    return (
        <>
            <div class="container" style={{ "border": "1px solid red", "min-height": "35vh" }}>
                <div class="container-fluid">
                    <div class="row top-panel">
                        <div class = "col">
                            <button>
                                Remove
                            </button>
                        </div>
                        <div class = "col">
                            <button>
                                Edit Item
                            </button>
                        </div>
                    </div>
                </div>

                {props.orderTicket && props.orderTicket.getItems.map((item) =>
                    <CartViewEntry name={item.getProduct.getName} size={item.getItemSize} price={item.getProduct.getPrice} quantity={item.getItemAmount}></CartViewEntry>
                )}
            </div>
        </>
    )
}
