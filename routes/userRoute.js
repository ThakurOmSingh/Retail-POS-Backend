//USER Route
const express = require("express");
const ItemModel = require('../models/itemsModel')
const router = express.Router();
const UserModel = require('../models/usermodel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const JWT_SECRET_KEY = "omSingh"


router.post("/login",async(req,res) => {
    // try{
        
    //    const user =await UserModel.findOne({userId : req.body.userId , password : req.body.password , verified : true })
    //    if(user){
    //        res.send(user)
    //    }else{
    //     // res.status(400).json(message); 
    //     res.status(400).json({message : "User not verified"});
    //     console.log("User not verified");
    //    } 
    // }catch (error){
    //     res.status(400).json(error); 
    //     console.log("error in routes") 
    //     console.log(error)

    // }
    const {userId , password} = req.body;
        
        const findData = await UserModel.findOne({
                              userId ,verified:true
        });

        if(findData){
             
           let comparePass =  bcrypt.compareSync(password , findData.password);

           if(!comparePass){
                 return res.status(200).json({
                    status:1,
                    msg:"Password is incorrect"
                 })
           }else{
            res.send(findData);

           }
}else{
           
    return res.status(200).json({
        status:0,
        msg:"email id is wrong or user not verified."
    })
}
})


router.post("/register",async(req,res) => {
    try {
        const {name,userId,password}=req.body;
        const userpassowrd = bcrypt.hashSync(password,10);
        const newuser = new UserModel({
            name: name, 
            userId : userId,
            password : userpassowrd,
            verified:true})
        await newuser.save();
        res.send('User Registered successfully');
    } catch (error) {
        res.status(400).json(error);
        console.log("error in routes");
        console.log(error);
    }
})




module.exports = router
