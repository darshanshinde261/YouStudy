const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req,res) =>{
    try{
        //fetch data 
        const userId = req.user.id;
        const {rating,review,courseId} = req.body;

        //vslidation for user not enrolled
        const coursedetails = await Course.findOne({id:courseId,
                    studentEnrolled:{selemMatch:{$eq:userId}},}
        )
        if(!coursedetails){
            return res.status(402).json({
                success:false,
                message:"user not found",
            })
        }
        //already user revied
        const alreadyReviewed = await RatingAndReview.findOne({
                                user:userId,
                                course:courseId,
        });
        if(alreadyReviewed){
            return res.status(402).json({
                success:false,
                message:"user not found",
            });
        }
        //create ratind and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });

        //store in couorse
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                        courseId,
                        {
                            $push:{
                                ratingAndReviews:ratingReview._id,
                            }
                        },{new:true}
        )
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"rating and review successfully",
        });

    }catch(error){
        return res.status(401).json({
            success:false,
            message:"ratingand review unsuccessfull",
        });
    }
}


//getAveragerating
exports.getAverageRating = async(req,res) =>{
    try{
        //fetch data
        const courseId = req.body.courseId;
        //calculate avg rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
            }
        ])
        //return
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating review exists
        return res.status(200).json({
            success:true,
            message:"average rating is 0",
            averageRating:0,
        })

    }catch(error){
        return res.status(200).json({
            success:false,
            message:"average rating is 0",
        });
    }
}

//getAllrating
exports.getAllRating = async(req,res) =>{
    try{
        const allReviews = await RatingAndReview({})
                            .sort({rating:"desc"})
                            .populate({
                                path:"user",
                                select:"firstName lastName email image",
                                }
                            )
                            .populate({
                                path:"course",
                                select:"courseName",
                            })
                            .exec();
        return res.status(200).json({
            success:true,
            message:"all rating feetch",
            data:allReviews
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"failed to get data"
        });
    }
}