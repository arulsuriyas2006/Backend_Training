const express =require('express')
const router = express.Router();
const course = [
    {
        id:1,
        name:"CSE"
    },
    {
        id:2,
        name:"IT"
    },
    {
        id:1,
        name:"AIDS"
    }
]

router.get('/course',(req,res)=>{
    res.status(200).json({message:"course details",Courses:course})
})

router.post('/addcourse',(req,res)=>{
    const {id,name}=req.body;
    const newcourse = {id,name};
    course.push(newcourse);
    res.status(200).json({message:"course details",Courses:course})
})


router.put('/update/:idx',(req,res)=>{
    const {idx} =req.params;
    const {id,name}=req.body;
    const ind = course.findIndex((c)=>{
        return c.id == idx;
    })
    course[ind]={id,name};
    res.status(200).json({message:"updated",course:course});
})
router.delete('/delete/:id',(req,res)=>{
    const {id} =req.params;
    const c = course.filter((cou)=>{
      return cou.id!=id;
    })
    res.status(200).json({message:"successfully deleted",course:c})
})
module.exports =router;