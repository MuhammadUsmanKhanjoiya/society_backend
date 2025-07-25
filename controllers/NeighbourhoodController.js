import neighbourhoodModel from "../models/neighbourhood.js";

// Add a new neighbourhood
const addNeighbourhood = async (req, res) => {
 
 const  {title , subtitle , description , contactNumber , imageUrl } = req.body;  
 try {
    const Neighbourhood = new neighbourhoodModel({
        title,
        subtitle,
        description,
        contactNumber,
        imageUrl
    });
   await Neighbourhood.save();
   res.status(201).json({ success: true, Neighbourhood });  
 
 } catch (error) {
    console.error('Add Neighbourhood Error:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
 }

}
// Get all neighbourhoods
const getAllNeighbourhoods = async (req, res) => {
  try {
    const neighbourhoods = await neighbourhoodModel.find().sort({ createdAt: -1 });
    res.json(neighbourhoods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch neighbourhoods" });
  }
};


// Update a neighbourhood
const updateNeighbourhood = async (req, res) => {               
    try {
        const { id } = req.params;
        const { title, subtitle, description, contactNumber, imageUrl } = req.body;
    
        const updated = await neighbourhoodModel.findByIdAndUpdate(
        id,
        { title, subtitle, description, contactNumber, imageUrl },
        { new: true }
        );
    
        if (!updated) return res.status(404).json({ error: "Neighbourhood not found" });
    
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Failed to update neighbourhood" });
    }
    }
// Delete a neighbourhood
const deleteNeighbourhood = async (req, res) => {
    try {
        const { id } = req.params;
    
        const deleted = await neighbourhoodModel.findByIdAndDelete(id);
    
        if (!deleted) return res.status(404).json({ error: "Neighbourhood not found" });
    
        res.json({ message: "Neighbourhood deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete neighbourhood" });
    }
}

export { addNeighbourhood, getAllNeighbourhoods, updateNeighbourhood, deleteNeighbourhood };