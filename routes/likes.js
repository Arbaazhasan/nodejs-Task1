import express from "express";
import { Authentication } from "../middleware/auth.js";
import { likePost } from "../controllers/likes.js";

const router = express.Router();

router.post('/likepost/:postId', Authentication, likePost);


export default router;