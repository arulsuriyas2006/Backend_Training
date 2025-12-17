const express =require('express')
const router = express.Router();
const mongoose = require('mongoose')
const Book = require('../model/bookModel')




router.get('/getbooks',async(req,res)=>{
    try{
    const book = await Book.find();
    res.status(200).json({message:"get book successfully",books:book})
    }catch(err){
        res.status(500).json({message:"error in fetch data",error:err})
    }
})

router.post('/addbook',async(req,res)=>{
    try{
    const {name,price,author} =req.body;
    const newBook = new Book( {name,price,author});
    await newBook.save();
    res.status(200).json({message:"book added successfully",book:newBook})
    }catch(err){
        res.status(500).json({message:"book add failed",error:err})
    }
})

router.delete("/delete/:id",async(req,res)=>{
   try{
    const {id} = req.params;
    const deleted = await Book.findByIdAndDelete(id);
    res.status(200).json({message:"book deleted successfully",book:deleted})
   }catch(err){
    res.status(500).json({message:"error in book deleted",error:err})
   }
})

router.put("/update/:id",async(req,res)=>{
   try{
    const {id} = req.params;
    const deleted = await Book.findByIdAndUpdate(id,{
        name:req.body.name,
        price:req.body.price,
        author:req.body.author
    });
    res.status(200).json({message:"book updated successfully",book:deleted})
   }catch(err){
    res.status(500).json({message:"error in book updated",error:err})
   }
})

module.exports = router;