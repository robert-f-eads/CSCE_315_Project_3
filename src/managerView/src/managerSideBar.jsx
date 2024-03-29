import '../styles/managerSideBar.css'

import SmoothieKingLogo from '../../Logo.png'
import ServerViewButton from './serverViewButton'
import { useNavigate } from 'react-router-dom'
import ToggleButton from './toggleButton'
import { useEffect } from 'react'
import { translateText } from '../../databaseConnections/managerViewFunctions'
import { useState } from 'react'

/**
 * @param {*} props data to use in display
 * @returns a sidebar used for navigating across and through the manager view
 */
export default function ManagerSideBar(props) {

    const navigate = useNavigate();

    const {language, setInventoryVisible, setOrderHistoryVisible, setTrendsVisible, setSalesVisible, setExcessVisible, setAddVisible, setReorderVisible} = props;
    const visibleElements = {
        'inventory': setInventoryVisible,
        'orderHistory': setOrderHistoryVisible,
        'trends': setTrendsVisible,
        'sales': setSalesVisible,
        'excess': setExcessVisible,
        'add': setAddVisible,
        'reorder': setReorderVisible
    };
    const [names, setNames] = useState({});

    useEffect(() => {
        let originalNames = [];
        for(const [key, ] of Object.entries(visibleElements)) {
            originalNames.push(key);
        }
        const originalNamesCopy = originalNames.slice();
        Promise.all(originalNames.map(async originalName => {
            let tt = await translateText(originalName, 'en', language)
            return tt.translatedText;
        })).then(translatedNames => {
            let tempNames = {};
            for(let i = 0; i < originalNamesCopy.length; i++) {
                let originalName = originalNamesCopy[i];
                let translatedName = translatedNames[i];
                tempNames[originalName] = translatedName;
            }
            setNames(tempNames);
        });
    }, [])

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
                    <div className="col" style={{ "alignContent": "center"}}>
                        <button style={{'border': 'none'}} onClick={() => {
                            navigate('/login')
                        }}>
                            <i className="fa fa-sign-out" aria-hidden="true" style={{ "paddingLeft": "40px", "color": "maroon", "fontSize": "25px" }}></i>
                        </button>
                    </div>
                </div>

                <hr></hr>

                <ul className="nav nav-pills flex-column mb-auto" style = {{"paddingTop" : "0px"}}>
                    <li className="nav-item nav-link link-dark">
                        <ServerViewButton />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ToggleButton name={names['orderHistory']} setComponent={() => {setSafeVisible('orderHistory')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ToggleButton name={names['inventory']} setComponent={() => {setSafeVisible('inventory')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ToggleButton name={names['trends']} setComponent={() => {setSafeVisible('trends')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ToggleButton name={names['add']} setComponent={() => {setSafeVisible('add')}} />
                    </li>
                    <li className="nav-item nav-link link-dark">
                        <ToggleButton name={names['reorder']} setComponent={() => {setSafeVisible('reorder')}} />
                    </li>
                </ul>
            </div>
        </>
    )
}