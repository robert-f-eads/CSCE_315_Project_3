import { React, useState } from 'react'
import './CartViewEntry.css'
import { orderTicket, dateTime, orderItem, product } from './../dataStructures/dataStructuresExports'
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function CartViewEntry(props) {
    const [amount, setAmount] = useState(props.orderItem.getItemAmount)

    const color1 = "rgb(186, 186, 187)"
    const color2 = "rgb(248, 249, 250)"

    async function updateIndex() {
        if(props.currentIndex !== null) {document.getElementById(props.currentIndex).style.backgroundColor = color2}
        var reference = document.getElementById(props.orderItem.getItemNumberInOrder)
        if(reference.style.backgroundColor === color1) {reference.style.backgroundColor = color2} 
        else {reference.style.backgroundColor = color1}
        await props.setIndex(props.orderItem.getItemNumberInOrder)
    }


    return (
        <>
            <div id={props.orderItem.getItemNumberInOrder} class="container-fluid cart-view-entry" onClick = {() => updateIndex()}>
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
                                    }} class="quantity-button"> <AiOutlineMinus size={20} />
                                    </button>
                                </div>

                                <div class="col text-center">
                                    {amount}
                                </div>
                                <div class="col align-content-center">
                                    <button onClick={() => {
                                        props.orderItem.setItemAmount = (props.orderItem.getItemAmount + 1);
                                        setAmount(amount + 1)
                                    }}
                                        class="quantity-button"><AiOutlinePlus size={20} />
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
