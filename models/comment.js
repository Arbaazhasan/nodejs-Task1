import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },

    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const CommentModel = mongoose.model("Comment", commentSchema);