import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import authorizRole from "../middleware/roleMiddleware.js";
import {
  getMessages,
  sendMessage,
  deleteMessage,
  blockMember,
  unblockMember,
    getAllUsers,
    getBlockedUserIds
} from "../controllers/chatController.js";

const router = express.Router();

router.get("/messages", verifyToken, getMessages);
router.post("/send", verifyToken, sendMessage);
router.delete("/message/:id", verifyToken, authorizRole("admin"), deleteMessage);
router.post("/block/:id", verifyToken, authorizRole("admin"), blockMember);
router.post("/unblock/:id", verifyToken, authorizRole("admin"), unblockMember);
// In userRoutes.js
router.get('/all', verifyToken, authorizRole("admin"), getAllUsers);
router.get('/blocked', verifyToken, authorizRole("admin"), getBlockedUserIds);

export default router;
