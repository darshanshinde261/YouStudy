const Category = require("../models/Category");
const Course = require("../models/Course");
const mongoose = require("mongoose")
const User = require("../models/User");
const {uploadImageToCloudinary, uploadToCloudinary} = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration")

//create Course handler functione
exports.createCourse = async(req,res) =>{
    try{
        //fetch data
        const {courseName,courseDescription,whatYouWillLearn
            ,instructions,status,price,tag,category} = req.body;

        //get thumbnail
        const thumbnail = req.files.thumbnailImage;
        const data = {courseDescription ,courseName ,thumbnail ,price ,tag ,whatYouWillLearn}
        //validation
        
        if(!courseDescription || !courseName || !thumbnail || !price || !tag || !whatYouWillLearn){
            return res.status(401).json({
                success:false,
                message:"all fields are required",
            });
        }
        
        //check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        //validate
        if(!instructorDetails){
            return res.status(401).json({
                success:false,
                message:"instructor details not found",
            });
        }
        
        //check for tag id
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(401).json({
                success:false,
                message:"instructor details not found",
            });
        }
        
        //upload to cloudinary
        const thumbnailmage = await uploadToCloudinary(thumbnail,process.env.FOLDER_NAME);
        
        //create an entry on new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag,
            instructions,
            status,
            category:categoryDetails._id,
            thumbnail:thumbnailmage.secure_url,
        })
    
        //update user
        console.log(newCourse._id)
        console.log(typeof newCourse._id)
        
        await Category.findByIdAndUpdate(categoryDetails._id,
            {
                $push:{
                courses: newCourse._id,
                }
            },{new:true},
        )
        
        await User.findByIdAndUpdate(instructorDetails._id,
            {
                $push:{
                courses: newCourse._id,
                },
            },{new:true},
        )
        
        //update tag schema

        
        //return res
        return res.status(200).json({
            success:true,
            message:"course created",
            data:newCourse,
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            error:error.message,
        })
    }
}



// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
      const { courseId } = req.body
      const updates = req.body
      const course = await Course.findById(courseId)
  
      if (!course) {
        return res.status(404).json({ error: "Course not found" })
      }
  
      // If Thumbnail Image is found, update it
      if (req.files) {
        console.log("thumbnail update")
        const thumbnail = req.files.thumbnailImage
        const thumbnailImage = await uploadImageToCloudinary(
          thumbnail,
          process.env.FOLDER_NAME
        )
        course.thumbnail = thumbnailImage.secure_url
      }
  
      // Update only the fields that are present in the request body
      for (const key in updates) {
        if (updates.hasOwnProperty(key)) {
          if (key === "tag" || key === "instructions") {
            course[key] = JSON.parse(updates[key])
          } else {
            course[key] = updates[key]
          }
        }
      }
  
      await course.save()
  
      const updatedCourse = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

exports.showAllCourses = async(req,res) =>{
    try{
        const allCourses = await Course.find({},
            {courseName:true,price:true}
        ).populate().exec();
        return res.status(200).json({
            success:true,
            message:"data fetch successfully",
            allCourses,
        })
    }catch{
        return res.status(401).json({
            success:false,
            error:error.message,
        });
    }
}

//creat course details
exports.getCourseDetails = async(req,res) =>{
    try{
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
                        {_id:courseId})
                        .populate(
                            {
                                path:"instructor",
                                strictPopulate: false,
                                populate:{
                                    path:"additionalDetails",
                                }
                            },
                        )
                        //.populate("category")
                        
                        //.populate("ratingAndReviews")
                        .populate({
                            path:"courseContent",
                            strictPopulate: false,
                            populate:{
                                path:"subSection",
                            },
                        })
                        .exec();
        //validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Invalid not fouond the course with course id"
            });
        }
        //return response
        return res.status(200).json({
            success:true,
            message:"course detalis fetch successfully",
            data:courseDetails,
        });
    }catch(error){
        return res.status(240).json({
            success:false,
            message:"course detalis not fetch successfully",
            messages:error.message
        })
    }
}
//get full course details
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnroled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body
  const userId = req.user.id

  try {
    // Check if the subsection is valid
    const subsection = await SubSection.findById(subsectionId)
    if (!subsection) {
      return res.status(404).json({ error: "Invalid subsection" })
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      return res.status(404).json({
        success: false,
        message: "Course progress Does Not Exist",
      })
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({ error: "Subsection already completed" })
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId)
    }

    // Save the updated course progress
    await courseProgress.save()

    return res.status(200).json({ message: "Course progress updated" })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
