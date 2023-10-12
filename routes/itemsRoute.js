//Items Route
const express = require("express");
const ItemModel = require('../models/itemsModel')
const router = express.Router();

router.get("/get-all-items",async(req,res) => {
    try{
        const items = await ItemModel.find();
        res.send(items)
    }catch (error){
        res.status(400).json(error); 
        console.log("error in routes") 
        console.log(error)

    }
})

router.post("/add-item",async(req,res) => {
    try{
        const newitem = new ItemModel(req.body);
        await newitem.save()
        res.send('Item added successfully')
    }catch (error){
        res.status(400).json(error); 
        console.log("error in routes") 
        console.log(error)

    }
})

router.post("/delete-item",async(req,res) => {
    try {
        
        await ItemModel.findOneAndDelete({ _id: req.body.itemId });
        res.send('Item deleted successfully');
    } catch (error) {
        res.status(400).json(error);
        console.log("error in routes");
        console.log(error);
    }
})

router.post("/edit-item", async (req, res) => {
    try {
        const { itemId, ...updatedFields } = req.body; // Extract itemId and other fields
        await ItemModel.findOneAndUpdate({ _id: itemId }, updatedFields);
        res.send('Item edited successfully');
    } catch (error) {
        res.status(400).json(error);
        console.log("error in routes");
        console.log(error);
    }
});

module.exports = router