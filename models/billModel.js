//Bill SCHEMA DEFINITION
const mongoose = require('mongoose')

const billsSchema = mongoose.Schema({
    customerName:{type : String , required:true},
    customerPhoneNumber:{type : String , required:true},
    customerEmail:{type : String , required:true} ,
    totalAmount:{type : Number , required:true},
    tax:{type : Number , required:true},
    subtotal:{type : Number , required:true},
    paymentMode:{type : String , required:true},
    cartItems : {type: Array , required:true}
},{timestamps : true})

const billsModel = mongoose.model('bills',billsSchema)

module.exports = billsModel