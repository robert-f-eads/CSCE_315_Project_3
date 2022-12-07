import React, { useEffect, useState } from 'react'
import './SubtractionButton.css'
import { orderItemModification } from '../dataStructures/dataStructuresExports.js'
import { translateText } from '../databaseConnections/managerViewFunctions';

/**
 * @param {*} props data to use in displaying the subtraction buttons
 * @returns a button that will add an ingredient as a subtraction to the order ticket
 */

export default function SubtractionButton(props) {

  const [isSelected, setIsSelected] = useState(false);
  const [translatedIngredientName, setTranslatedIngredientName] = useState(props.ingredientName);

  useEffect(() => {
    translateText(props.ingredientName, 'en', props.language).then(tt => {
      setTranslatedIngredientName(tt.translatedText);
    })
  }, [])

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
      <button type="button" style={{ 'backgroundColor': isSelected ? 'maroon' : 'white', 'color': isSelected ? 'white' : 'black' }} className="SubtractionButton" onClick={() => {
        removeModificationFromOrder();
        setIsSelected(!isSelected)
      }}> {/* subrract ingredient to order ticket */}
        {translatedIngredientName}
      </button>
    </>
  )
}
