import { PostModel } from "../models/post.js";

export const likePost = async (req, res) => {

    try {

        const { postId } = req.params;
        const userId = req.User._id;

        const post = await PostModel.findById({ _id: postId });

        if (!post) return res.status(404).json({
            success: false,
            message: "Post does not found!"
        });


        if (!post.likesArray.includes(userId)) {
            await PostModel.findByIdAndUpdate(postId, { $push: { likesArray: userId } });

            res.status(200).json({
                success: true,
                message: "Post Liked!"
            });
        } else {
            await PostModel.findByIdAndUpdate(postId, { $pull: { likesArray: userId } });

            res.status(200).json({
                success: true,
                message: "Post disliked!"
            });
        }


    } catch (error) {

        res.status(500).json({
            success: true,
            message: "Internal server error!",
            error: error.message
        });

    }

};