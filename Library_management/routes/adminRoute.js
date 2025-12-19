const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User =require('../model/userModel')
const jwt =require("jsonwebtoken")
const auth =require('../middleware/auth.js')

router.post('/login',async(req,res)=>{
    try{
     const {email,password,role}=req.body;
     if(role!="admin"){
        return res.status(406).json({message:"access denied"})
     }
     const user =await User.findOne({email:email});
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

router.patch('/assign/:SID',async(req,res)=>{
   try{
   //   const authRole =req.role;
   //    console.log(authRole);
   //    if(authRole!="admin"){
   //      return res.json({message:"only access admin only"})
   //    }
      const {SID} = req.params;
      const {bookId}=req.body;
      const student = await User.findById(SID);
      if(!student){
         return res.status(404),json({message:"student not found"});
      }
      const update = await User.findByIdAndUpdate(SID,{assignedBook:bookId});
      res.status(200).json({message:"Successfully assigned course",update:update});
   }catch(err){
    res.status(500).json({message:"error in assign course",error:err});
   }
})

module.exports = router