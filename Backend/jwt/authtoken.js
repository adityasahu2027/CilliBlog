import jwt from "jsonwebtoken"
import { User } from "../model/user.js";

 export const createTokenAndSaveCookie = async (userId,res) =>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"15d",
    });
    res.cookie("jwt",token,{
        httpOnly:false,  //client side se access karne ke liye false aur server side se access karne ke liye true 
        secure:true,  //agar localhost pe ho to false karo nhi to true karo
        sameSite:"none", //cross site cookie ke liye none karo
    });
    await User.findByIdAndUpdate(userId,{token});
    return token;
};