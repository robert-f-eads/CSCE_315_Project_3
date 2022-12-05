import '../styles/managerSideBar.css'

import SmoothieKingLogo from '../../Logo.png'
import InventoryButton from './inventoryButton'
import ServerViewButton from './serverViewButton'
import OrderHistoryButton from './orderHistoryButton'
import TrendsButton from './trendsButton'
import AddButton from './addButton'
import ReorderButton from './reorderButton'

export default function ManagerSideBar(props) {
    const {setInventoryVisible, setOrderHistoryVisible, setTrendsVisible, setSalesVisible, setExcessVisible, setAddVisible, setReorderVisible} = props;
    const visibleElements = {
        'inventory': setInventoryVisible,
        'orderHistory': setOrderHistoryVisible,
        'trends': setTrendsVisible,
        'sales': setSalesVisible,
        'excess': setExcessVisible,
        'add': setAddVisible,
        'reorder': setReorderVisible
    };

    const setSafeVisible = (elementName) => {
        for(const [key, ] of Object.entries(visibleElements)) {
            if(key === elementName) {
                visibleElements[key](true);
            } else {
                visibleElements[key](false);
            }
        }
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


            <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ "width": "280px", "height": "100vh" }}>
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                    <div className="container" style = {{"paddingBottom" : "0px"}}>
                        <div className="row">
                            <img alt="Test" src={SmoothieKingLogo}></img>
                        </div>
                    </div>
                </a>
                <div className="row" style={{ "paddingBottom": "10px" }}>
                    <div className="col" style={{ "alignContent": "center" }}>
                        <i className="fa fa-user" aria-hidden="true" style={{ "paddingLeft": "40px", "color": "maroon", "fontSize": "25px" }}></i>
                    </div>
                    <div className="col" style={{ "alignContent": "center" }}>
                        <i className="fa fa-shopping-cart" aria-hidden="true" style={{ "paddingLeft": "50px", "color": "maroon", "fontSize": "25px" }}></i>
                    </div>
                </div>

                <hr></hr>

                <ul className="nav nav-pills flex-column mb-auto" style = {{"paddingTop" : "0px"}}>
                    <li className="nav-item nav-link link-dark">
                        <ServerViewButton />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <OrderHistoryButton setOrderHistoryVisible={() => {setSafeVisible('orderHistory')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <InventoryButton setInventoryVisible={() => {setSafeVisible('inventory')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <TrendsButton setTrendsVisible={() => {setSafeVisible('trends')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <AddButton setAddVisible={() => {setSafeVisible('add')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ReorderButton setReorderVisible={() => {setSafeVisible('reorder')}} />
                    </li>
                </ul>
            </div>
        </>
    )
}