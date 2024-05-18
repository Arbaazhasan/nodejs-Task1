import express from "express";
import dbConnect from "./data/dbConnection.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import userRouter from "./routes/userRoutes.js";


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


const PORT = process.env.PORT || 3000;

// Server
app.listen(PORT, (req, res) => {
    console.log(`Server working on Port : ${PORT}`);
});