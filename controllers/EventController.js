import EventModel from "../models/event.js";

const addEvent = async (req, res) => {
  try {
    const { title, details , date, time, address} = req.body;

    const Event = new EventModel({
      title,
      details,
      date,
      time,
      address
    });

    await Event.save();
    res.status(201).json({ success: true, Event });
  } catch (error) {
    console.error('add event Error:', error);
  res.status(500).json({ message: 'Something went wrong', error: error.message });

  }
};

// ✅ Get All Announcements (Admin & Members)
const getAllEvent = async (req, res) => {
  try {
    const Event = await EventModel.find().sort({ createdAt: -1 });
    res.json(Event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Events" });
  }
};

// ✅ Update Announcement (Admin)
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, details, date, time , address } = req.body;

    const updated = await EventModel.findByIdAndUpdate(
      id,
      { title, details, date, time, address},
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Event not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update Event" });
  }
};

// ✅ Delete Announcement (Admin)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await EventModel.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ error: "Event not found" });

    res.json({ success: true, message: "Event deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Event" });
  }
};

export { addEvent , updateEvent ,deleteEvent ,getAllEvent };
