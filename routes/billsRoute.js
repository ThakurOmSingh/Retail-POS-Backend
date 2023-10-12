//BILLS ROUTE 
const express = require("express");
const BillModel = require('../models/billModel')
const CustomersModel = require('../models/customermodel')
const router = express.Router();
const pdf = require('html-pdf')
const path = require('path')
const nodemailer = require('nodemailer')
const fs = require('fs')
const pdfTemplate = require("../documents/documents")
const env = require('dotenv')
const mongoose = require('mongoose')
env.config()




const invoiceSchema = new mongoose.Schema({
    customerName: String,
    customerPhoneNumber: String,
    customerEmail: String,
    invoiceData: Buffer, 
});

const InvoiceModel = mongoose.model('Invoice', invoiceSchema);

router.post('/charge-bill', async (req, res) => {
    try {
        const { customerName, customerPhoneNumber, customerEmail } = req.body;

        
        const pdfBuffer = await new Promise((resolve, reject) => {
            pdf.create(pdfTemplate(req.body)).toBuffer((err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer);
                }
            });
        });

        
        const newInvoice = new InvoiceModel({
            customerName,
            customerPhoneNumber,
            customerEmail,
            invoiceData: pdfBuffer,
        });

        await newInvoice.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER, 
                pass: process.env.PASSWORD, 
            },
        });

        
        const mailOptions = {
            from: "luvkush.sitaram12345@gmail.com", 
            to: customerEmail, 
            subject: 'Invoice', 
            text: 'Please find attached invoice.', 
            attachments: [
                {
                    filename: 'invoice.pdf', 
                    content: pdfBuffer, 
                },
            ],
        };

        
        await transporter.sendMail(mailOptions);


        res.status(200).send('Billing done successfully, PDF generated and email sent');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });

    }
});







router.get("/get-bills",async(req,res) => {
    try{
        const bills = await BillModel.find()
        res.send(bills)
    }catch (error){
        res.status(400).json(error); 
        console.log("error in routes") 
        
    }
})
router.get("/get-customers",async(req,res) => {
    try{
        const customers = await CustomersModel.find()
        res.send(customers)
    }catch (error){
        res.status(400).json(error); 
        console.log("error in routes") 
        
    }
})
module.exports = router
