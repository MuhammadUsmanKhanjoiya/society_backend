import express from 'express'
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';
import { addAnnouncement , deleteAnnouncement ,updateAnnouncement , getAllAnnouncements} from '../controllers/annuoncementController.js'

const router = express.Router();



router.post("/", verifyToken, authorizRole("admin"), addAnnouncement);

// ✅ Get all announcements (Admin + Members)
router.get("/",verifyToken, authorizRole("admin", "member"), getAllAnnouncements);

// ✅ Update announcement (Admin only)
router.put("/:id",verifyToken, authorizRole("admin"), updateAnnouncement);

// ✅ Delete announcement (Admin only)
router.delete("/:id",verifyToken, authorizRole("admin"), deleteAnnouncement);
export default router;

