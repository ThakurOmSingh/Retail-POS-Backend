//CUSTOMER SCHEMA DEFINITION
const mongoose = require('mongoose')

const customersSchema = mongoose.Schema({
    customerName:{type : String , required:true},
    customerPhoneNumber:{type : String , required:true},
    customerEmail:{type : String , required:true} ,
},{timestamps : true})

const customersModel = mongoose.model('customers',customersSchema)

module.exports = customersModel