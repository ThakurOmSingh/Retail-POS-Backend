// SERVER.JS
const express = require('express')
var cors = require('cors')
const dbconnect = require('./dbConnect')
const env = require('dotenv')

const corsOptions = {
  origin: ['https://retail-pos-app.onrender.com', 'http://localhost:3000'],
  methods: 'GET, PUT, POST, DELETE',
};

const app = express()
app.use(express.json());
app.use(cors(corsOptions)); 

const itemsRoute =require('./routes/itemsRoute')
app.use('/api/items/',itemsRoute )

const billsRoute =require('./routes/billsRoute')
app.use('/api/bills/',billsRoute )



const userRoute = require('./routes/userRoute')
app.use('/api/user/',userRoute )

const path = require('path')
if(process.env.NODE_ENV==='production')
{
    app.use('/', express.static('client/build'))
    app.get('*', (req,res)=>{
        // res.sendFile(path.resolve(__dirname, 'client/build/index.html'))
    })
}
const port = process.env.PORT || 5000
app.get('/',(req,res) => res.send('hello world'))

app.listen(port,() => console.log(`node js server running on port ${port}`))
