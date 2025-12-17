const express = require('express')
const router = express.Router();
const mongoose  = require('mongoose')
const User =require('../model/userModel')




router.get('/getusers',async(req,res)=>{
    try{
    const users = await User.find();
    if(!users){
        return res.status(404).json({message:"user not found",users:users})
    }
    res.status(200).json({message:"users fetch successsfully",users:users})
    }catch(err){
        res.status(500).json({message:"user fetch failed",errpr:err})
    }
})

router.get('/getuser/:id',async(req,res)=>{
    try{
    const {id} =req.params;
    const userId = await User.findById(id);
        if(!userId){
        return res.status(404).json({message:"user not found",users:userId})
    }
    res.status(200).json({message:"fetch userbyid successfully",userbyid:userId});
    }catch(err){
        res.status(500).json({message:"error in fetch user id",error:err});
    }
})

router.post("/adduser",async (req,res)=>{
    try{
    const {name,email,dept} =req.body;
    const newUser = new User({
        name,
        email,
        dept
    })
     await newUser.save();
    res.status(200).json({message:"user added successfully",users:newUser})
}catch(err){
    res.status(500).json({message:"error in add student",error:err.message})
}
})

router.delete('/delete/:id',async (req,res)=>{
    try{
    const {id} =req.params;
    const deleted = await User.findByIdAndDelete(id);
    if(!deleted){
        return res.status(404).json({message:"user not found",users:deleted})
    }
    res.status(200).json({message:"user deleted successfully",user:deleted})
    }catch(err){
  res.status(500).json({message:"error in user deleted"});
    }
})
router.put('/update/:id',async (req,res)=>{
    try{
    const {id} =req.params;
    const updated = await User.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        dept:req.body.dept
    });
        if(!updated){
        return res.status(404).json({message:"user not found",users:updated})
    }
    res.status(200).json({message:"user updated successfully",user:updated})
    }catch(err){
  res.status(500).json({message:"error in user updated"});
    }
})

module.exports =router;