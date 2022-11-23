import React from 'react'
import {orderItemModification} from '../dataStructures/dataStructuresExports.js'


export default function AdditionButton(props) {

  function addModificationToOrder() {
    //Create modification
    let temp_addition = new orderItemModification(0,0,props.currentOrderItem.getItemNumberInOrder, props.ingredientId, props.ingredientName)
    
    //Add or remove modification
    const index = props.currentOrderItem.getAdditions.indexOf(temp_addition)
    if(index > -1) {props.currentOrderItem.getAdditions.splice(index, 1)}
    props.currentOrderItem.addAddition(temp_addition)
  }


  return (
    <>
      <button onClick = {() => {addModificationToOrder()}}>  {/*add ingredient to order ticket */}
          {props.ingredientName}
      </button>
    </>
  )
}
