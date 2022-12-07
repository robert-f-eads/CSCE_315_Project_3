import React, { useEffect } from 'react'
import './Modifications.css'
import SearchBar from './SearchBar'
import AdditionButton from './AdditionButton'
import SubtractionButton from './SubtractionButton'
import { getIngredientsByName, getProductsByName } from '../databaseConnections/databaseFunctionExports'
import { useState } from 'react'
import orderTicket from '../dataStructures/orderTicket'
import { translateText } from '../databaseConnections/managerViewFunctions'



/**
 * @param {*} props data to use in displaying the modifications page
 * @returns a popup which allows customers to modify their order item's size and ingredients
 */
export default function Modifications(props) {
    //const [additionItems, setAdditionItems] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [translatedName, setTranslatedName] = useState(props.currentOrderItem?.getProduct.getName);

    useEffect(() => {
        translateText(props.currentOrderItem?.getProduct.getName, 'en', props.language).then(tt => {
            setTranslatedName(tt.translatedText);
        });
    })

    var showSearch = false;

    
    /**
     * @param {*} setSearchResults state information
     * @returns creates additions based on a search entry
     */
    function getSearchResults(setSearchResults) {
        let searchString = document.getElementById('additionEntryField').value
        if (searchString === "") { getIngredientsByName("-").then((data) => { setSearchResults(data) }) }
        else { getIngredientsByName(searchString).then((data) => { setSearchResults(data) }) }
        showSearch = true
    }

    return (props.trigger) ? (
        <>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
            <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/animatecss/3.5.2/animate.min.css"></link>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
            <link href='https://fonts.googleapis.com/css?family=Parisienne' rel='stylesheet'></link>

            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
            <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js" integrity="sha256-xLD7nhI62fcsEZK2/v8LsBcb4lG7dgULkuXoXB/j91c=" crossorigin="anonymous"></script>

            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
            <script src="https://kit.fontawesome.com/0b9f4346c0.js" crossorigin="anonymous"></script>
            <script>
                new WOW().init();
            </script>

            <div className="popup" style={{ "z-index": "100" }}>
                <div className="popup-inner" style={{ "min-height": "80vh", "min-width": "80vw"}}>
                    <div className="modification-view">
                        <div className="container" style = {{maxHeight: "50vh", overflowY: "auto"}}>
                            <div className="row">
                                <div className="col">
                                    <button onClick={() => { 
                                            var tempArray = props.orderTicket.getItems;
                                            if (tempArray.length > 1) {
                                                props.orderTicket.setItems = tempArray.slice(0, tempArray.length - 1)
                                            }
                                            props.func(false)
                                        }} 
                                        style={{ "backgroundColor": "transparent", "color": "maroon", "border": "none" }}>
                                        <i className="fa fa-angle-left" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row top-panel item-name">
                                {translatedName}
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col header-name">
                                    Size
                                </div>
                            </div>
                            <div className="row">
                               <div className="col-2">
                                    <button id = "size20" onClick={() => {props.currentOrderItem.setItemSize = 20; 
                                        document.getElementById('size20').style.backgroundColor = 'maroon';
                                        document.getElementById('size20').style.color = 'white';

                                        document.getElementById('size32').style.backgroundColor = 'white';
                                        document.getElementById('size32').style.color = 'black';
                                        document.getElementById('size40').style.backgroundColor = 'white';
                                        document.getElementById('size40').style.color = 'black';
                                    }}>
                                        20oz
                                    </button>

                                </div>
                                <div className="col-2">
                                    <button id = "size32" onClick={() => {props.currentOrderItem.setItemSize = 32;
                                        document.getElementById('size32').style.backgroundColor = 'maroon';
                                        document.getElementById('size32').style.color = 'white';

                                        document.getElementById('size20').style.backgroundColor = 'white';
                                        document.getElementById('size20').style.color = 'black';
                                        document.getElementById('size40').style.backgroundColor = 'white';
                                        document.getElementById('size40').style.color = 'black';
                                    }}>
                                        32oz
                                    </button>
                                </div>
                                <div className="col-2">
                                    <button id = "size40" onClick={() => {props.currentOrderItem.setItemSize = 40;
                                        document.getElementById('size40').style.backgroundColor = 'maroon';
                                        document.getElementById('size40').style.color = 'white';

                                        document.getElementById('size32').style.backgroundColor = 'white';
                                        document.getElementById('size32').style.color = 'black';
                                        document.getElementById('size20').style.backgroundColor = 'white';
                                        document.getElementById('size20').style.color = 'black';
                                    }}>
                                        40oz
                                    </button>
                                </div>

                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col header-name">
                                    Subtractions
                                </div>
                            </div>
                            <div className="row">
                                <div className="container">
                                    {props.currentOrderItem.getProduct.getIngredients.map((element) => {
                                        return (
                                            <SubtractionButton language={props.language} ingredientName={element.name} currentOrderItem={props.currentOrderItem} ingredientId={element.id} />
                                            )
                                    })}
                                </div>

                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                <div className="col header-name">
                                    Additions
                                    <br></br>
                                    <SearchBar inputId={"additionEntryField"} getSearchResults={() => { getSearchResults(setSearchResults) }} />
                                </div>
                            </div>
                           
                            <div className="row">
                                <div className="container" style={{ minHeight: "100%" }}>
                                    {searchResults.map((element) => {
                                        return (
                                            <AdditionButton language={props.language} ingredientName={element.name} currentOrderItem={props.currentOrderItem} ingredientId={element.id} />
                                        );

                                    })}

                                </div>
                            </div>

                            <div className ="row">
                                <div className = "col">
                                    <button className = "float-end" onClick = {() => props.func(false)}> Add to Cart </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    ) : "";
}
