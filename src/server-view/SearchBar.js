import {React, useState, useEffect} from 'react'
import { translateText } from '../databaseConnections/managerViewFunctions'
import './SearchBar.css'

/**
 * @param {*} props data to use in displaying a search bar, or text field and button
 * @returns a container with a text box and a button 
 */
export default function SearchBar(props) {
    const { getSearchResults } = props;

    const [translatedPlaceholder, setTranslatedPlaceholder] = useState("Search for item");
    useEffect(() => {
        translateText("Search for item", 'en', props.language).then(tt => {
            setTranslatedPlaceholder(tt.translatedText);
        })
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

            <div className="container">
                <div className="row g-0" style={{ "alignContent": "left !important", "paddingBottom": "10px" }}>
                    <div className="search">
                        <div className="col">
                            <input type="text" className="form-control" placeholder={translatedPlaceholder} id={props.inputId} ></input>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" type="button" onClick={getSearchResults}>
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
