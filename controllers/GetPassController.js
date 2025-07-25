import GetPassModel from "../models/getPass.js";
// date, numberOfPeople , CNIC ,  purpose.   

const addGetPass = async (req, res) => {
  try {
    const {date , CNIC , purpose , numberOfPeople} = req.body;

    const GetPass = new GetPassModel({
      date ,
       CNIC ,
        purpose ,
         numberOfPeople
    });
    
    await GetPass.save();
    res.status(201).json({ success: true, GetPass });
  } catch (error) {
                    
     console.error('add GetPass Error:', error);
  res.status(500).json({ message: 'Something went wrong', error: error.message });

  }
};

// ✅ Get All Announcements (Admin & Members)
const getAllGetPass = async (req, res) => {
  try {
    const GetPass = await GetPassModel.find().sort({ createdAt: -1 });
    res.json(GetPass);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch GetPass" });
  }
};

// ✅ Update Announcement (Admin)
const updateGetPass = async (req, res) => {
  try {
    const { id } = req.params;
    const { date , CNIC , purpose , numberOfPeople } = req.body;

    const updated = await GetPassModel.findByIdAndUpdate(
      id,
      { date , CNIC , purpose , numberOfPeople},
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "GetPass not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update GetPass" });
  }
};

// ✅ Delete Announcement (Admin)
const deleteGetPass = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await GetPassModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "GetPass not found" });

    res.json({ success: true, message: "GetPass deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete GetPass" });
  }
};

export { addGetPass , updateGetPass ,deleteGetPass ,getAllGetPass };
