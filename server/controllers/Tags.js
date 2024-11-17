const Tag = require("../models/Tag");

exports.createTag = async(req,res) => {
    try{
        //fetch data
        const {name,description} = req.body;
        //validate
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }
        //create in DB
        const tag = await Tag.create({
            name:name,description:description,
        });
        return res.status(200).json({
            success:true,
            message:"tag created successfully",
        });
    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message,
        });
    } 
};

exports.showAllTags = async(req,res) =>{
    try{
        //find from db
        const allTags = await Tag.find({},{name:true,description:true});
        //return res
        return res.status(200).json({
            success:true,
            message:"All tags returned successfully",
            allTags,
        });

        }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}