import mongoose from "mongoose";

const AnnouncementSchema = new mongoose.Schema({
   
   title: { 
          type: String,
          required: true
   },
   
   description: {
        type: String,
         required: true
   },
   date:{
        type: Date,
        required: true
  
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const AnnouncementModel = mongoose.model("Announcement", AnnouncementSchema);
export default AnnouncementModel; 
