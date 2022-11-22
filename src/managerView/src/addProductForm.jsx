import React from 'react';

import '../styles/addProductForm.css'

import { addProduct } from '../../databaseConnections/managerViewFunctions';
import product from '../../dataStructures/product';
import { Input, TextField } from '@material-ui/core';
import { useState } from 'react';
import IngredientDropdown from './ingredientDropdown';

function createProduct(name, price, category, ingredients) {
    let newProduct = new product(-1, name, price, category)
    ingredients.map(ingredient => {
        newProduct.addIngredient(ingredient);
    })
    addProduct(newProduct)
}

function nameChange(e, setName) {
    setName(e.target.value)
}

function priceChange(e, setPrice) {
    setPrice(e.target.value)
}

function categoryChange(e, setCategory) {
    setCategory(e.target.value)
}

function AddProductForm(props) {
    const {ingredientOptions} = props;

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [ingredients, setIngredients] = useState([])

    return (
        <>
            <div id="addProductFormContainer">
                <div id="addProductInputContainer">
                    <TextField onChange={(e) => {nameChange(e, setName)}} id="createName" label="Name" />
                    <TextField onChange={(e) => {priceChange(e, setPrice)}} id="createPrice" label="Price" />
                    <TextField onChange={(e) => {categoryChange(e, setCategory)}} id="createCategory" label="Category" />
                </div>
                <div id="addProductDropdownContainer">
                    <IngredientDropdown ingredientOptions={ingredientOptions} setIngredients={setIngredients} />
                </div>
                <div id="addProductButtonContainer">
                    <button id='createProductButton' onClick={() => {createProduct(name, price, category, ingredients)}}>Create Product</button>
                </div>
            </div>
        </>
    );
}


export default AddProductForm;