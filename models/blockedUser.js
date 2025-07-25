import mongoose from "mongoose";
import Message from "../models/message.js";
import User from "../models/user.js"; // Assuming you have this

const blockedSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

const BlockedUser = mongoose.model("BlockedUser", blockedSchema);
export default BlockedUser 
