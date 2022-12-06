import apiURL from './sharedInfo'
import {runFetch} from "./sharedFunctions"

/**
 * Gets all data from the requested table with optional limit
 * @param {string} tableName name of the table to get data from
 * @param {int} limit maximum number of rows you want back (default is all)
 * @returns {json} data promise containing table data
 */
async function getTable(tableName, limit = 0) {
    let queryString
    if(limit === 0) {
        queryString = `${apiURL}/table/${tableName}`
    }
    else {
        queryString = `${apiURL}/table/${tableName}?limit=${limit}`
    }
    return await runFetch(queryString)
}

/**
 * Makes API call to generate sales report for the products
 * @param {string} startDate start date of the search, defaults to Sep. 30th 12AM 
 * @param {string} endDate end date of the search, defaults to Nov. 18th 11:59PM
 * @returns {json} data promise containing product sales data
 */
async function generateSalesReport(startDate = '2022-09-30 00:00:00', endDate = '2022-11-18 23:59:59') {
    let queryString = `${apiURL}/generateReport/sales?start=${startDate}&end=${endDate}`
    const data = await runFetch(queryString)
    return data
}

/**
 * Makes API call to generate restock report for the ingredients
 * @returns data promise containing ingredient information for those that need restocking
 */
async function generateRestockReport() {
    let queryString = `${apiURL}/generateReport/restock`
    const data = await runFetch(queryString)
    return data
}

/**
 * Makes API call to generate excess report for under used ingredients
 * @param {string} startDate start date of the search, defaults to Sep. 30th 12AM 
 * @param {string} endDate end date of the search, defaults to Nov. 18th 11:59PM
 * @returns {json} data promise containing data for under used ingredients
 */
async function generateExcessReport(startDate = '2022-09-30 00:00:00', endDate = '2022-11-18 23:59:59') {
    let queryString = `${apiURL}/generateReport/excess?start=${startDate}&end=${endDate}`
    const data = await runFetch(queryString)
    return data
}

/**
 * Makes API calls to add new product and matching ingredients
 * @param {product} newProduct new product to be added to the database
 * @returns {string} confirmation the function completed
 */
async function addProduct(newProduct) {
    //Product
    let queryString = `${apiURL}/createProduct/item?name=${newProduct.getName}&price=${newProduct.getPrice}&category=${newProduct.getCategory}`
    const newProductId = await runFetch(queryString, {method: "POST"})

    //Ingredients
    let ingredientData = []
    
    // eslint-disable-next-line
    newProduct.getIngredients.map(ingred => {
        let temp_data = {"productId" : newProductId, "ingredientId" : ingred.getId}
        ingredientData.push(temp_data)
    })
    queryString = `${apiURL}/createProduct/ingredient`

    return await runFetch(
        queryString,
        {
            method: "POST",
            body: JSON.stringify(ingredientData),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
    );
}

/**
 * Makes API call to update ingredient infromation (useful once restock report is generated)
 * @param {id} id of the ingredient to be updated
 * @param {quantityToAdd} quantity to be added to the ingredients total
 * @returns {string} confirmation the function completed
 */
async function increaseIngredientQuantity(id, quantityToAdd) {
    let ingredients = [{"id": id}];
    let queryString = `${apiURL}/increaseIngredientQuantity?quantity=${quantityToAdd}`
    return await runFetch(
        queryString,
        {
            method: "POST",
            body: JSON.stringify(ingredients),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
    );
}

/**
 * Makes API call to translate some text
 * @param {strings} text to be translated
 * @param {sourceLang} source language
 * @param {targetLang} target language
 * @returns json object containing translated text {translatedText} I think
 */
async function translateText(strings, sourceLang, targetLang) {
    let data = {strings, sourceLang, targetLang};
    let queryString = `${apiURL}/translateText`
    return await runFetch(
        queryString,
        {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
            })
        }
    );
}


export {getTable, generateSalesReport, generateRestockReport, generateExcessReport, addProduct, increaseIngredientQuantity, translateText}