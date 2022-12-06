import React, { useState } from 'react'
import './SubtractionButton.css'
import { orderItemModification } from '../dataStructures/dataStructuresExports.js'

export default function SubtractionButton(props) {

  const [isSelected, setIsSelected] = useState(false);

  function removeModificationFromOrder() {
    //Create modification
    let temp_subtraction = new orderItemModification(0, 0, props.currentOrderItem.getItemNumberInOrder, props.ingredientId, props.ingredientName)

    //Add or remove modification
    const index = props.currentOrderItem.findSubtraction(temp_subtraction)
    if (index > -1) {props.currentOrderItem.getSubtractions.splice(index, 1)}
    else {props.currentOrderItem.addSubtraction(temp_subtraction)}
  }



  return (
    <>
      <button type="button" style={{ 'backgroundColor': isSelected ? 'maroon' : 'white', 'color': isSelected ? 'white' : 'black' }} class="SubtractionButton" onClick={() => {
        removeModificationFromOrder();
        setIsSelected(!isSelected)
      }}> {/* subrract ingredient to order ticket */}
        {props.ingredientName}
      </button>
    </>
  )
}
