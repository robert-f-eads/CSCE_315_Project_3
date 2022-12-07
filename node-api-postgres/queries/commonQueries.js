const e = require('express')
const { request, response } = require('express')
const {newPool} = require('./queryConnections')

/**
 * Gets products from database with a pattern matched partial name
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const searchProducts = (request, response) => {
    let Params = request.params
    let queryString = `SELECT * FROM products WHERE name ILIKE '%${Params.name}%'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

/**
 * Get ingredients from the database with a pattern matched partial name
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const searchIngredients = (request, response) => {
    let Params = request.params
    let queryString = `SELECT * FROM ingredients WHERE name ILIKE '%${Params.name}%'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

/**
 * Inserts order ticket data into database
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const insertNewTicket = (request, response) => {
    let Querys = request.query

    //Creating new order ticket
    let queryString = 'INSERT INTO ordertickets (timestamp, customerfirstname, rewardsmemberid, employeeid, orderpricetotal) VALUES '
    queryString += `('${Querys.timestamp}', '${Querys.firstName}', ${Querys.memberId}, ${Querys.employeeId}, ${Querys.orderTotal})`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
    })

    //Returning new order ticket id
    queryString = 'SELECT id FROM ordertickets ORDER BY id DESC LIMIT 1'
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows[0]['id'])
    })
}
/**
 * Inserts order item into the database
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const insertNewOrderItem = (request, response) => {
    let Querys = request.query

    //Creating new orderItem 
    let queryString = 'INSERT INTO orderitems (orderid, itemnumberinorder, itemname, itemamount, itemsize) VALUES '
    queryString += `(${Querys.orderId}, ${Querys.numberInOrder}, '${Querys.name}', ${Querys.amount}, ${Querys.size})`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
    })

    //Returning new orderItem id
    queryString = 'SELECT id FROM orderitems ORDER BY id DESC LIMIT 1'
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows[0]['id'])
    })
}

/**
 * Inserts order item addition into the database
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const insertNewItemAddition = (request, response) => {
    let BODY = request.body

    //Creating new subtraction
    BODY.forEach(item => {
        let queryString = 'INSERT INTO orderitemadditions (orderid, itemnumberinorder, ingredientid) VALUES '
        queryString += `(${item['orderId']}, ${item['numberInOrder']}, ${item['ingredientId']})`
        newPool.query(queryString, (error, results) => {
            if(error) {throw (error)}
        }) 
    })
    response.status(200).json({})
}

/**
 * Inserts order item subtraction into the database
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const insertNewOrderSubtraction = (request, response) => {
    let BODY = request.body
    //Creating new subtraction
    BODY.forEach(item => {
        let queryString = 'INSERT INTO orderitemsubtractions (orderid, itemnumberinorder, ingredientid) VALUES '
        queryString += `(${item['orderId']}, ${item['numberInOrder']}, ${item['ingredientId']})`
        newPool.query(queryString, (error, results) => {
            if(error) {throw (error)}
        }) 
    })
    response.status(200).json({})
}

/**
 * Checks database to log in employee
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const loginEmployee = (request, response) => {
    let Querys = request.query
    
    //Verifiy employee exists, is active, and return data
    let queryString = `SELECT id, firstname, lastname, isadmin, active FROM employees WHERE id=${Querys.id} AND firstname='${Querys.name}'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        
        //Deciding response based on query results
        if(results.rows.length == 0) {response.status(200).send('false')}
        else if(results.rows[0]['active']) {response.status(200).json(results.rows)}
        else {response.status(200).send('false')}  
    })
}

/**
 * Checks database to log in customer
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const loginRewardsMember = (request, response) => {
    let Querys = request.query

    //Verify rewards member exists and return data
    let queryString = `SELECT id, firstname, lastname FROM rewardsmembers WHERE id=${Querys.id} AND firstname='${Querys.name}'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        
        //Deciding response based on query results
        if(results.rows.length == 0) {response.status(200).send('false')}
        else {response.status(200).json(results.rows)}
    })
}

/**
 * Decrements ingredients when used to make a product in an order
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const updateIngredient = async (request, response) => {
    let Querys = request.query
    let BODY = request.body
    
    BODY.map(async (item) => {
        //Getting current amount
        let currentAmount
        let queryString = `SELECT quantityremaining FROM ingredients WHERE id = ${item['id']}`
        await new Promise((resolve, reject) => {
            newPool.query(queryString, (error, results) => {
                if(error) {reject (error)}
                if(results.rows.length == 0) {response.status(200).send('false')}
                else {
                    currentAmount = parseFloat(results.rows[0]['quantityremaining']) - (1 * Querys.quantity)
                    resolve(currentAmount)
                }
            })
        }) 
        
        
        //Decreasing amount as needed
        queryString = `UPDATE ingredients SET quantityremaining = ${currentAmount} WHERE id = ${item['id']}`
        newPool.query(queryString, (error, results) => {
            if(error) {reject (error)}
            
        })
    })
    response.status(200).json({})
}

/**
 * Gathers ingredients in a certain product
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const getIngredinetsForProduct = async (request, response) => {
    let Params = request.params

    let queryString = 'SELECT ingredients.id, ingredients.name, expirationdate, quantityremaining, measurementunits, priceperunitlastorder, lastorderdate, '
    queryString += 'unitsinlastorder FROM ingredients INNER JOIN productstoingredients ON productstoingredients.ingredientid=ingredients.id INNER JOIN products on '
    queryString += `products.id = productstoingredients.productid WHERE products.id=${Params.id}`

    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

/**
 * Creates a new rewards member if one does not exist
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const createRewardsMember = async (request, response) => {
    let BODY = request.body
    
    //Check if email or phone has been used previously
    let queryString = `SELECT * FROM rewardsmembers WHERE email='${BODY.email}'`
    let results = await new Promise((resolve, reject) => {
        newPool.query(queryString, (error, results) => {
            if(error) {reject (error)}  
            resolve(results)
        })
    })
    if(results.rows.length != 0) {response.status(200).send('false'); return}
    
    //Create entry for new rewards member
    queryString = 'INSERT INTO rewardsmembers (firstname, lastname, phone, email, birthday, rewardpoints) VALUES '
    queryString += `('${BODY.fname}', '${BODY.lname}', '${BODY.phone}', '${BODY.email}', '${BODY.birthday}', 0)`
    results = await new Promise((resolve, reject) => {
        newPool.query(queryString, (error, results) => {
            if(error) {reject (error)}
            resolve(results)
        })
    })

    //Returning the new data
    queryString = 'SELECT id, firstname, lastname FROM rewardsmembers ORDER BY id DESC LIMIT 1'
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

/**
 * Verifies customer in our database when signing in with Google OAuth
 * @param {*} request Request coming from the client
 * @param {*} response Response going going back to the client
 */
const googleAuth = async (request, response) => {
    let Querys = request.query

    //Verify rewards member exists and return data
    let queryString = `SELECT id, firstname, lastname FROM rewardsmembers WHERE email='${Querys.email}'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        
        //Deciding response based on query results
        if(results.rows.length == 0) {response.status(200).send('false')}
        else {response.status(200).json(results.rows)}
    })
}

module.exports = {
    searchProducts, 
    searchIngredients,
    insertNewTicket, 
    insertNewOrderItem, 
    insertNewItemAddition, 
    insertNewOrderSubtraction, 
    loginEmployee,
    loginRewardsMember,
    updateIngredient,
    getIngredinetsForProduct,
    createRewardsMember,
    googleAuth,
}