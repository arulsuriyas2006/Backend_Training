const express =require('express')
const mongoose = require('mongoose')
const db = require('./connection/db')
const app = express()
const port = 3000
const UserRoute = require('./routes/UserRoute')
const BookRoute =require('./routes/BookRoute')
const AdminRoute =require('./routes/adminRoute')
const cookieparser = require("cookie-parser");
const cors = require('cors');
app.use(cookieparser())
app.use(express.json())
app.use(cors())
db().then(()=>{
    app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})
}).catch((err)=>{
 console.log(err)
})
app.use('/users',UserRoute);
app.use('/books',BookRoute);
app.use('/admin',AdminRoute)