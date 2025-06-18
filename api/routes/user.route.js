import express from 'express';
import { test, updateUser } from '../controllers/user.controller.js'; // ✅ correct path with .js extension
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Test route: http://localhost:3000/api/user/test
router.get('/test', test);
router.post('/update/:id', verifyToken,updateUser);

export default router;
