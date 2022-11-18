import { React, useState, useEffect } from 'react'
import './MenuView.css'
import ProductCard from './ProductCard'
import { getProductsByName } from '../databaseConnections/databaseFunctionExports'
import { product } from '../dataStructures/dataStructuresExports'



//var feelEnergized = ["coffee-d-lite-mocha", "coffee-d-lite-vanilla", "coffee-high-protein-almond-mocha-1", "coffee-high-protein-almond-vanilla", "pumpkin-espresso-high-protein"];
//var getFit = ["the-activator-blueberry-strawberry", "the-activator-chocolate", "the-activator-coffee", "the-activator-pineapple", "the-activator-recovery-blueberry-tart-cherry", "the-activator-recovery-pineapple-spinach", "the-activator-recovery-strawberry-banana", "gladiator-chocolate", "gladiator-strawberry", "gladiator-vanilla", "the-hulk-chocolate", "the-hulk-strawberry", "the-hulk-vanilla", "the-hulk-coffee", "peanut-power-plus", "peanut-power-plus-chocolate", "peanut-power-plus-strawberry", "power-punch-plus", "stretch-flex-pineapple-kale", "stretch-flex-tart-cherry"];
//var manageWeight = ["keto-champ-berry", "keto-champ-chocolate", "keto-champ-coffee", "keto-champ-pumpkin", "lean1-chocolate", "lean1-pineapple-mango", "lean1-strawberry", "lean1-vanilla", "mangofest", "metabolism-boost-banana-passion-fruit", "metabolism-boost-mango-ginger", "metabolism-boost-strawberry-pineapple", "the-shredder-chocolate", "the-shredder-strawberry", "the-shredder-vanilla", "pumpkin-slim-n-trim", "slim-n-trim-blueberry", "slim-n-trim-strawberry", "slim-n-trim-vanilla", "slim-n-trim-veggie"]
//var beWell = ["veggie-apple-kiwi-kale", "blueberry-heaven", "daily-warrior", "greek-yogurt-pineapple-mango", "greek-yogurt-strawberry-blueberry", "immune-builder-mixed-berry", "immune-builder-orange", "immune-builder-veggie-superfood", "veggie-lemon-ginger-spinach", "vegan-coffee-mocha", "vegan-dark-chocolate-banana", "vegan-espresso-mocha", "vegan-mango-kale", "vegan-mixed-berry", "vegan-nutty-super-grain", "vegan-pineapple-spinach"];
//var enjoyATreat = ["angel-food", "angel-food-slim", "banana-berry-treat", "banana-boat", "berry-punch", "carribean-way", "green-tea-tango", "island-impact", "lemon-twist-banana", "lemon-twist-strawberry", "muscle-punch", "orange-x-treme", "passion-passport", "pineapple-surf", "pumpkin-d-lite", "strawberry-kiwi-breeze", "strawberry-x-treme", "tart-cherry-x-treme", "yogurt-d-lite"]

export default function MenuView(props) {
    const [menuItems, setMenuItems] = useState([]);

    function getdata() {
        getProductsByName("-").then((data) => { setMenuItems(data) })
    }

    useEffect(() => { getdata() }, [])

    return (
        <>
            <div className="container menu-view-container">
                <div className="row">
                    {menuItems.map((element) => {
                        return (
                            <ProductCard orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price}></ProductCard>
                        );
                    })}
                </div>

                {/* feel energized 
                <div className="row category-title align-middle">
                    Feel Energized
                </div>
                  
                <div className="row product-card-row">
                    {feelEnergized.map((element) => {
                        return ( 
                            <ProductCard orderTicket={props.orderTicket} key={element.name} pName={element.name} pId={element.id} pPrice={element.price}></ProductCard>
                        );
                    })}
                    
                </div>


                <div className="row category-title">
                    Get Fit
                </div>
                <div className="row product-card-row">
                    {getFit.map((name) => {
                        return (
                            <ProductCard key={name} pName={name}></ProductCard>
                        );
                    })}
                </div>


                <div className="row category-title">
                    Manage Weight
                </div>
                <div className="row product-card-row">
                    {manageWeight.map((name) => {
                        return (
                            <ProductCard key={name} pName={name}></ProductCard>
                        );
                    })}
                </div>


                <div className="row category-title">
                    Be Well
                </div>
                <div className="row product-card-row">
                    {beWell.map((name) => {
                        return (
                            <ProductCard key={name} pName={name}></ProductCard>
                        );
                    })}
                </div>


                <div className="row category-title">
                    Enjoy A Treat
                </div>
                <div className="row product-card-row">
                    {enjoyATreat.map((name) => {
                        return (
                            <ProductCard key={name} pName={name}></ProductCard>
                        );
                    })}
                </div>
                */}

            </div>

        </>
    )
}
