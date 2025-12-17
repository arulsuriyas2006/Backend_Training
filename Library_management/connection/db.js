const mongoose =require('mongoose')
const express =require('express')
const app =express();
const port = 3000

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