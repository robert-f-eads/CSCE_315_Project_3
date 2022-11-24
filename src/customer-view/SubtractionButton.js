import React from 'react'
import {orderItemModification} from '../dataStructures/dataStructuresExports.js'

export default function SubtractionButton(props) {
  
  function removeModificationFromOrder() {
    //Create modification
    let temp_subtraction = new orderItemModification(0,0,props.currentOrderItem.getItemNumberInOrder, props.ingredientId, props.ingredientName)
    
    //Add or remove modification
    const index = props.currentOrderItem.getSubtractions.indexOf(temp_subtraction)
    if(index > -1) {props.currentOrderItem.getSubtractions.splice(index, 1)}
    props.currentOrderItem.addSubtraction(temp_subtraction)
  }
  
  return (
    <>
      <button onClick = {() => removeModificationFromOrder()}> {/* subrract ingredient to order ticket */}
          {props.ingredientName}
      </button>
    </>
  )
}
