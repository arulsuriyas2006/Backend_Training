const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true,},
    author:{type:String,required:true}
},{timestamps:true}) 

const Book = mongoose.model("book",BookSchema);
module.exports =Book;
