import { React, useEffect, useState } from 'react'
import './ProductCard.css'
import TestImage from './ProductImages/strawberry-kiwi-breeze.png'
import { product, orderItem, ingredient } from '../dataStructures/dataStructuresExports';
import { getProductIngredients } from '../databaseConnections/databaseFunctionExports'
import { translateText } from '../databaseConnections/managerViewFunctions';


/**
 * @param {*} currentOrderTicket the current order ticket in which to add the item
 * @param {*} id the ingredient id
 * @param {*} name the name of the item
 * @param {*} price the price of the item
 * @param {*} setTempItem  the temporary item to set
 * @param {*} setShowMod the state for determing whether the popup is open or close
 * @returns a boostrap card with an image on top and a text section at the bottom to display products
 */
async function productCardClicked(currentOrderTicket, id, name, price, setTempItem, setShowMod) {
    var tempProduct = new product(id, name, price)
    let ingreds = []
    await getProductIngredients(id).then((data) => {
        data.map((element) => {
            var tempIngred = new ingredient(element.id, element.name, element.expirationDate, element.quantityRemaining, 0,
                element.measurementUnits, element.pricePerUnitLastOrder, element.lastOrderDate, element.unitsInLastOrder)
            ingreds.push(tempIngred)
        })
    })

    tempProduct.setIngredients = ingreds
    var itemNumber
    var currentItems = currentOrderTicket.getItems

    if (currentItems.length === 0) { itemNumber = 0 }
    else { itemNumber = currentItems[currentItems.length - 1].getItemNumberInOrder + 1 }

    let temp_item = new orderItem(0, 0, itemNumber, 1, 20, tempProduct)

    //Add editted item to order
    currentOrderTicket.addItemToOrder(temp_item)

    setTempItem(temp_item)
    setShowMod(true)
}


/**
 * @param {*} props data to use in displaying each individual product card
 * @returns a boostrap card with an image on top and a text section at the bottom to display products
 */
export default function ProductCard(props) {
    const [translatedName, setTranslatedName] = useState(props.pName);

    useEffect(() => {
        translateText(props.pName, 'en', props.language).then(tt => {
            setTranslatedName(tt.translatedText);
        });
    }, []);

    let productImagePath = require(`./ProductImages/angel-food-slim.png`);
    try {
        productImagePath = require(`./ProductImages/${props.pName}.png`);
    } catch {
    }

    return (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossOrigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossOrigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossOrigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossOrigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>

            <div className="card product-card shadow-sm p-3 mb-5" style={{ "height": "80%" }}>
                <button type="button" onClick={() => { productCardClicked(props.orderTicket, props.pId, props.pName, props.pPrice, props.func, props.func1) }}>
                    <img className="card-img-top" src={productImagePath} alt="Card cap"></img>
                    <div className="card-body">
                        <h4 className="card-title"> {translatedName} </h4>
                    </div>
                </button>
            </div>
        </>
    )
}
