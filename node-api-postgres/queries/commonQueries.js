const {newPool} = require('./queryConnections')

//Product search bar
const searchProducts = (request, response) => {
    let Params = request.params
    let queryString = `SELECT * FROM products WHERE name ILIKE '%${Params.name}%'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw error}
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

const insertNewItemAddition =(request, response) => {}

const insertNewOrderSubtraction =(request, response) => {}

const loginEmployee =(request, response) => {
    let Querys = request.query
    console.log(Querys.id)
    console.log(Querys.name)
    
    //Verifiy employee exist and return permissions
    let queryString = `SELECT * FROM employees WHERE id=${Querys.id} AND firstname='${Querys.name}'`
    console.log(queryString)
    newPool.query(queryString, (error, results) => {
        if(error) {return false}
    })
}

const loginRewardsMember =(request, response) => {}



module.exports = {
    searchProducts, 
    insertNewTicket, 
    insertNewOrderItem, 
    insertNewItemAddition, 
    insertNewOrderSubtraction, 
    loginEmployee,
    loginRewardsMember,
}