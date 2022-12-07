import {React, useState, useEffect} from 'react'
import { translateText } from '../databaseConnections/managerViewFunctions'
import './SearchBar.css'


export default function TextBox(props) {
    function updateInformation() {
        if(props.textBoxId === "customerName") {
            let value = document.getElementById(props.textBoxId).value
            props.ticket.setCustomerFirstName = value
        }
        else if (props.textBoxId === "rewardsMemberId"){
            let value = document.getElementById(props.textBoxId).value
            props.ticket.setRewardsMemberId = value
        }
    }

    const [translatedPlaceholder, setTranslatedPlaceholder] = useState(props.hintMessage);
    useEffect(() => {
        translateText(props.hintMessage, 'en', props.language).then(tt => {
            setTranslatedPlaceholder(tt.translatedText);
        })
    }, [])

    const { getSearchResults } = props;

    
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

            <div className="container">
                <div className="row g-0" style={{ "alignContent": "left !important" }}>
                    <div className="search">
                        <div className="col">
                            <input type="text" className="form-control" placeholder={translatedPlaceholder} id = {props.textBoxId}></input>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" type="button" onClick = {() => updateInformation()}>
                                <i className="fa fa-angle-right" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
