const express =require('express')
const router = express.Router();

const Book =[
    {
        id:1,
        name:"a book",
        author:"a author",
        isAvailable:true
    },
    {
        id:2,
        name:"b book",
        author:"b author",
        isAvailable:false
    },
    {
        id:1,
        name:"c book",
        author:"c author",
        isAvailable:true
    }
]

router.get('/getbooks',(req,res)=>{
    res.status(200).json({message:"get book successfully",book:Book})
})

router.post('/addbook',(req,res)=>{
    const {id,name,author,isAvailable} =req.body;
    const newbook = {id,name,author,isAvailable};
    Book.push(newbook);
    res.status(200).json({message:"book added successfully",book:Book})
})

module.exports = router;