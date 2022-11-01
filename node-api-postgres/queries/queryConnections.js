const { request, response } = require('express')
const Pool = require('pg').Pool
require('dotenv').config()

//Create pool
const newPool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: parseInt(process.env.PSQL_PORT),
  ssl: {rejectUnauthorized: false}
})

//Hook to close pool on exit 
process.on('SIGINT', () => {
    newPool.end()
    console.log('Application successfully shutdown')
    process.exit(0)
})

module.exports = {newPool}