import mongoose from "mongoose";

const memberBillSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  houseNumber: String,
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  paidAt: Date,
});

const maintenanceBillSchema = new mongoose.Schema({
  title: { type: String, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  members: [memberBillSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MaintenanceBill", maintenanceBillSchema);
