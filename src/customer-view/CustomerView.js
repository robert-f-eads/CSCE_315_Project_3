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
import banner from './banner.png'

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



/**
 * @param {*} props resets the order ticket when an order is done
 */
function refreshOrderTicket() {ticket = new orderTicket(0, new dateTime(mm + "-" + dd + "-" + yyyy, time), name, id, 0, 0)}



/**
 * @param {*} props the order ticket to pass to the cart view
 * @returns a popup of the cart view 
 */
function ShowCartView(ticket) {
    console.log("showing cart");
    return (
        <>
            <CartView orderTicket={ticket} />
        </>
    )
}



/**
 * @param {*} props gets all of the search results from using the search bar in the sidebar
 * @returns search bar
 */
function getSearchResults(setSearchResults) {
    let searchString = document.getElementById('searchBarEntryField').value
    if (searchString === "") { getProductsByName("-").then((data) => { setSearchResults(data) }) }
    else { getProductsByName(searchString).then((data) => { setSearchResults(data) }) }
    showSearch = true
}


/**
 * @param {*} props data to use in display
 * @returns either renders a menu view component or a series of product cards if something specific is searched
 * 
 */
export function CheckDisplay(props) {
    if (props.hasSearched) {
        /*Search bar results*/
        return <div className="container">
            <div className="row">
                {props.dataProp && props.dataProp.length > 0 && props.dataProp.map((item) =>
                    <ProductCard language={props.language} orderTicket={props.ticket} pId={item.id} pName={item.name} pPrice={item.price} pCategory={item.category} func={props.func} func1={props.func1} />
                )}
            </div>
        </div>
    }
    else {
        /*Menu view */
        return <div className="row">
            <MenuView language={props.language} orderTicket={props.ticket} func={props.func} func1={props.func1}></MenuView>
        </div>
    }
}


/**
 * @param {*} props data to use in displaying the customer view page
 * @returns customer view home
 */
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
                            <img alt="Logo" className="img-responsive" style={{ "maxHeight": "70px", marginTop: "3vh" }} src={SmoothieKingLogo}></img>
                        </div>
                        <div className="col" style={{  backgroundImage:`url(${banner})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", "marginBottom": "0px", minHeight: "13vh", left: "0" }}>
                        
                        </div>
                    </div>
                </div>


                <div className="row g-0">
                    <div className="col-3">
                        <SideBar language={props.language} usingGoogle = {props.usingGoogle} searchBarId="searchBarEntryField" getSearchResults={() => { getSearchResults(setSearchResults) }} ShowCartView={ShowCartView} func={setshowCart} />
                    </div>
                    <Modifications language={props.language} orderTicket = {ticket} currentOrderItem={tempItem} trigger={showMod} func={setShowMod} />
                    <div className="col">
                        <div className="container-fluid">

                            <CheckDisplay language={props.language} dataProp={searchResults} hasSearched={showSearch} func={setTempItem} func1={setShowMod} ticket={ticket} />
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

