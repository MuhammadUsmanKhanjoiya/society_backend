import Staff from '../models/staff.js';

export const createStaff = async (req, res) => {
  try {
    const { name, role ,shift,contact } = req.body;
    const staff = new Staff({ name, role ,shift,contact });
    await staff.save()
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff.' });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Staff deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete staff.' });
  }
};
