const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection");

exports.createSection = async(req,res) =>{
    try{
        //fetch data from body
        const {sectionName,courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"missing propertise",
            });
        }

        //ceate section
        const newSection = await Section.create({sectionName});
        //update course
        
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,{
                $push:{
                    courseContent:newSection._id,
                }},{new:true}
            ).populate({
                path: "courseContent",
                strictPopulate: false,
                populate: {
                  path: "subSection",
                },
              })
              .exec();
        const course = await Course.findById(courseId);

        console.log(course);
        //RETURN RES
        return res.status(200).json({
            success:true,
            message:"section created",
            updatedCourseDetails,
        });

    }catch(error){
        return res.status(401).json({
            success:false,
            messages:error.message,
            message:"failed to create section"
        });
    }
};

exports.updateSection = async(req,res) =>{
    try{
        //fetch data
        const {sectionName,sectionId} = req.body;
        // validate
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"missing propertise",
            });
        }
        //updatte
        const section = await Section.findByIdAndUpdate(sectionId,
            {sectionName},{new:true}
        )
        return res.status(200).json({
            success:true,
            message:"section updated successfully",
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            data:error.message,
            message:"failed to update section"
        });
    }   
}

//delete section
exports.deleteSection = async(req,res) => {
    try{
        //fetch dara
        //assume we are sending id in params
        const {sectionId,courseId} = req.body;
        //findbyidanddelete
        
        //delete section from courseSchema
        const courseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $pull:{
                    courseContent:sectionId
                }
            },{new:true}
        );
        const section = await Section.findById(sectionId);
		
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}
        await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);
        //retunr res
        return res.status(200).json({
            success:true,
            message:" section deleted successfully"
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            message:"failed to delete section"
        });
    }
}