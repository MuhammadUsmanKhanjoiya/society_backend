import Message from "../models/message.js";
import BlockedUser from "../models/blockedUser.js";
import User from "../models/user.js"; // Assuming you have this

export const getMessages = async (req, res) => {
  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  const messages = await Message.find({
    $or: [
      { recipient: null },
      { recipient: userId },
      ...(isAdmin ? [{}] : []),
    ],
  }).populate("sender", "name role").sort({ createdAt: 1 });

  res.json(messages);
};

export const sendMessage = async (req, res) => {
  const userId = req.user.id;
  const { content, recipient } = req.body;

  const blocked = await BlockedUser.findOne({ memberId: userId });
  if (req.user.role !== "admin" && blocked?.blocked) {
    return res.status(403).json({ error: "You are blocked from sending messages." });
  }

  const message = new Message({
    sender: userId,
    content,
    recipient: req.user.role === "admin" ? recipient || null : null,
  });

  await message.save();
  res.status(201).json({ success: true, message });
};

export const deleteMessage = async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};

export const blockMember = async (req, res) => {
  await BlockedUser.findOneAndUpdate(
    { memberId: req.params.id },
    { blocked: true },
    { upsert: true, new: true }
  );
  res.json({ success: true, message: "Member blocked." });
};

export const unblockMember = async (req, res) => {
  await BlockedUser.findOneAndUpdate(
    { memberId: req.params.id },
    { blocked: false },
    { upsert: true, new: true }
  );
  res.json({ success: true, message: "Member unblocked." });
};
export const getAllUsers = async (req, res) => {
  const users = await User.find({}, '_id name role');
  res.json(users);
};

export const getBlockedUserIds = async (req, res) => {
  const blocked = await BlockedUser.find({ blocked: true });
  res.json(blocked.map((b) => b.memberId.toString()));
};
