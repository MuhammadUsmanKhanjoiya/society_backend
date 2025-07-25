import express from 'express';
import verifyToken from '../middleware/authMiddleware.js';
import authorizRole from '../middleware/roleMiddleware.js';
import { getAllEvent, addEvent, updateEvent, deleteEvent } from '../controllers/EventController.js';
const router = express.Router();


router.get('/', verifyToken, authorizRole("admin" , "member"), getAllEvent); // Get all events
router.post('/', verifyToken, authorizRole("admin"), addEvent); // Create a new event    
router.put('/:id', verifyToken, authorizRole("admin"), updateEvent); // Update an event by ID
router.delete('/:id', verifyToken, authorizRole("admin"), deleteEvent); // Delete an event by ID

export default router;
