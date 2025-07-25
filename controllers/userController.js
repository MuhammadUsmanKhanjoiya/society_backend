import UserModel from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "-password"); // exclude passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const  {id}  = req.params;
    console.log("🧨 Deleting user with ID:", req.user?.id.toString() );
    console.log("🧨 Requesting user:",id );
    
    // Prevent self-deletion
    if (req.user?.id.toString() === id) {
      console.log("id same as user id");
        return res.status(403).json({ message: "You cannot delete your own account." });
      
      
    }else{


    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      console.log("⚠️ User not found in DB");
      return res.status(404).json({ message: "User not found" });
    }
     
    console.log("✅ User deleted:", deletedUser.email);
    res.status(200).json({ message: "User deleted successfully" });

      }
    

  } catch (error) {
    console.error("❌ Delete error:", error.message);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
