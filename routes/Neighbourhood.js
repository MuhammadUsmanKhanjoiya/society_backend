import exprees from "express";
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';
import { addNeighbourhood, getAllNeighbourhoods, updateNeighbourhood, deleteNeighbourhood } from "../controllers/NeighbourhoodController.js";           
const router = exprees.Router();


// Add a new neighbourhood
router.post("/", verifyToken, authorizRole("admin"),addNeighbourhood);    

// Get all neighbourhoods
router.get("/", verifyToken, authorizRole("admin","member"), getAllNeighbourhoods); 
// Update a neighbourhood
router.put("/:id", verifyToken, authorizRole("admin"), updateNeighbourhood);
// Delete a neighbourhood
router.delete("/:id", verifyToken, authorizRole("admin"), deleteNeighbourhood);   

export default router;