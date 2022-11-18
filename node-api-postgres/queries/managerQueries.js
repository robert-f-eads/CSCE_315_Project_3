const { request, response } = require('express')
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
            'totalSales' : parseFloat((temp_data * item.price).toFixed(2))
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

//Calculate what ingredients need to be restocked
const generateRestockReport = (request, response) => {
    let queryString = 'SELECT id, name, quantityremaining, quantitytarget, (quantitytarget - quantityremaining) AS \"Amount Under Target\" '
    queryString += 'FROM ingredients WHERE quantityremaining < quantitytarget AND quantityremaining > 0'
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows)
    })
}

//Add product for sale
const addProduct = (request, response) => {
    let Querys = request.query

    //Inserting new product
    let queryString = `INSERT INTO products (name, price) VALUES ('${Querys.name}', ${Querys.price})`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
    })

    //Returning new product id
    queryString = `SELECT id FROM products WHERE name = '${Querys.name}'`
    newPool.query(queryString, (error, results) => {
        if(error) {throw (error)}
        response.status(200).json(results.rows[0]['id'])
    })
}

//Adds ingredient relations to new product
const addProductIngredient = (request, response) => {
    let BODY = request.body
    /* Expecting this structure
    [
        {
            "productId": 1,
            "ingredientId" : 2
        }, 
        {
            "productId": 3,
            "ingredientId" : 4
        }
    ]
    */

    BODY.map((item) => {
        let queryString = `INSERT INTO productstoingredients (productid, ingredientid) VALUES (${item['productId']}, ${item['ingredientId']})`
        newPool.query(queryString, (error, results) => {
            if(error) {throw (error)}
        }) 
    })
    response.status(200).send("Success")

}

//Calcuate what ingredient sold less than 10%
const generateExcessReport = async (request, response) => {
    let Querys = request.query

    //Getting all ingredients
    let queryString = 'SELECT * FROM ingredients'
    let data = await new Promise((resolve, reject) => {
        newPool.query(queryString, (error, results) => {
            if(error) {reject (error)}
            resolve(results)
        })
    }) 

    let excessIngredients = []

    await Promise.all(data.rows.map(async (item) => {
        queryString = `SELECT productid FROM productstoingredients WHERE ingredientid = ${item.id}`
        
        //Getting all products with each ingredient
        let results = await new Promise((resolve, reject) => {
            newPool.query(queryString, (error, results) => {
                if(error) {reject (error)}
                resolve(results)
            })
        }) 
        
        let totalAmountUsed = 0

        if(!(results.rows.length === 0)) {
            //Creating list of products with this ingredient
            let products = '('
            results.rows.map((entry) => {products += entry.productid + ','})
            products = products.substring(0, products.length-1)
            products += ')'

            //Counting regular use
            queryString = 'SELECT sum(itemamount) FROM orderitems INNER JOIN products ON products.name = orderitems.itemname INNER JOIN ordertickets ON ordertickets.id = orderitems.orderid '
            queryString += `WHERE products.id IN ${products} AND timestamp BETWEEN '${Querys.start}' AND '${Querys.end}'`
            totalAmountUsed += await new Promise((resolve, reject) => {
                newPool.query(queryString, (error, results) => {
                    if(error) {reject (error)}
                    resolve(results.rows[0]['sum'])
                })
            }) 
        
        }
        
        //Additions
        queryString = 'SELECT COUNT(*) FROM orderitemadditions INNER JOIN ordertickets ON orderitemadditions.orderid = ordertickets.id '
        queryString += `WHERE ingredientid = ${item.id} AND timestamp BETWEEN '${Querys.start}' AND '${Querys.end}'`
        totalAmountUsed += await new Promise((resolve, reject) => {
            newPool.query(queryString, (error, results) => {
                if(error) {reject (error)}
                resolve(results.rows[0]['count'])
            })
        }) 

        //Subtractions
        queryString = 'SELECT COUNT(*) FROM orderitemsubtractions INNER JOIN ordertickets ON orderitemsubtractions.orderid = ordertickets.id '
        queryString += `WHERE ingredientid = ${item.id} AND timestamp BETWEEN '${Querys.start}' AND '${Querys.end}'`
        totalAmountUsed -= await new Promise((resolve, reject) => {
            newPool.query(queryString, (error, results) => {
                if(error) {reject (error)}
                resolve(results.rows[0]['count'])
            })
        }) 
        
        //Calculating < 10%
        let perecentUsed = totalAmountUsed / (totalAmountUsed + parseInt(item.quantityremaining))
        if(perecentUsed < 0.1) {
            reportEntry = {
                "id" : item.id,
                "name" : item.name,
                "remaining" : parseInt(item.quantityremaining),
                "used" : totalAmountUsed,
                "inital" : totalAmountUsed + parseInt(item.quantityremaining),
                "percent" : parseFloat((perecentUsed * 100).toFixed(2)) 
            }
            excessIngredients.push(reportEntry)
        }
    }))

    response.status(200).json(excessIngredients)
}

module.exports = {
    getTable,
    generateSalesReport,
    generateRestockReport,
    addProduct,
    addProductIngredient,
    generateExcessReport,
}