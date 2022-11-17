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
//Default
app.get('/', (request, response) => {response.json({ info: 'Node.js, Express, and Postgres API' })})

//Gets
app.get('/searchProducts/:name', db.searchProducts)
app.get('/searchIngredients/:name', db.searchIngredients)
app.get('/table/:tableName', db.getTable)
app.get('/login/verifyEmployee', db.loginEmployee)
app.get('/login/verifyCustomer', db.loginRewardsMember)
app.get('/generateReport/sales', db.generateSalesReport)

//Posts
app.post('/createOrder/ticket', db.insertNewTicket)
app.post('/createOrder/item', db.insertNewOrderItem)
app.post('/createOrder/addition', db.insertNewItemAddition)
app.post('/createOrder/subtraction', db.insertNewOrderSubtraction)

//Puts
app.put('/updateIngredient/:id', db.updateIngredient)

//TODO:
/* Manager View */
//Generate restock report - how much under target we are
//New item - ability to add a new product to the database
//New item - ability to add the ingredients to the bridge table for a new product

//Generate excess report - THIS IS GOING TO BE HARD


app.listen(port, () => {console.log(`Web server listening at http://localhost:${port}`)})


