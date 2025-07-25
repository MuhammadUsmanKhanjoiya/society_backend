import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';
import { addComplain, deleteComplain, updateComplain, getAllComplain } from '../controllers/ComplainController.js';    
const router = express.Router();

router.post("/", verifyToken, authorizRole("admin","member"), addComplain);
router.get("/", verifyToken, authorizRole("admin"), getAllComplain);
router.put("/:id", verifyToken, authorizRole("admin"), updateComplain);
router.delete("/:id", verifyToken, authorizRole("admin"), deleteComplain);

export default router;