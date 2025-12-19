const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const validator = require('validator')
const User =require('../model/userModel')
const jwt =require("jsonwebtoken")
const auth =require('../middleware/auth.js')




router.post('/signup',async(req,res)=>{
    try{
     const {name,email,dept,password,role}=req.body;
     console.log(name,email,dept,password,role);
     if(!validator.isEmail(email)){
        return res.status(406).json({message:"Invalid Email,Email must be @ symbol",Email:email})
     }
     if(!validator.isStrongPassword(password)){
        return res.json({message:"Password is not strong"})
     }
    const hashPassword = await bcrypt.hash(password,10);
    console.log(hashPassword);
    const signup = new User({
        name,
        email,
        dept,
        password:hashPassword,
        role
    })
    console.log(signup);
     await signup.save();
    res.status(201).json({message:"signup successfully",user:signup})
    }catch(err){
     res.status(500).json({message:"error in signup",error:err})
    }
})

router.post('/login',async(req,res)=>{
    try{
     const {email,password,role}=req.body;
     if(role!="student"){
        return res.status(406).json({message:"access denied"})
     }
     const user =await User.findOne({email:email})

     console.log(user);
     if(!user){
        return res.status(404).json({message:"email not found",user:user})
     }
    const compare =await bcrypt.compare(password,user.password)
     if(compare){
        const token =jwt.sign({userId:user._id,role:user.role},"BACKEND1812");
        console.log(token);
        res.cookie('token',token);
     res.status(200).json({message:"login successfully",user:user})
     }else{
        res.status(500).json({message:"Invalid credential",user})
     }
    }catch(err){
    res.status(500).json({message:"login failed",error:err})
    }
})

router.get('/getusers', async(req,res)=>{
    try{
      // const authRole =req.role;
      // console.log(authRole);
      // if(authRole!="admin"){
      //   return res.json({message:"only access admin only"})
      // }
    const users = await User.find();
    if(!users){
        return res.status(404).json({message:"user not found",users:users})
    }
    res.status(200).json({message:"users fetch successsfully",data:users})
    }catch(err){
        res.status(500).json({message:"user fetch failed",error:err})
    }
})

router.get('/getuser/:id',auth,async(req,res)=>{
    try{
    const authId = req.user;
    console.log(authId);
    const {id} =req.params;
    if(authId!=id){
        return res.json({message:"access denied only view logged user details"})
    }
    const userId = await User.findById(id);
        if(!userId){
        return res.status(404).json({message:"user not found",users:userId})
    }
    res.status(200).json({message:"fetch userbyid successfully",userbyid:userId});
    }catch(err){
        res.status(500).json({message:"error in fetch user id",error:err});
    }
})

router.post("/adduser",auth,async (req,res)=>{
    try{
      const authRole =req.role;
      console.log(authRole);
      if(authRole!="admin"){
        return res.json({message:"only access admin only"})
      }
    const {name,email,dept,password,role} =req.body;
    const newUser = new User({
        name,
        email,
        dept,
        password,
        role
    })
     await newUser.save();
    res.status(200).json({message:"user added successfully",users:newUser})
}catch(err){
    res.status(500).json({message:"error in add student",error:err.message})
}
})

router.delete('/delete/:id',auth,async (req,res)=>{
    try{
      const authRole =req.role;
      console.log(authRole);
      if(authRole!="admin"){
        return res.json({message:"only access admin only"})
      }
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
router.put('/update/:id',auth,async (req,res)=>{
    try{
      const authRole =req.role;
      console.log(authRole);
      if(authRole!="admin"){
        return res.json({message:"only access admin only"})
      }
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
router.get('/studentcourse/:id',async(req,res)=>{
    try{
    const {id} =req.params;
    console.log(id);
    const data = await User.findById(id).populate("assignedBook")
    console.log(data);
        if(!data){
        return res.status(404).json({message:"user not found",users:data})
    }
    res.status(200).json({message:"fetch userbyid successfully",userbyid:data.assignedBook});
    }catch(err){
        res.status(500).json({message:"error in fetch user id",error:err});
    }
})
module.exports =router;