process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const { request, response } = require('express')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'csce315_901_eads',
  host: 'csce-315-db.engr.tamu.edu',
  database: 'csce315_901_2',
  password: 'password',
  port: 5432,
  ssl: true
})

const getMaterials = (request, response) => {
    pool.query('SELECT * FROM materials', (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getMaterialById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM materials WHERE id = $1', [id], (error, results) => {
        if(error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getLimitedTable = (request, response) => {
    let Params = request.params
    let Querys = request.query
    //console.log(request.params)
    //console.log(request.query)

    let queryString = `SELECT * FROM ${request.params.table} LIMIT ${parseInt(Querys.number)}`

    pool.query(queryString, (error, results) => {
        if(error) {
            throw (error)
        }
        response.status(200).json(results.rows)

    })
}

module.exports = {
    getMaterials,
    getMaterialById,
    getLimitedTable
}