import React from 'react'
import './ListPanelEntry.css'

export default function ListPanelEntry(props) {
    return (
        <>
            <div class="container-fluid">
                <div class="row">
                    <div class="order-item col-md-6">
                        <b>{props.name}</b>
                    </div>

                    <div class="order-item col-md-2">
                        {props.size}oz
                    </div>

                    <div class="order-item col-md-2">
                        {props.quantity}
                    </div>

                    <div class="order-item col-md-2">
                        {props.price}
                    </div>
                </div>
            </div>
        </>
    )
}
