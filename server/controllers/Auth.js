const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenrator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken");
require("dotenv").config();

//sendotp for sign in
exports.sendOTP = async(req,res) => {
    try{
        
        //fetch  email from req body
        const {email} = req.body
        
        //check if user already present
        const checkUserPresent = await User.findOne({email});
        
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"user already present",
            });
        }
        
        //generate otp
        const otp = otpGenrator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP Generated",otp);
        //check otp is unique or not

        let result = await OTP.findOne({otp:otp});
        while(result){
            otp = otpGenrator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp:otp});
        }

        const payLoad ={email,otp};

        const otpBody = await OTP.create(payLoad);
        
        return res.status(200).json({
            success:true,
            message:"otp send successfully",
            otp,
        });
    }catch(error){
        return res.status(200).json({
            success:false,
            data:error.message,
            message:"otp send problem",
        });
    }
};

//signup
exports.signUp = async(req,res)  => {
    try{
        //data fetch from reques body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validation
        if(!firstName || !lastName || !email || !password || !confirmPassword
            || !otp
        ){
            return res.status(403).json({
                success:false,
                message:"All Fields are required",
            });

        }
        
        //check password
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirmPassword should be same",
            });
        }

        //check for user already exits or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already present",
            });
        }

        //find most recent OTP stores in user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
       
        //validate otp
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"otp not found",
            })
        }else if(otp !== recentOtp[0].otp){
            return res.status(400).json({
                success:false,
                message:"invalid otp",
            });
        }
        
        //hash password
        const hashPassword = await bcrypt.hash(password,10);
        
        
        //entery created in dp
        const profileDetails = await Profile.create({
            grnder:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        });
        
        
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            
            password:hashPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        });
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        });


    }catch(error){
        return res.status(200).json({
            success:false,
            data:error.message,
            message:"User Cannot be registered",
        });
    }
};

//login function
exports.login = async(req,res) =>{
    try{
        //get data from req body
    const {email,password} = req.body;
    //validation
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are require please try again",
        });
    }
    //User check exits or not 
    
    const user = await User.findOne({email}).populate("additionalDetails");

    if(!user){
        return res.status(401).json({
            success:false,
            message:"user is not registered",
        });
    }
    //generate JWT token after pass compare
    
    if (await bcrypt.compare(password,user.password)){
        const payload = {
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"4d",
        });
        user.token = token;
        user.password = undefined;
        //create coookie
        const options = {
            expires:new Date(Date.now()+ 4*24*60*60*1000),
            httpOnly:true
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"logged in successfully",
        })
    }
    else{
        return res.status(401).json({
            success:false,
            message:"password is incorrect",
        });
    }
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"error while log in",
        });
    }
    


}; 

//changepassword
exports.changePassword = async(req,res) =>{
    try{
        //get data from req user
    const userDetails = await User.findById(req.user.id);

    //get oldpassword,newpassword,confirmnewpassword
    const {oldpassword,newPassword} = req.body;
    //validation
    const isPasswordMatch = await bcrypt.compare(oldpassword,userDetails.password);
    if(!isPasswordMatch){
        return res
        .status(401)
        .json({success:false, message:"the password is incorrect"})
    }
    //update pwd in DB
    const encryptedPassword = await bcrypt.hash(newPassword,10);
    const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        {password:encryptedPassword},
        {new:true}
    )
    //send mail - password updated
    try{
        const emailResponse = await mailSender(
            updatedUserDetails.email,
            "password for your account has been updated",
            passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
        )
    }catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
    }

    //return res
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
    }
    
    catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}