import apiURL from './sharedInfo'
import {getTable} from './managerViewFunctions';

/**
 * Gets products from the database that contain or equal the given name
 * @param {string} partialName partial name of a product to search for
 * @returns {json} data promise containing results data
 */
async function getProductsByName(partialName) {
    if(partialName === "") {
        return getTable("products");
    }
    let queryString = `${apiURL}/searchProducts/${partialName}`
    const results = await runFetch(queryString)
    return results
}

/**
 * Writes the orderTicket to the database
 * @param {orderTicket} ticket orderTicket with order information to write to the database
 * @returns {string} confirmation the function completed
 */
async function writeOrderToDb(ticket) {
    //Order ticket infomation
    let queryString = `${apiURL}/createOrder/ticket?timestamp=${ticket.getTimestamp.formatDateTime()}`
    queryString += `&firstName=${ticket.getCustomerFirstName}&memberId=${ticket.getRewardsMemberId}&employeeId=${ticket.getEmployeeId}`
    queryString += `&orderTotal=${ticket.getOrderPriceTotal}`
    
    const newOrderId = await runFetch(queryString, {method: "POST"})

    //Order item information
    await Promise.all (ticket.getItems.map(async (tempItem) =>  {
        queryString = `${apiURL}/createOrder/item?orderId=${newOrderId}&numberInOrder=${tempItem.getItemNumberInOrder}&`
        queryString += `name=${tempItem.getProduct.getName}&amount=${tempItem.getItemAmount}&size=${tempItem.getItemSize}`

        // eslint-disable-next-line
        const newItemId = await runFetch(queryString, {method: "POST"})

        //additions
        let additionsBody = []
        // eslint-disable-next-line
        tempItem.getAdditions.map((mod) => {
            let tempMod = {
                "orderId" : newOrderId,
                "numberInOrder" : tempItem.getItemNumberInOrder,
                "ingredientId" : mod.getIngredientId,
            }
            additionsBody.push(tempMod)
        })
        queryString = `${apiURL}/createOrder/addition`
        await runFetch(queryString, {method: "POST", body: JSON.stringify(additionsBody)})

        //subractions
        let subtractionsBody = []
        // eslint-disable-next-line
        tempItem.getSubtractions.map((mod) => {
            let tempMod = {
                "orderId" : newOrderId,
                "numberInOrder" : tempItem.getItemNumberInOrder,
                "ingredientId" : mod.getIngredientId,
            }
            subtractionsBody.push(tempMod)
        })
        queryString = `${apiURL}/createOrder/subtraction`
        await runFetch(queryString, {method: "POST", body: JSON.stringify(subtractionsBody)})

        
        //Updating ingredient counts
        let usedIngredients = []

        //Defaults
        // eslint-disable-next-line
        tempItem.getProduct.getIngredients.map(ingred => {usedIngredients.push(ingred.getId)})

        //Additions
        // eslint-disable-next-line
        tempItem.getAdditions.map(ingred => {usedIngredients.push(ingred.getIngredientId)})

        //Subtractions
        // eslint-disable-next-line
        tempItem.getSubtractions.map(ingred => {
            const index = usedIngredients.indexOf(ingred.getIngredientId)
            if(index > -1) {usedIngredients.splice(index, 1)}
        })

        //Decreasing amount
        let finalIngredients = []
        usedIngredients.map(async (ingred) => {
            let tempIngred = {"id" : ingred}
            finalIngredients.push(tempIngred)
        })
        queryString = `${apiURL}/updateIngredient?quantity=${tempItem.getItemAmount}`
        await runFetch(queryString, {method: "PUT", body: JSON.stringify(finalIngredients)})
    }))

    return "Finished"
}

/**
 * Gets ingredients from the database that contain or equal the given name
 * @param {string} partialName partial name of the ingredient to search for
 * @returns {json} data promise containing results data
 */
async function getIngredientsByName(partialName) {
    if(partialName === "") { return getTable('ingredients'); }
    let queryString = `${apiURL}/searchIngredients/${partialName}`
    const results = await runFetch(queryString)
    return results
}

/**
 * Verifies that this person is a rewards member
 * @param {int} id id of this rewards member's account 
 * @param {string} firstName first name of this rewards memeber
 * @returns {*} data promise containing customer information
 */
async function loginCustomer(id, firstName) {
    let queryString = `${apiURL}/login/verifyCustomer?id=${id}&name=${firstName}`
    const results = await runFetch(queryString)
    return results
}

/**
 * Verifies that this person is an employee
 * @param {int} id id of the emmployee
 * @param {string} firstName first name of the employee
 * @returns {*} data promise containing employee information
 */
async function loginEmployee(id, firstName) {
    let queryString = `${apiURL}/login/verifyEmployee?id=${id}&name=${firstName}`
    const results = await runFetch(queryString)
    return results
}

/**
 * Gets all ingredients for a product
 * @param {int} id id of the product to get ingredients for
 * @return data promise containing ingredient information
 */
async function getProductIngredients(id) {
    let queryString = `${apiURL}/productIngredients/${id}`
    const results = await runFetch(queryString)
    return results
}

/**
 * Function to run query and allow data access in calling function
 * @param {string} query completed http request as a string 
 * @param {object} options {key: value} for REST method, defaults to {method: "GET"}
 * @returns {*} data from the query
 */
async function runFetch(query, options = {method: "GET"}) {
        const response = await fetch(query, options)
        const data = await response.json()
        return data
}

export {getProductsByName, writeOrderToDb, runFetch, getIngredientsByName, loginCustomer, loginEmployee, getProductIngredients}