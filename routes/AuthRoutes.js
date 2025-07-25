import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';

import { registor , login} from '../controllers/authController.js'
const router = express.Router();



router.post("/registor" ,verifyToken ,authorizRole("admin"), registor);
router.post("/login", login);

export default router;

