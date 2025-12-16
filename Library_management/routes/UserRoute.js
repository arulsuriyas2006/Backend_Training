const express = require('express')
const router = express.Router();
const mongoose  = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    dept:{type:String,required:true}
}) 
const User = mongoose.model("user",UserSchema);



router.get('/getusers',async(req,res)=>{
    try{
    const users = await User.find();
    console.log(users);
    res.status(200).json({message:"users fetch successsfully",users:users})
    }catch(err){
        res.status(500).json({message:"user fetch failed",errpr:err})
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
    res.status(200).json({message:"user updated successfully",user:updated})
    }catch(err){
  res.status(500).json({message:"error in user updated"});
    }
})

module.exports =router;