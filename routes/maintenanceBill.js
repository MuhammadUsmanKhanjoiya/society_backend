import express from "express";
import {
  createMaintenanceBill,
  getAllMaintenanceBills,
  getMyBills,
  markBillPaid,
  updateBill,
  deleteBill,
} from "../controllers/maintenanceBillController.js";

// ** Adjust these paths if your middleware files are named differently **
import verifyToken from "../middleware/authMiddleware.js";
import authorizeRole from "../middleware/roleMiddleware.js";

const router = express.Router();

// ── Admin routes ───────────────────────────────────────────────────────────────
router.post("/", verifyToken, authorizeRole("admin"), createMaintenanceBill);
router.get("/", verifyToken, authorizeRole("admin"), getAllMaintenanceBills);
router.put("/:id", verifyToken, authorizeRole("admin"), updateBill);
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteBill);

// ── Member routes ──────────────────────────────────────────────────────────────
router.get("/my", verifyToken, getMyBills);
router.put("/pay/:billId", verifyToken, markBillPaid);

export default router;
