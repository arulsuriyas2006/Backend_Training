const express =require('express')
const mongoose = require('mongoose')
const db = require('./connection/db')
const app = express()
const port = 3000
const UserRoute = require('./routes/UserRoute')
const BookRoute =require('./routes/BookRoute')
app.use(express.json())
db().then(()=>{
    app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
}).catch((err)=>{
 console.log(err)
})
app.use('/users',UserRoute);
app.use('/books',BookRoute);
