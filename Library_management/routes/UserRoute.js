const express = require('express')
const router = express.Router();

const users =[
    {
        id:1,
        name:"arul",
        email:"arul@gmail.com"
    },
    {
        id:2,
        name:"suriya",
        email:"suriya@gmail.com"
    },
    {
        id:1,
        name:"soundar",
        email:"soundar@gmail.com"
    }
]

router.get('/getusers',(req,res)=>{
    res.status(200).json({message:"users fetch successsfully",users:users})
})

router.post("/adduser",(req,res)=>{
    const {id,name,email} =req.body;
    const newuser = {id,name,email}

    users.push(newuser);
    res.status(200).json({message:"user added successfully",users:users})
})

module.exports =router;