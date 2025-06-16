import express from 'express';
import { test } from '../controllers/user.controller.js'; // ✅ correct path with .js extension

const router = express.Router();

// Test route: http://localhost:3000/api/user/test
router.get('/test', test);

export default router;
