import mongoose from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail],  //validator library

    },
    phone:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
    },
     photo:{
        public_id:{
           type:String, 
        },
        url:{
            type:String,
        },
    },
    education:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:["user","admin"],

    },
     password:{
        type:String,
        required:true,
        minlength:6,
        select:false,  //password will not be shown when we fetch user data
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },

});
export const User=mongoose.model("User",userSchema);