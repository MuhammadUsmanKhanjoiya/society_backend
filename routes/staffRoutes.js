import express from 'express';
import { createStaff, getAllStaff, deleteStaff } from '../controllers/staffController.js';
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/',verifyToken, authorizRole("admin"), createStaff);
router.get('/',verifyToken, getAllStaff);
router.delete('/:id',verifyToken , authorizRole("admin") , deleteStaff);

export default router;
