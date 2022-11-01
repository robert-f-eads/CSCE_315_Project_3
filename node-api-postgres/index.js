const express = require('express')
const bodyParser = require('body-parser')

//Create Express app
const app = express()
const port = 3001
const db = require('./queries/queryExports')

const { request, response } = require('express')
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) 
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

/*************** http requests ***************/
app.get('/', (request, response) => {response.json({ info: 'Node.js, Express, and Postgres API' })})
app.get('/searchProducts/:name', db.searchProducts)
app.get('/table/:tableName', db.getTable)
app.post('/createOrder/ticket', db.insertNewTicket)
app.post('/createOrder/item', db.insertNewOrderItem)

app.listen(port, () => {console.log(`Web server listening at http://localhost:${port}`)})


