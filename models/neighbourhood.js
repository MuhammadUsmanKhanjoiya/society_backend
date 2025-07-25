import mongoose from "mongoose";

const neighbourhoodSchema = new mongoose.Schema({
//  date , h/A number  ,  contact number , title  , description 
   title: { 
          type: String,
          required: true
   },
   subtitle: { 
          type: String,
          required: true
   },
   description: {
        type: String,
        required: true
   },
   contactNumber:{
        type: String,
  
   },
   imageUrl:{
        type: String,
  
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const neighbourhoodModel = mongoose.model("neighbourhood", neighbourhoodSchema);
export default neighbourhoodModel; 
