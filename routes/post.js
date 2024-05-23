import express from "express";
import { createPost, delelePost, getPost, getPosts, updatePost } from "../controllers/post.js";
import { Authentication } from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post('/createpost', Authentication, upload, createPost);
router.put('/updatepost/:postId', Authentication, updatePost);
router.delete('/delelepost/:postId', Authentication, delelePost);

router.get('/getposts/:userId', getPosts);
router.get('/getpost/:_id', getPost);



export default router;