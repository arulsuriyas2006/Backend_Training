const express = require('express');
const router = express.Router();
const student =[
    {
        id:1,
        name:"arul",
        email:"arul@gmail.com",
        dept:"CSE"
    },
    {
        id:2,
        name:"suriya",
        email:"suriya@gmail.com",
        dept:"IT"
    },
        {
        id:3,
        name:"aswin",
        email:"aswin@gmail.com",
        dept:"EEE"
    }
]
router.get('/',(req,res)=>{
  res.status(200).json({message:"get successfully"});
})
router.get('/student',(req,res)=>{
  res.status(200).json({message:"get successfully",student:student});
})

router.post('/addstudent',(req,res)=>{
 const {id,name,email,dept} =req.body;
 const st ={id,name,email,dept};
student.push(st);
  res.status(200).json({message:"get successfully",student:st});
})


router.put('/update/:id',(req,res)=>{
   const {id} =req.params;
   console.log(id);
   const {name,email,dept} = req.body;
   const index = student.findIndex((item)=>{
    return item.id==id;
   })
   console.log(index);
   student[index]= {name,email,dept};
    res.status(200).json({message:"get successfully",student:student});
})
router.delete('/delete/:id',(req,res)=>{
   const{id}=req.params;
   const st = student.filter((s)=>{
     return s.id!=id;
   })
   res.send(st)
})

module.exports =router;