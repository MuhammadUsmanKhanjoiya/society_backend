import mongoose from "mongoose";

const ComplainSchema = new mongoose.Schema({
//  date , HouseNumber  ,  contactNumber , title  , description 
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
   contactNumber:{
        type: Number,
  
   },
   HouseNumber:{
        type: String,
  
   },
    status: { 
       type: String,
      enum: ["Resolved", "Pending"], default: "Pending" 
     },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const ComplainModel = mongoose.model("Complain", ComplainSchema);
export default ComplainModel; 
