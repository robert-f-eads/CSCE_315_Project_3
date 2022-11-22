import { React, useState } from 'react'
import SideBar from './SideBar.js'
import CartView from './CartView.js'
import 'font-awesome/css/font-awesome.min.css';
import { orderTicket, dateTime, orderItem, product } from './../dataStructures/dataStructuresExports'
import 'reactjs-popup/dist/index.css';
import ProductCard from './ProductCard.js';
import MenuView from './MenuView.js';
import { getProductsByName } from '../databaseConnections/databaseFunctionExports'

var ticket = new orderTicket(0, new dateTime("06-03-2002"), "Alexia", 0, 0, 10);

//var showCart = false;
var showSearch = false;

function ShowCartView() {
    console.log("showing cart");
    return (
        <>
            <CartView orderTicket={ticket} />
        </>
    )
}

/*const getShowCart = (bool) => {
    showCart = bool;
    console.log(bool);
}*/

function getSearchResults(setSearchResults) {
    let searchString = document.getElementById('searchBarEntryField').value
    if (searchString === "") { getProductsByName("-").then((data) => { setSearchResults(data) }) }
    else { getProductsByName(searchString).then((data) => { setSearchResults(data) }) }
    showSearch = true
}

export function CheckDisplay(props) {
    if (props.hasSearched) {
        /*Search bar results*/
        return <div className="container">
            <div className="row">
                {props.dataProp && props.dataProp.length > 0 && props.dataProp.map((item) =>
                    <ProductCard orderTicket={ticket} pId={item.id} pName={item.name} pPrice={item.price} pCategory = {item.category}/>
                )}
            </div>
        </div>
    }
    else {
        /*Menu view */
        return <div className="row">
            <MenuView orderTicket = {ticket}></MenuView>
        </div>
    }
}

export default function CustomerView() {
    const [searchResults, setSearchResults] = useState([])
    const [showCart, setshowCart] = useState(false)

    return (
        <>
            <div className="container-fluid px-0">
                <div className="row g-0">
                    <div className="col-3">
                        <SideBar getSearchResults={() => { getSearchResults(setSearchResults) }} ShowCartView={ShowCartView} func={setshowCart} />
                    </div>
                    <div className="col-9">
                        {/*<div className="row" style={{ "background-image": "url(banner.png)", "backgroundSize": "cover", "padding-bottom": "100px" }}>*/}

                        <div className="container-fluid">

                            <div className="row sticky-top" style={{ "backgroundImage": "url(banner.png)", "max-height": "145px", "min-height": "145px", "backgroundSize": "cover", "paddingBottom": "100px" }}>
                            </div>

                            <CheckDisplay dataProp={searchResults} hasSearched={showSearch} />
                            {/*<MenuView/>*/}
                            {/*Popup cart view*/}
                            <div className="row" style={{ "paddingTop": "100px" }}>
                                <CartView orderTicket={ticket} trigger={showCart} func={setshowCart} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

