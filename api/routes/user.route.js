import express from 'express';
import { deleteUser, test, updateUser ,getUserListings,getUser} from '../controllers/user.controller.js'; // ✅ correct path with .js extension
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Test route: http://localhost:3000/api/user/test
router.get('/test', test);
router.post('/update/:id', verifyToken,updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)

export default router;
