const { ConstructionOutlined } = require('@mui/icons-material')
const {newPool} = require('./queryConnections')

//Get table, with or without limit
const getTable = (request, response) => {
    let Params = request.params
    let Querys = request.query

    let queryString
    if(Querys.limit != null) {
        queryString = `SELECT * FROM ${Params.tableName} LIMIT ${parseInt(Querys.limit)}`
    }
    else {
        queryString = `SELECT * FROM ${Params.tableName}`
    }
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

//Get sales and run calculations for report
const generateSalesReport = async (request, response) => {
    let Querys = request.query

    //Getting all products
    let queryString = 'SELECT * FROM products'
    let results = await new Promise((resolve, reject) => {
        newPool.query(queryString, (error, results) => {
            if(error) {reject (error)}
            resolve(results)
        })
    }) 

    //Getting amount of each product
    let reportData = []
    await Promise.all(results.rows.map(async (item) => {
        queryString = 'SELECT SUM(itemamount) FROM orderitems INNER JOIN ordertickets ON ordertickets.id = orderitems.orderid WHERE '
        queryString += `itemname = '${item.name}' AND timestamp BETWEEN '${Querys.start}' AND '${Querys.end}'`
        
        //Get Sum
        let temp_data = await new Promise((resolve, reject) => {
            newPool.query(queryString, (error, results) => {
                if(error) {reject (error)}
                resolve(results.rows[0]['sum'])
            })
        }) 

        //Format and store data
        let productData = {
            'id' : item.id,
            'name' : item.name,
            'totalSales' : Math.round(((temp_data * item.price) + Number.EPSILON) * 100) / 100
        }
        reportData.push(productData)
    }))

    reportData.sort((a,b)=> {
        if(a['id'] < b['id']) {return -1}
        else if (a['id'] === b['id']) {return 0}
        else {return 1}
    })
    
    response.status(200).json(reportData)
}

module.exports = {
    getTable,
    generateSalesReport
}