import apiURL from './sharedInfo'
import {getTable} from './managerViewFunctions';

/**
 * Gets products from the database that contain or equal the given name
 * @param {string} partialName partial name of a product to search for
 * @returns data promise containing results data
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
 */
async function writeOrderToDb(ticket) {
    //Order ticket infomation
    let queryString = `${apiURL}/createOrder/ticket?timestamp=${ticket.getTimestamp.formatDateTime()}`
    queryString += `&firstName=${ticket.getCustomerFirstName}&memberId=${ticket.getRewardsMemberId}&employeeId=${ticket.getEmployeeId}`
    queryString += `&orderTotal=${ticket.getOrderPriceTotal}`
    
    const newOrderId = await runFetch(queryString, {method: "POST"})

    //Order item information
    ticket.getItems.forEach(async tempItem =>  {
        queryString = `${apiURL}/createOrder/item?orderId=${newOrderId}&numberInOrder=${tempItem.getItemNumberInOrder}&`
        queryString += `name=${tempItem.getProduct.getName}&amount=${tempItem.getItemAmount}&size=${tempItem.getItemSize}`

        // eslint-disable-next-line
        const newItemId = await runFetch(queryString, {method: "POST"})

        //Order item modification
    })
}

/**
 * Function to run query and allow data access in calling function
 * @param {string} query completed http request as a string 
 * @param {object} options {key: value} for REST method, defaults to {method: "GET"}
 * @returns data from the query
 */
async function runFetch(query, options = {method: "GET"}) {
        const response = await fetch(query, options)
        const data = await response.json()
        return data
}

export {getProductsByName, writeOrderToDb, runFetch}