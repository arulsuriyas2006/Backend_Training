import React from 'react'
import {useState} from 'react';
const Home = () => {
      const [student,setStudent]=useState([]);
    async function fetchdata(){
        try{
         const response = await fetch('http://localhost:3000/users/getusers');
         const data = await response.json();
         console.log(data.data);
         setStudent(data.data);
        }catch(err){
          console.log(err);
        }
    }
     fetchdata();
  return (
    <div>
      <h1>Home</h1>
      {student.map((st)=>{
       return(
        <div>
          <h1>{st.name}</h1>
          <h3>{st.email}</h3>
          <h3>{st.dept}</h3>
          <h3>{st.password}</h3>
          <h3>{st.role}</h3>
        </div>
       )
      })}
      </div>
  )
}

export default Home