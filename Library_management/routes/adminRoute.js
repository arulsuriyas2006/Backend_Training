const express = require('express')
const router = express.Router();
const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const User =require('../model/userModel')


router.post('/login',async(req,res)=>{
    try{
     const {email,password,role}=req.body;
     if(role=="student"){
        return res.status(406).json({message:"access denied"})
     }
     const user =await User.findOne({email:email})

     console.log(user);
     if(!user){
        return res.status(404).json({message:"email not found",user:user})
     }
    const compare =await bcrypt.compare(password,user.password)
     if(compare){
     res.status(200).json({message:"login successfully",user:user})
     }else{
        res.status(500).json({message:"Invalid credential",user})
     }
    }catch(err){
    res.status(500).json({message:"login failed",error:err})
    }
})

module.exports = router
