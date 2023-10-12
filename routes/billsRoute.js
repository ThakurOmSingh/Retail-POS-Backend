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
env.config()


router.post("/charge-bill",async(req,res) => {
    try{
        const {customerName , customerPhoneNumber , customerEmail} = req.body;
        const newcustomer = new CustomersModel({customerName: customerName , customerPhoneNumber: customerPhoneNumber , customerEmail: customerEmail});
        const existingCustomer = await CustomersModel.findOne({ customerPhoneNumber: customerPhoneNumber });
if (existingCustomer) {
    const newbill = new BillModel(req.body);
    await newbill.save()
    // res.send('Billing done successfully')
} else {
    const newcustomer = new CustomersModel({customerName: customerName , customerPhoneNumber: customerPhoneNumber , customerEmail: customerEmail});
    await newcustomer.save()
        const newbill = new BillModel(req.body);
        await newbill.save()
        // res.send('Billing done successfully')
    
    
    }       

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
        const fileName = `invoice_${timestamp}.pdf`;

        // Specify the folder path where you want to store the PDF files
        const folderPath = path.join(__dirname, 'invoice');

        // Create the folder if it doesn't exist
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const filePath = path.join(folderPath, fileName);



        pdf.create(pdfTemplate(req.body), {}).toFile(filePath, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error generating PDF');
            } else {
                const pathToAttachment = path.join(__dirname, 'invoice', fileName);
                const attachment = fs.readFileSync(pathToAttachment).toString("base64");

                const smtpTransport = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    service: 'Gmail',
                    port: 587,
                    secure: false,
                    auth: {
                        user:process.env.USER,
                        pass:process.env.PASSWORD
                    },
                    // tls: { rejectUnauthorized: false }
                });

                smtpTransport.sendMail({
                    from: "luvkush.sitaram12345@gmail.com",
                    to: customerEmail,
                    subject: 'ABC store Bill',
                    html: "<h1>Please find below the attached bill</h1>",
                    attachments: [{
                        content: attachment,
                        filename: "Invoice.pdf",
                        encoding: 'base64'
                    }]
                }, function (error, info) {
                    if (error) {
                        console.log(error);
                        res.status(500).send('Error sending email');
                    } else {
                        console.log("MAIL SENT")
                        res.status(200).send('Billing done successfully, PDF generated and email sent');
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json(error);
        console.log("error in routes");
        console.log(error);
    }
    })





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