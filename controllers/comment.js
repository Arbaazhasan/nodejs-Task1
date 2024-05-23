import { CommentModel } from "../models/comment.js";
import { PostModel } from "../models/post.js";

// Add New Comment
export const addComment = async (req, res) => {

    try {

        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.User._id;

        const isPost = await PostModel.findById({ _id: postId });

        if (!isPost) return res.status(404).json({
            success: false,
            message: "Post does not exist!"
        });

        const newComment = await CommentModel.create({
            userId,
            postId,
            text
        });

        await PostModel.findByIdAndUpdate(postId, { $push: { commentsArray: newComment._id } });

        res.status(201).json({
            success: true,
            message: "Comment add successfully",
            comment: newComment
        });

    } catch (error) {

        res.status(500).json({
            success: true,
            message: "Internal server error!",
            error: error.message
        });

    }

};