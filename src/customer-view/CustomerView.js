import { React, useState } from 'react'
import SideBar from './SideBar.js'
import CartView from './CartView.js'
import 'font-awesome/css/font-awesome.min.css';
import { orderTicket, dateTime, orderItem, product } from './../dataStructures/dataStructuresExports'
import 'reactjs-popup/dist/index.css';
import ProductCard from './ProductCard.js';
import MenuView from './MenuView.js';
import { getProductsByName } from '../databaseConnections/databaseFunctionExports'
import Modifications from './Modifications'
import SmoothieKingLogo from '../Logo.png'

var name;
var id;
var temp_date = new Date().toJSON()
var yyyy = temp_date.slice(0,4);
var mm = temp_date.slice(5,7);
var dd = temp_date.slice(8,10);
var time = temp_date.slice(11, 19);

var ticket = new orderTicket(0, new dateTime(mm + "-" + dd + "-" + yyyy, time), "Blank", 0, 0, 0) 

//var showCart = false;
var showSearch = false;

function refreshOrderTicket() {ticket = new orderTicket(0, new dateTime(mm + "-" + dd + "-" + yyyy, time), name, id, 0, 0)}

function ShowCartView(ticket) {
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
                    <ProductCard orderTicket={props.ticket} pId={item.id} pName={item.name} pPrice={item.price} pCategory={item.category} func={props.func} func1={props.func1} />
                )}
            </div>
        </div>
    }
    else {
        /*Menu view */
        return <div className="row">
            <MenuView orderTicket={props.ticket} func={props.func} func1={props.func1}></MenuView>
        </div>
    }
}

export default function CustomerView(props) {
    const [searchResults, setSearchResults] = useState([])
    const [showCart, setshowCart] = useState(false)
    const [showMod, setShowMod] = useState(false)
    const [tempItem, setTempItem] = useState()

    ticket.setCustomerFirstName = props.userData[0]
    ticket.setRewardsMemberId = props.userData[2]
    name = props.userData[0]
    id = props.userData[2]

    return (
        <>
            <div className="container-fluid px-0">

                <div className="container-fluid px-0 sticky-top" style={{ backgroundColor: "rgb(248, 249, 250)" }}>
                    <div className="row g-0 px-0">
                        <div className="col-3" style={{ textAlign: "center" }}>
                            <img alt="Logo" class="img-responsive" style={{ "max-height": "70px" }} src={SmoothieKingLogo}></img>
                        </div>
                        <div className="col" style={{ "background-image": "url(banner.png)", "backgroundSize": "fill", "margin-bottom": "0px", "min-height": "12vh", "left": "0" }}>
                        </div>
                    </div>
                </div>


                <div className="row g-0">
                    <div className="col-3">
                        <SideBar usingGoogle = {props.usingGoogle} searchBarId="searchBarEntryField" getSearchResults={() => { getSearchResults(setSearchResults) }} ShowCartView={ShowCartView} func={setshowCart} />
                    </div>
                    <Modifications orderTicket = {ticket} currentOrderItem={tempItem} trigger={showMod} func={setShowMod} />
                    <div className="col">
                        <div className="container-fluid">

                            {/*<div className="row sticky-top" style={{ "backgroundImage": "url(banner.png)", "max-height": "145px", "min-height": "145px", "backgroundSize": "cover", "paddingBottom": "100px" }}>
                            </div>*/}

                            <CheckDisplay dataProp={searchResults} hasSearched={showSearch} func={setTempItem} func1={setShowMod} ticket={ticket} />
                            {/*<MenuView/>*/}
                            {/*Popup cart view*/}
                            <div className="row" style={{ "paddingTop": "100px" }}>
                                <CartView orderTicket={ticket} trigger={showCart} func={setshowCart} ticketRefresh={()=>refreshOrderTicket()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

