import User from "../models/user.js";
import MaintenanceBill from "../models/maintenanceBill.js"
// ── Admin: create a new bill for all members ─────────────────────────────────



export async function createMaintenanceBill(req, res) {
  try {
    const { title, month, year, amount, dueDate } = req.body;
    const members = await User.find({ role: "member" });
    const memberBills = members.map((m) => ({
      memberId: m._id,
      name: m.name,
      email: m.email,
      houseNumber: m.houseNumber,
      status: "unpaid",
    }));
    const bill = await MaintenanceBill.create({
      title,
      month,
      year,
      amount,
      dueDate,
      members: memberBills,
    });
    res.status(201).json({ message: "Maintenance bill created", bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create maintenance bill" });
  }
}

// ── Admin: get all bills ────────────────────────────────────────────────────────
export async function getAllMaintenanceBills(req, res) {
  try {
    const bills = await MaintenanceBill.find().populate(
      "members.memberId",
      "name email houseNumber"
    );
    res.status(200).json(bills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch maintenance bills" });
  }
}

// ── Member: get only their own bills ────────────────────────────────────────────
export async function getMyBills(req, res) {
  try {
    const userId = req.user.id;
    const all = await MaintenanceBill.find();
    const myBills = all.map((bill) => {
      const me = bill.members.find((m) => m.memberId.toString() === userId);
      return {
        _id: bill._id,
        title: bill.title,
        month: bill.month,
        year: bill.year,
        amount: bill.amount,
        dueDate: bill.dueDate,
        status: me ? me.status : "unpaid",
        paidAt: me ? me.paidAt : null,
      };
    });
    res.status(200).json(myBills);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch your bills" });
  }
}

// ── Member: mark their bill as paid ─────────────────────────────────────────────
export async function markBillPaid(req, res) {
  try {
    const { billId } = req.params;
    const userId = req.user.id;
    const bill = await MaintenanceBill.findById(billId);
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    const me = bill.members.find((m) => m.memberId.toString() === userId);
    if (!me)
      return res.status(404).json({ message: "Bill not assigned to you" });
    if (me.status === "paid")
      return res.status(400).json({ message: "Already paid" });

    me.status = "paid";
    me.paidAt = new Date();
    await bill.save();
    res.status(200).json({ message: "Bill marked as paid" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark bill as paid" });
  }
}

// ── Admin: update a bill ────────────────────────────────────────────────────────
export async function updateBill(req, res) {
  try {
    const { id } = req.params;
    const bill = await MaintenanceBill.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(bill);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update bill" });
  }
}

// ── Admin: delete a bill ────────────────────────────────────────────────────────
export async function deleteBill(req, res) {
  try {
    const { id } = req.params;
    const bill = await MaintenanceBill.findByIdAndDelete(id);
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json({ message: "Bill deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete bill" });
  }
}
