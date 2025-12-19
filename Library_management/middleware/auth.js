const User =require('../model/userModel')
const jwt =require("jsonwebtoken")
const auth =async(req,res,next)=>{
    try{
        const {token} = req.cookies;
        console.log(token);
        if(!token){
            return res.json({message:"access denied please login"});
        }
        const decoded = jwt.verify(token,"BACKEND1812");
        console.log(decoded);
        if(!decoded){
            return res.json({message:"no token found"})
        }
        const {userId,role} = decoded;
        const userdata = await User.findById(userId);
        console.log(userdata);
        if(!userdata){
            return res.json({message:"no user found"})
        }
        req.user = userId;
        req.role =role;
        next();
    }catch(err){
        res.json({error:err})
    }
}

module.exports = auth;