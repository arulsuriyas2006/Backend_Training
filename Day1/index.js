const express = require('express');
const StudentRoute = require('./routes/StudentRoute');
const CourseRoute =require('./routes/CourseRoute');
const app =express();
const port =5000
app.use(express.json())
// console.log("Naan Raja naan Raja engayum naan raja.....");
app.use('/stu',StudentRoute);
app.use('/cou',CourseRoute);
app.listen(port,()=>[
    console.log(`server running on port ${port}...`)
])
