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
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/materials', db.getMaterials)
app.get('/materials/:id', db.getMaterialById)
app.get('/data/:table', db.getLimitedTable)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})


