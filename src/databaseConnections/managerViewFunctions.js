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
    newProduct.getIngredients.map(ingred => {
        let temp_data = {"productId" : newProductId, "ingredientId" : ingred.getId}
        ingredientData.push(temp_data)
    })
    queryString = `${apiURL}/createProduct/ingredient`
    await runFetch(queryString, {method: "POST", body: JSON.stringify(ingredientData)})
    
    return "Finished"
}


export {getTable, generateSalesReport, generateRestockReport, generateExcessReport, addProduct}