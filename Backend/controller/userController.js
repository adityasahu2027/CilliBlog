import { User } from "../model/user.js";
import {v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookie } from "../jwt/authtoken.js";

export const register= async (req,res)=>{
   try {
     console.log("user route")

    // photo upload validate
    if(!req.files || Object.keys(req.files).length===0){
        return res.status(400).json({message:"No file uploaded"});
    }
    const{photo}=req.files;
    const allowedFormats=["image/jpeg","image/jpg","image/png","image/webp"];
    if(!allowedFormats.includes(photo.mimetype)){
        return res.status(400).json({message:"Only jpg, jpeg, png files are allowed"});
    }

// validate other fields
    const {name,email,phone,education,role,password}=req.body;
    if(!name || !email || !phone || !education || !role || !password || !photo){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    // check if user already exists
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"User already exists"})
    }
    // upload photo to cloudinary
const cloudinaryRes= await cloudinary.uploader.upload(photo.tempFilePath,{
    folder:"users"
}

);
if(!cloudinaryRes|| cloudinaryRes.error){
     console.log(cloudinaryRes.error)
    return res.status(500).json({message:"Photo upload failed"})
   
}

// hash password
const hashedPS = await bcrypt.hash(password,10);
// save user to db
const newUser = new User({email,name,phone,education,role,password:hashedPS,photo:{
    public_id:cloudinaryRes.public_id,url:cloudinaryRes.secure_url
}});
 await newUser.save();
if(newUser){
   const token = await createTokenAndSaveCookie(newUser._id,res);
    res.status(201).json({message:"User registered successfully",newUser,token:token});
}
   } catch (error) {
    console.log(error)
   }
};

// login
export const login= async (req,res)=>{
   const {email,password,role}=req.body; 
   try {
    if(!email || !password || !role){
        return res.status(400).json({message:"Please fill all the fields"})
    }
    const user = await User.findOne({email}).select
    ("+password"); //to get password also
    if(!user.password){
        return res.status(400).json({message:"User password is missing"})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch || !user){
        return res.status(400).json({message:"please check your password"})
    }
    if(user.role !== role){
        return res.status(400).json({message:"Role mismatch"})
    }
    const token = await createTokenAndSaveCookie(user._id,res);
    console.log("login token:",token)
    res.status(200).json({
        message: "user login successfully",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token: token
    });
   } catch (error) {
    console.log(error)
    res.status(500).json({message:"Server error"});
   }
}

// logout
export const logout = async (req, res) => {
    try {
const token = req.cookies?.jwt;
if(!token){
    return res.status(401).json({message:"User already logged out"});
}
        res.clearCookie("jwt", {
  httpOnly: true,
  secure: true, // agar localhost pe ho to false karo
  sameSite: "none",
});
        res.status(200).json({ message: "User logged out successfully" });

    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
}
// get my profile
export const getMyProfile = async (req, res) => {
const user =await req.user;
res.status(200).json({user});
}

//get all admins
export const getAllAdmins = async (req, res) => {
   const admins = await User.find({role:"admin"})
   res.status(200).json({admins}); 
}