const express = require('express')
const router = express.Router();
const mongoose  = require('mongoose')
const bcrypt = require('bcrypt')
const User =require('../model/userModel')



router.post('/signup',async(req,res)=>{
    try{
     const {name,email,dept,password}=req.body;
     const hashPassword = await bcrypt.hash(password,10);
    const signup = new User({
        name,
        email,
        dept,
        password:hashPassword
    })
     await signup.save();
    res.status(201).json({message:"signup successfully",user:signup})
    }catch(err){
     res.status(500).json({message:"error in signup"})
    }
})

router.post('/login',async(req,res)=>{
    try{
     const {email,password}=req.body;
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
    const {name,email,dept,password} =req.body;
    const newUser = new User({
        name,
        email,
        dept,
        password
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
        dept:req.body.dept,
        password:req.body.password
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