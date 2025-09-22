import e from "express";
import { Blog } from "../model/blog.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";


export const createBlog= async (req,res)=>{
   try {
     console.log("blog route")
     


    // photo upload validate
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({message:"Blog image is required"});
    }
    const{blogImage}=req.files;
    const allowedFormats=["image/jpeg","image/jpg","image/png","image/webp"];
    if(!allowedFormats.includes(blogImage.mimetype)){
        return res.status(400).json({message:"Only jpg, jpeg, png files are allowed"});
    }

// validate other fields
    const {title,about,category}=req.body || {};
    if(!category || !title || !about){
        return res.status(400).json({message:"Title,Category & About are required"})
    }
//
const adminName=req?.user?.name;
const adminPhoto=req?.user?.photo?.url;    
const createdby=req?.user?._id;


    // upload photo to cloudinary
const cloudinaryRes= await cloudinary.uploader.upload(blogImage.tempFilePath,{
    folder:"blogs"
});

if(!cloudinaryRes|| cloudinaryRes.error){
     console.log(cloudinaryRes.error)
    return res.status(500).json({message:"Photo upload failed"})
};

// save blog to db
const blogData ={title,about,category,adminName,adminPhoto,createdby,blogImage:{
    public_id:cloudinaryRes.public_id,url:cloudinaryRes.secure_url
},
};
const blog= await Blog.create(blogData);
    res.status(201).json({message:"Blog created successfully",blog});

   } catch (error) {
    console.log(error)
   }
};

// delete blog
export const deleteBlog= async (req,res)=>{
    const {id}=req.params;
    const blog= await Blog.findById(id);
    if(!blog){
        return res.status(404).json({message:"Blog not found"});
    }
    await blog.deleteOne();
    res.status(200).json({message:"Blog deleted successfully"});
}
// get all blogs
export const getAllBlogs= async (req,res)=>{
    const allBlogs = await Blog.find();
    res.status(200).json(allBlogs);
}

// get single blog
    export const getSingleBlogs= async (req,res)=>{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid blog id"});
        }
        const blog = await Blog.findById(id);
        if(!blog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json(blog);

    }
    // my blogs
    export const getMyBlogs= async (req,res)=>{
        const createdby=req.user._id;
        const myblogs = await Blog.find({createdby});
        res.status(200).json(myblogs);
    }
    // update blog
    export const updateBlog= async (req,res)=>{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"Invalid blog id"});
        }
        const updatedBlog = await Blog.findByIdAndUpdate(id,req.body,{ new:true});
        if(!updatedBlog){
            return res.status(404).json({message:"Blog not found"});
        }
        res.status(200).json({message:"Blog updated successfully",updatedBlog});

    }