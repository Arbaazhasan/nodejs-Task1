import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// User Register API
export const register = async (req, res) => {

    try {

        const { email, username, password } = req.body;

        if (!email || !username || !password)
            return res.status(401).json({
                success: false,
                message: "fill the all feilds "
            });

        const isUserExits = await userModel.findOne({ username });

        if (isUserExits) return res.status(409).json({
            success: false,
            message: "User already Exits!"
        });


        const hashPassword = await bcrypt.hash(password, 10);

        const User = await userModel.create({
            email,
            username,
            password: hashPassword
        });

        const token = await jwt.sign({ _id: User._id }, process.env.JWT_URI);

        res.status(201).cookie("token", token, {
            maxAge: 100 * 60 * 60,
            httpOnly: true
        }).json({
            success: true,
            message: "Registered"
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};



// User Login API
export const login = async (req, res) => {

    const { username, password } = req.body;

    try {
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: "Fill the all fields"
            });


        const isUserExits = await userModel.findOne({ username }).select('+password');

        if (!isUserExits)
            return res.status(404).json({
                success: false,
                message: "Incorrect user or password"
            });


        const isMatched = await bcrypt.compare(password, isUserExits.password);


        if (!isMatched)
            return res.status(400).json({
                success: false,
                message: "Incorrect Passwrod !"
            });

        const token = await jwt.sign({ _id: isUserExits._id }, process.env.JWT_URI);

        res.status(200).cookie("token", token, {
            maxAge: 100 * 60 * 60,
            httpOnly: true
        }).json({
            success: true,
            message: `Welcome ${username}`
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Logout API
export const logout = (req, res) => {

    try {
        res.status(200).cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        }).json({
            success: true,
            message: "Logout"
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Forget Password API
export const forgetPassword = async (req, res) => {

    try {
        const { token } = req.cookies;
        const { currentPassword, newPassword } = req.body;

        if (!token) return res.status(409).json({
            success: false,
            message: "Login First!"
        });

        const decode = await jwt.verify(token, process.env.JWT_URI);

        const isUser = await userModel.findById({ _id: decode._id }).select('+password');

        if (!isUser) return res.status(409).json({
            success: false,
            message: "User not Exits!"
        });

        const isMatched = await bcrypt.compare(currentPassword, isUser.password);

        if (!isMatched) return res.status(409).json({
            success: false,
            message: "Current Password Not Matched!"
        });

        const hashPassword = await bcrypt.hash(newPassword, 10);

        await userModel.findByIdAndUpdate({ _id: isUser._id }, {
            password: hashPassword
        });


        res.status(200).json({
            success: true,
            message: "Password Changed"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};
