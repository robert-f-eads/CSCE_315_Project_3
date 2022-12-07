import {React, useEffect, useState} from 'react'
import './SideBar.css'
import { useNavigate } from 'react-router-dom'
import SmoothieKingLogo from '../Logo.png'
import SearchBar from './SearchBar'
import { translateText } from '../databaseConnections/managerViewFunctions'
import TextBox from './TextBox.js'


/**
 * @param {*} props data to use in displaying the sidebar and its text fields
 * @returns a side navbar
 */
export default function SideBar(props) {
    const { language, getSearchResults, showCartView} = props;
    const navigate = useNavigate()

    const categoryNames = {
        'Feel Energized': 'Feel Energized',
        'Get Fit': 'Get Fit',
        'Manage Weight': 'Manage Weight',
        'Be Well': 'Be Well',
        'Enjoy A Treat': 'Enjoy A Treat',
    }

    const [translatedCategoryNames, setTranslatedCategoryNames] = useState(categoryNames);

    useEffect(() => {
        let originalNames = [];
        for(const [key, ] of Object.entries(categoryNames)) {
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
            setTranslatedCategoryNames(tempNames);
        });
    }, [])

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


            <div className="sidebar sticky-top">
                <div className="">


                    <hr></hr>
                    <div className="row" style={{ "paddingBottom": "0px" }}>
                        <div className="col" style={{ "textAlign": "center" }}>
                            <button onClick = {() => {navigate("/login")}}>
                                <i className="fa fa-sign-out" aria-hidden="true" style={{ "color": "maroon", "fontSize": "27px" }}></i>
                            </button>
                        </div>
                        <div className="col" style={{ "textAlign": "center" }}>
                            <button onClick={() => { props.func(true) }}>
                                <i className="fa fa-shopping-cart" aria-hidden="true" style={{ "color": "maroon", "fontSize": "25px" }}></i>
                            </button>
                        </div>
                    </div>
                    
                    <SearchBar language={language} inputId={props.searchBarId} getSearchResults={getSearchResults}></SearchBar>
                    
                   

                    <ul className="nav nav-pills flex-column mb-auto" style={{ "paddingTop": "0px" }}>
                        <li className="nav-item">
                            <a href="#FeelEnergized" className="nav-link link-dark" aria-current="page">
                                {translatedCategoryNames['Feel Energized']}
                            </a>
                        </li>
                        <li>
                            <a href="#GetFit" className="nav-link link-dark">
                                {translatedCategoryNames['Get Fit']}
                            </a>
                        </li>
                        <li>
                            <a href="#ManageWeight" className="nav-link link-dark">
                                {translatedCategoryNames['Manage Weight']}
                            </a>
                        </li>
                        <li>
                            <a href="#BeWell" className="nav-link link-dark">
                                {translatedCategoryNames['Be Well']}
                            </a>
                        </li>
                        <li>
                            <a href="#EnjoyATreat" className="nav-link link-dark">
                                {translatedCategoryNames['Enjoy A Treat']}
                            </a>
                        </li>
                    </ul>

                    <br></br>
                    <br></br>

                    <TextBox ticket = {props.ticket} language={language} textBoxId = {"customerName"} hintMessage = {"Customer Name"}/>
                    <TextBox ticket = {props.ticket} language={language} textBoxId = {"rewardsMemberId"} hintMessage = {"Rewards Member ID"}/>
                </div>
            </div>
        </>
    )
}


