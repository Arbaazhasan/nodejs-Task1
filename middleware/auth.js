import jwt from "jsonwebtoken";
import { userModel } from "../models/user.js";

export const Authentication = async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return res.status(403).json({
        success: false,
        message: "Action Forbidden, Login First!"
    });

    const decoded = await jwt.verify(token, process.env.JWT_URI);
    const user = await userModel.findById({ _id: decoded._id });

    if (!user) return res.status(404).json({
        success: false,
        message: "Action Forbidden, Login First!"
    });

    req.User = user;

    next();

}; 