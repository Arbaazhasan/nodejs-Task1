import express from "express";
import { forgetPassword, login, logout, register } from "../controllers/user.js";

const router = express.Router();

// POST Methods
router.post("/login", login);
router.post("/register", register);
router.post("/forgetPassword", forgetPassword);

// GET Methods
router.get("/logout", logout);


export default router;