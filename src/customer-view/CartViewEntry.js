import React from 'react'
import './CartViewEntry.css'

export default function CartViewEntry(props) {
    return (
        <>
            <div class="container-fluid">
                <div class="row order-item">
                    <div class="col-md-6">
                        <b>{props.name}</b>
                    </div>

                    <div class=" col-md-2">
                        {props.size}oz
                    </div>

                    <div class = "col-md-2">
                        {props.quantity}
                    </div>

                    <div class="col-md-2">
                        ${props.price}
                    </div>
                </div>
            </div>
        </>
    )
}
