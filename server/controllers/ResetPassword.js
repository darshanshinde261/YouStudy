const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async(req,res) =>{
    try{
        //get email from req body
        const email = req.body.email;
        //check user for this email , email validation
        const user = await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"your email is not registerd with us"
            });
        }
        //generate token
        const token = crypto.randomUUID();
        //add it on user
        const updatedDetails = await User.findOneAndUpdate({email:email},
                            {token:token,
                            resetPasswordExpires:Date.now() + 5*60*1000},
                            {new:true}
        );
        //create url
        const url = `https://localhost:3000/update-password/${token}`;
        //sendmail
        await mailSender(email,"password reset link",
            `password reset link : ${url}`
        );
        //return res
        return res.status(200).json({
            success:true,
            message:"email send successfully for reset password"
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"email send something wemt wrong",
        })
    }
};

//reset password
exports.resetPassword = async(req,res) =>{
    try{
        //dara fetch
        const {password, confirmPassword, token} = req.body;

        //validate
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password not matching',
            });
        }

        //get userDetails from db using token
        const userDetails = await User.findOne({token:token});

        //vallidate userdeatils
        if(!userDetails){
            return res.json({
                success:false,
                message:"Token is invalid",
            });
        }
        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:"Token is expires, please genrate user token",
            });
        }
        //hash pasword
        const hashedPassword = await bcrypt.hash(password,10);
        
        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        
        //return reponse

        return res.status(200).json({
            success:true,
            message:"Password reset completed ",
        });

    }catch(error){
        return res.status(400).json({
            success:false,
            message:"token error",
        });
    }
}