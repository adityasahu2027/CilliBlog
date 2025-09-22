import jwt from "jsonwebtoken"
import { User } from "../model/user.js";

 export const createTokenAndSaveCookie = async (userId,res) =>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });
    res.cookie("jwt",token,{
        httpOnly:true,   
        secure: false,  //agar localhost pe ho to false karo
        sameSite:"strict",
    });
    await User.findByIdAndUpdate(userId,{token});
    return token;
};