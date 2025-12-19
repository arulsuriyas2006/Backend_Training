const mongoose =require('mongoose')
const express =require('express')

async function connectionDB(){
// await mongoose.connect('mongodb://localhost:27017/btraining')
await mongoose.connect('mongodb+srv://arulsuriyas2006:Pass20072006@cluster0.rm326vr.mongodb.net/backend')
.then(()=>{
    console.log("connected successfully")

}).catch((err)=>{
    console.log(err);
})
}

module.exports = connectionDB;