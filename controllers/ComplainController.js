import ComplainModel from "../models/complain.js";
//  date , HouseNumber  ,  contactNumber , title  , description 

const addComplain = async (req, res) => {
  try {
    const { title, description , date ,contactNumber ,HouseNumber } = req.body;

    const Complain = new ComplainModel({
  
      title, description , date 
      ,contactNumber ,HouseNumber,status:"Pending"
    });

    await Complain.save();
    res.status(201).json({ success: true, Complain });
  } catch (error) {
    
     console.error('add Complain Error:', error);
  res.status(500).json({ message: 'Something went wrong', error: error.message });

  }
};

// ✅ Get All Announcements (Admin & Members)
const getAllComplain = async (req, res) => {
  try {
    const Complain = await ComplainModel.find().sort({ createdAt: -1 });
    res.json(Complain);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Complain" });
  }
};

// ✅ Update Announcement (Admin)
const updateComplain = async (req, res) => {
  try {
    const { id } = req.params;
    const {  title, description , date ,contactNumber ,HouseNumber, status } = req.body;

    const updated = await ComplainModel.findByIdAndUpdate(
      id,
      {  title, description , date ,contactNumber ,HouseNumber ,status},
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Complain not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Complain" });
  }
};

// ✅ Delete Announcement (Admin)
const deleteComplain = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ComplainModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Complain not found" });

    res.json({ success: true, message: "Complain deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Complain" });
  }
};

export { addComplain , updateComplain ,deleteComplain ,getAllComplain };
