// SERVER.JS
const express = require('express')
var cors = require('cors')
const dbconnect = require('./dbConnect')
const env = require('dotenv')

const app = express()
app.use(express.json());
app.use(cors()); 

const itemsRoute =require('./routes/itemsRoute')
app.use('/api/items/',itemsRoute )

const billsRoute =require('./routes/billsRoute')
app.use('/api/bills/',billsRoute )



const userRoute = require('./routes/userRoute')
app.use('/api/user/',userRoute )

const path = require('path')

const port = process.env.PORT || 5000
app.get('/',(req,res) => res.send('hello world'))

app.listen(port,() => console.log(`node js server running on port ${port}`))
