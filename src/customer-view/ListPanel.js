import React from 'react'
import "./ListPanel.css"
import './ListPanelEntry'
import ListPanelEntry from './ListPanelEntry'

export default function ListPanel(props) {
    return (
        <>
            <div class="container" style={{ "border": "1px solid red", "min-height": "35vh" }}>
                {/*fetch order items here*/}
                {props.orderTicket && props.orderTicket.getItems.map((item) =>
                    <ListPanelEntry name = {item.getName} size = {item.getSize} price= {item.getPrice} quantity= {item.getQuantity}></ListPanelEntry>
                )}
            </div>
        </>
    )
}
