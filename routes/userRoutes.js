import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizeRole from '../middleware/roleMiddleware.js';
import { getAllUsers , deleteUser} from '../controllers/userController.js';

const router = express.Router();

// ✅ Only admin can get all users
router.get("/", getAllUsers);
router.delete("/:id", verifyToken, authorizeRole("admin") , deleteUser );

export default router;
