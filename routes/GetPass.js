import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';
import { addGetPass , updateGetPass , deleteGetPass , getAllGetPass } from '../controllers/GetPassController.js';
const router = express.Router();



router.get('/', verifyToken, authorizRole("admin"), getAllGetPass); // Get all GetPass records
router.post('/', verifyToken, authorizRole("admin","member"), addGetPass); // Create a new GetPass record     
router.put('/:id', verifyToken, authorizRole("admin"), updateGetPass); // Update a GetPass record by ID
router.delete('/:id', verifyToken, authorizRole("admin"), deleteGetPass); // Delete a GetPass record by ID
export default router;