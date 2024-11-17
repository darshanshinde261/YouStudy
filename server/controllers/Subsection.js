const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadToCloudinary} = require("../utils/imageUploader");
exports.createSubSection = async(req,res) =>{
    try{
        //fetch data from body
        const {title,timeDuration,description,sectionId} = req.body;
        //extract file
        const video = req.files.video;
        //validate
        if(!sectionId || !timeDuration || !title || !description){
            return res.status(401).json({
                success:false,
                message:"all fields are requrie",
            });
        }
        const sectionExists = await Section.findById(sectionId);
        console.log("Section Exists:", sectionExists);
        //upload to cloudinary
        const uploadDetails = await uploadToCloudinary(video,process.env.FOLDER_NAME);
        //create subsection
        const SubSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        });
      
        //updatte section
        const updatedSection = await Section.findByIdAndUpdate(
          sectionId
        ,{
           $push:{
            subSection:SubSectionDetails._id,
           } 
        },{new:true}).populate(
          "subSection"
        );
      
      if (!updatedSection) {
          console.error(`Section with ID ${sectionId} not found for update.`);
          return res.status(404).json({
              success: false,
              message: "Section not found or failed to update",
          });
      }
        
        const fetchedSection = await Section.findById(sectionId).populate("subSection");
        console.log("Fetched Section:", fetchedSection);
        //return res
        return res.status(200).json({
            success:true,
            message:"created successfully",
            data:updatedSection,
        })
    }catch(error){
        return res.status(401).json({
            success:false,
            data:error.message,
            message:"failed to create subsection"
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  

      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
      
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }
  