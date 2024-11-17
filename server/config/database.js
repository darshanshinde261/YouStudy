const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () =>{
    console.log(process.env.MONGODB_URL);
    console.log("hello");
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfull"))
    .catch((error)=>{
        console.log("DB connection failed");
        console.error(error);
        process.exit(1);
    })
};