import { React, useState } from 'react'
import './CartViewEntry.css'
import { orderTicket, dateTime, orderItem, product } from './../dataStructures/dataStructuresExports'

export default function CartViewEntry(props) {
    const [amount, setAmount] = useState(props.orderItem.getItemAmount)

    return (
        <>
            <div class="container-fluid">
                <div class="row order-item">
                    <div class="col-md-4">
                        <b>{props.orderItem.getProduct.getName}</b>
                    </div>

                    <div class="col-md-1"></div>

                    <div class=" col-md-2">
                        {props.orderItem.getItemSize}oz
                    </div>

                    <div class="col-md-4">
                        <div class="container">
                            <div class="row g-0">
                                <div class="col">
                                    <button onClick={() => {
                                        if (amount >= 1) {
                                            props.orderItem.setItemAmount = (props.orderItem.getItemAmount - 1); setAmount(amount - 1)
                                        }
                                    }} class="quantity-button"><i class="fa fa-minus" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <div class="col">
                                    {amount}
                                </div>
                                <div class="col align-content-center">
                                    <button onClick={() => {
                                        props.orderItem.setItemAmount = (props.orderItem.getItemAmount + 1);
                                        setAmount(amount + 1)
                                    }}
                                        class="quantity-button"><i class="fa fa-plus" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-1">
                        {props.orderItem.getProduct.getPrice}
                    </div>
                </div>
                {props.orderItem.getAdditions.map((element) => {
                    return (
                        <div class="row order-item-modification">
                            Addition: {element.getIngredientName}
                        </div>
                    )
                })}    

                {props.orderItem.getSubtractions.map((element) => {
                    return (
                        <div class="row order-item-modification">
                            Subtraction: {element.getIngredientName}
                        </div>
                    )
                })}     
            </div>
        </>
    )
}
