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
app.get('/generateReport/restock', db.generateRestockReport)
app.get('/generateReport/excess', db.generateExcessReport)
app.get('/productIngredients/:id', db.getIngredinetsForProduct)

//Posts
app.post('/createOrder/ticket', db.insertNewTicket)
app.post('/createOrder/item', db.insertNewOrderItem)
app.post('/createOrder/addition', db.insertNewItemAddition)
app.post('/createOrder/subtraction', db.insertNewOrderSubtraction)
app.post('/createProduct/item', db.addProduct)
app.post('/createProduct/ingredient', db.addProductIngredient)
app.post('/createRewardsMember', db.createRewardsMember)

//Patch
app.patch('/updateIngredient', db.updateIngredient)


app.listen(port, () => {console.log(`Web server listening at http://localhost:${port}`)})