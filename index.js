import express from "express";
import dbConnect from "./data/dbConnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from 'cloudinary';


// Routes
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/post.js";
import commentRouter from './routes/comment.js';
import likeRouter from './routes/likes.js';


// env Config
dotenv.config({
    path: './data/config.env'
});


// middleware
const app = express();
app.use(express.json());
app.use(cookieParser());


// DATABASE CONNECTION
dbConnect();


// Routes
app.use('/api/v1/user/', userRouter);
app.use('/api/v1/post/', postRouter);
app.use('/api/v1/comment/', commentRouter);
app.use('/api/v1/like/', likeRouter);


// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
    console.log(`Server working on Port : ${PORT}`);
});