import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email: {
        type: String
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        select: false
    }
});


export const userModel = mongoose.model("User", userSchema);
