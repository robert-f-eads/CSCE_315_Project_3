const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

const db = require('./queries')

const cors=require("cors");
const { request, response } = require('express')
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.get('/', (request, response) => {response.json({ info: 'Node.js, Express, and Postgres API' })})

app.get('/searchProducts/:name', db.searchProducts)
app.get('/table/:tableName', db.getTable)
app.post('/createOrder/ticket', db.insertNewTicket)
app.post('/createOrder/item', db.insertNewOrderItem)

app.listen(port, () => {console.log(`App running on port ${port}.`)})


