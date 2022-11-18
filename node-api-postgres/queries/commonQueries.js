const { request, response } = require('express')
const {newPool} = require('./queryConnections')

//Product search bar
const searchProducts = (request, response) => {
    let Params = request.params
    let queryString = `SELECT * FROM products WHERE name ILIKE '%${Params.name}%'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

//Ingredient search bar
const searchIngredients = (request, response) => {
    let Params = request.params
    let queryString = `SELECT * FROM ingredients WHERE name ILIKE '%${Params.name}%'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

//Insert orderticket - Making the assumption everything required will be given
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

//Insert orderItem - Making the assumption everything required will be given
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

//Insert addition - Making the assumption everything required will be given
const insertNewItemAddition = (request, response) => {
    let BODY = request.body

    //Creating new subtraction
    BODY.map((item) => {
        let queryString = 'INSERT INTO orderitemadditions (orderid, itemnumberinorder, ingredientid) VALUES '
        queryString += `(${item['orderId']}, ${item['numberInOrder']}, ${item['ingredientId']})`
        newPool.query(queryString, (error, results) => {
            if(error) {throw (error)}
        }) 
    })
    response.status(200).send("Success")
}

//Insert subtraction - Making the assumption everything required will be given
const insertNewOrderSubtraction = (request, response) => {
    let BODY = request.body

    //Creating new subtraction
    BODY.map((item) => {
        let queryString = 'INSERT INTO orderitemsubtractions (orderid, itemnumberinorder, ingredientid) VALUES '
        queryString += `(${item['orderId']}, ${item['numberInOrder']}, ${item['ingredientId']})`
        newPool.query(queryString, (error, results) => {
            if(error) {throw (error)}
        }) 
    })
    response.status(200).send("Success")
}

//Employee login
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

//Customer login
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

//Decrementing ingredients
const updateIngredient = async (request, response) => {
    let Params = request.params
    let Querys = request.query
    
    //Getting current amount
    let currentAmount
    let queryString = `SELECT quantityremaining FROM ingredients WHERE id = ${Params.id}`
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
    queryString = `UPDATE ingredients SET quantityremaining = ${currentAmount} WHERE id = ${Params.id}`
    newPool.query(queryString, (error, results) => {
        if(error) {reject (error)}
        response.status(200).send('true')
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
}