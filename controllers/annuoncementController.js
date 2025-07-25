import AnnouncementModel from "../models/announcement.js";

const addAnnouncement = async (req, res) => {
  try {
    const { title, description , date} = req.body;

    const announcement = new AnnouncementModel({
      title,
      description,
      date,
    });

    await announcement.save();
    res.status(201).json({ success: true, announcement });
  } catch (error) {
    
     console.error('Register Error:', error);
  res.status(500).json({ message: 'Something went wrong', error: error.message });

  }
};

// ✅ Get All Announcements (Admin & Members)
const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await AnnouncementModel.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch announcements" });
  }
};

// ✅ Update Announcement (Admin)
const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description , date } = req.body;

    const updated = await AnnouncementModel.findByIdAndUpdate(
      id,
      { title, description ,date },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Announcement not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update announcement" });
  }
};

// ✅ Delete Announcement (Admin)
const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Deleting Announcement ID:", id);

    const deleted = await AnnouncementModel.findByIdAndDelete(id);

    if (!deleted) {
      console.log("Announcement not found");
      return res.status(404).json({ error: "Announcement not found" });
    }

    res.json({ success: true, message: "Announcement deleted" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ error: "Failed to delete announcement" });
  }
};

export { addAnnouncement , updateAnnouncement ,deleteAnnouncement ,getAllAnnouncements };
