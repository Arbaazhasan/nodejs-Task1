import express from 'express';
import { addComment } from '../controllers/comment.js';
import { Authentication } from '../middleware/auth.js';

const router = express.Router();

router.post('/addcommnet/:postId', Authentication, addComment);

export default router;