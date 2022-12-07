import { React, useState, useEffect } from 'react'
import './MenuView.css'
import ProductCard from './ProductCard'
import { getProductsByName } from '../databaseConnections/databaseFunctionExports'
import { product } from '../dataStructures/dataStructuresExports'
import { translateText } from '../databaseConnections/managerViewFunctions'





var feelEnergized = [];
var getFit = [];
var manageWeight = [];
var beWell = [];
var enjoyATreat = [];


/**
 * @param {*} props data to use in displaying the menu
 * @returns an organized table of all of the products displayed in their categories or alone depending on if the user has searched for a specific item
 */

export default function MenuView(props) {
    const [menuItems, setMenuItems] = useState([]);

    const text = {
        'Feel Energized': 'Feel Energized',
        'Get Fit': 'Get Fit',
        'Manage Weight': 'Manage Weight',
        'Be Well': 'Be Well',
        'Enjoy A Treat': 'Enjoy A Treat',
    }
    const [translatedText, setTranslatedText] = useState(text);
    useEffect(() => {
        let originalText = [];
        for(const [key, ] of Object.entries(text)) {
            originalText.push(key);
        }
        const originalTextCopy = originalText.slice();
        Promise.all(originalText.map(async originalTextPiece => {
            let tt = await translateText(originalTextPiece, 'en', props.language)
            return tt.translatedText;
        })).then(translatedText => {
            let tempTranslatedText = {};
            for(let i = 0; i < originalTextCopy.length; i++) {
                let originalTextPiece = originalTextCopy[i];
                let translatedTextPiece = translatedText[i];
                tempTranslatedText[originalTextPiece] = translatedTextPiece;
            }
            setTranslatedText(tempTranslatedText);
        });
    }, [])


    function getdata() {
        getProductsByName("-").then((data) => { setMenuItems(data) })
    }

    useEffect(() => { getdata() }, [])

    return (
        <>
            <div className="container menu-view-container">
              {/*  <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (
                            <ProductCard orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price}></ProductCard>
                        );
                    })}
                </div> */}

                {/* feel energized */}
                <div id = "FeelEnergized" className="row category-title align-middle" style = {{"scrollMarginTop": "6em"}}>
                    {translatedText['Feel Energized']}
                </div>

                <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (element.category === "feelEnergized") ? (
                            <ProductCard language={props.language} orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price} func={props.func} func1={props.func1}></ProductCard>
                        )
                            : "";
                    })}
                </div>


                <div id = "GetFit" className="row category-title align-middle" style = {{"scrollMarginTop": "6em"}}>
                    {translatedText['Get Fit']}
                </div>

                <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (element.category === "getFit") ? (
                            <ProductCard language={props.language} orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price} func={props.func} func1={props.func1}></ProductCard>
                        )
                            : "";
                    })}
                </div>

                <div id = "ManageWeight" className="row category-title align-middle" style = {{"scrollMarginTop": "6em"}}>
                    {translatedText['Manage Weight']}
                </div>

                <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (element.category === "manageWeight") ? (
                            <ProductCard language={props.language} orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price} func={props.func} func1={props.func1}></ProductCard>
                        )
                            : "";
                    })}
                </div>

                <div id = "BeWell" className="row category-title align-middle" style = {{"scrollMarginTop": "6em"}}>
                    {translatedText['Be Well']}
                </div>

                <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (element.category === "beWell") ? (
                            <ProductCard language={props.language} orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price} func={props.func} func1={props.func1}></ProductCard>
                        )
                            : "";
                    })}
                </div>

                <div id = "EnjoyATreat" className="row category-title align-middle" style = {{"scrollMarginTop": "6em"}}>
                    {translatedText['Enjoy A Treat']}
                </div>

                <div className="row product-card-row">
                    {menuItems.map((element) => {
                        return (element.category === "enjoyATreat") ? (
                            <ProductCard language={props.language} orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price} func={props.func} func1={props.func1}></ProductCard>
                        )
                            : "";
                    })}
                </div>
            </div>

        </>
    )
}
