const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
    },
    otp:{
        type:String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expiresIn:5*60,
    },
});

async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(email,"Verification Mail from StudyNaotion",otp);
        console.log("Mail send Successfull",mailResponse);

    }catch(err){
        console.log("error occured while sending mail",err);
        throw err;
    }
};

OTPSchema.pre("save", async function(next){
    sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",OTPSchema);