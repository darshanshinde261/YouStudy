const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async (req,res,next) => {
    try{
        
        //fectch token from req
        const token = req.cookies.token || 
                    req.body.token ||
                    req.header("Authorization").replace("Bearer ","")
        //verification
        
        if(!token){
            return res.status(400).json({
                success:false,
                message:"token missing",
            });
        }
        
        console.log(token);
        //verify eith secreate
        try{
            
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            //include in req user fields for further calls
            req.user = decode;
        }
        catch(error){
            return res.status(400).json({
                success:false,
                token:token,
                messages:error.message,
                message:"token is invalid",
            })
        }
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"something id wrong while validating token",
        })
    }
};

//isStudent
exports.isStudent = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(402).json({
                success:false,
                message:"this is protectes route for student",
            });
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"User role cannot be fetch",
        })
    }
};

//isInstructor
exports.isInstructor = async(req,res,next) =>{
    try{
        console.log("check 2");
        if(req.user.accountType !== "Instructor"){
            return res.status(402).json({
                success:false,
                message:"this is protectes route for instructor",
            });
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"User role cannot be fetch",
        })
    }
};

//isAdmin
exports.isAdmin = async(req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(402).json({
                success:false,
                message:"this is protectes route for admin",
            });
        }
        next();
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"User role cannot be fetch",
        })
    }
};

