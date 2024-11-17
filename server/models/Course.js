const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        require:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        require:true,
    },
    whatYouWillLearn:{
        type:String,
        trim:true,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
    }],
    ratingAndReviews:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview",
    },
    price:{
        type:Number,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    tag: {
        type: [String],
        required: true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    }],
    instructions:{
        type:[String],
    },
    status:{
        type:String,
        enum:["Draft","Published"],
    },
});

module.exports = mongoose.model("Course",courseSchema);
