//DATABASE CONNECTION
const mongoose = require('mongoose')

const URL = 'mongodb+srv://singhjadon2002:Vaishnavi29122020@cluster0.ywyqk9e.mongodb.net/pos_miniproject'

mongoose.connect(URL)

let connectionObj = mongoose.connection

connectionObj.on('connected' , () =>{
    console.log("mongo DB connection Success ful")
})

connectionObj.on('error' , () =>{
    console.log("mongo DB connection Failed")
})