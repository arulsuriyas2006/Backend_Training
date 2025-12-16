const mongoose =require('mongoose')
const express =require('express')
const app =express();
const port = 3000

async function connectionDB(){
await mongoose.connect('mongodb://localhost:27017/btraining')
.then(()=>{
    console.log("connected successfully")

}).catch((err)=>{
    console.log(err);
})
}

module.exports = connectionDB;