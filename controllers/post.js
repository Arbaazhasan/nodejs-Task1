import { v2 as cloudinary } from 'cloudinary';
import { dataUriParser } from '../utils/dataUri.js';
import { PostModel } from '../models/post.js';
import { userModel } from '../models/user.js';


// Create Post
export const createPost = async (req, res) => {

    try {
        const { desc } = req.body;
        const userId = req.User._id;

        const files = req.files;
        const urlArray = [];

        await Promise.all(
            files.map(async (file) => {
                const getUri = dataUriParser(file);

                const uploadResult = await cloudinary.uploader.upload(getUri.content);

                const imgData = {
                    public_id: uploadResult.public_id,
                    url: uploadResult.url
                };

                urlArray.push(imgData);

            })
        );


        const createPost = await PostModel.create({
            userId,
            desc,
            imgArray: urlArray
        });

        // console.log(createPost);

        res.status(201).json({
            success: true,
            message: "Post Create",
            userId,
            desc,
            imgArray: urlArray
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });

    }

};


// Update Post
export const updatePost = async (req, res) => {

    const { desc } = req.body;
    const { postId } = req.params;
    try {

        const isExists = await PostModel.findById({ _id: postId });

        if (!isExists) return res.status(404).json({
            success: false,
            message: "Post not found!"
        });

        const updatePost = await PostModel.findByIdAndUpdate({ _id: postId }, { desc });

        // console.log(updatePost);

        res.status(200).json({
            success: true,
            message: "Post Update"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });

    }

};


// Delete Post
export const delelePost = async (req, res) => {

    try {

        const { postId } = req.params;

        const isExists = await PostModel.findById({ _id: postId });

        if (!isExists) return res.status(404).json({
            success: false,
            message: "Post not found!"
        });

        console.log(isExists.imgArray[0].public_id);

        await Promise.all(

            isExists.imgArray.map((pid) => {
                cloudinary.uploader.destroy(pid.public_id);
            })
        );


        const deltePost = await PostModel.findByIdAndDelete({ _id: postId });

        res.status(200).json({
            success: true,
            message: "Post Delete",
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });

    }

};


// Get All Posts
export const getPosts = async (req, res) => {

    try {

        const { userId } = req.params;

        const getAllPosts = await PostModel.find({ userId }).populate('userId');

        res.status(200).json({
            success: true,
            getAllPosts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });

    }

};


// Get Specific Post
export const getPost = async (req, res) => {

    try {

        const { _id } = req.params;

        const getPost = await PostModel.findOne({ _id }).populate('userId');

        if (!getPost) return res.status(404).json({
            success: false,
            message: "Post not found!"
        });

        res.status(200).json({
            success: true,
            getPost
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: error.message
        });
    }
};