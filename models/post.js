import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    desc: {
        type: String,
    },

    imgArray: [{
        url: String,
        public_id: String
    }],

    likesArray: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],

    commentsArray: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]

}, {
    timestamps: true
});

export const PostModel = mongoose.model("Post", postSchema);