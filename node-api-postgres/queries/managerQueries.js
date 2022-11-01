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

module.exports = {
    getTable,
}