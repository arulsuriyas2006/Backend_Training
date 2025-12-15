const express =require('express')
const app = express()
const port = 3000
const UserRoute = require('./routes/UserRoute')
const BookRoute =require('./routes/BookRoute')
app.use(express.json())
app.use('/users',UserRoute);
app.use('/books',BookRoute);
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})