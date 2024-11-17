const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        require:true,
    },
    timeDuration:{
        type:String,
    },
    description:{
        type:String,
        trim:true,
        require:true,
    },
    videoUrl:{
        type:String,
        require:true
    },
});
module.exports = mongoose.model("SubSection",subSectionSchema);