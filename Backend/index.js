import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import userRoute from "./routes/userroute.js"
import blogRoute from "./routes/blogroute.js"
import fileUpload from "express-fileupload";
import {v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser"
import cors from "cors"; 

const app = express()
dotenv.config();

// ✅ enable CORS

app.use(cors({
  origin: function(origin, callback) {
    // Agar request local ya frontend se aa rahi hai, allow karo
    callback(null, true); // har origin allow
  },
  credentials: true,       // cookies enable
  methods: ["GET","POST","PUT","DELETE"]
}));


//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const port = process.env.PORT;
const mongo_url=process.env.MONGO_URI;

//middleware
app.use(express.json());  //to parse json data
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
    
}));  //to upload files
app.use(cookieParser());

//db code
try {
   mongoose.connect(mongo_url);
    console.log("connected to mongo db")
} catch (error) {
   console.log(error) 
}

app.get("/",(req,res)=>{
    res.send("hello")
})

// routes
app.use("/api/users",userRoute);
app.use("/api/blogs",blogRoute);




app.listen(port,()=>{
    console.log(`app listening on port ${port}`)
});