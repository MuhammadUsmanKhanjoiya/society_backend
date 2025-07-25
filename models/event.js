import mongoose from "mongoose";
// title , date  , time , address , details
const EventSchema = new mongoose.Schema({
   
   title: { 
          type: String,
          required: true
   },
   
   details: {
        type: String,
        required: true
   },
   date:{
        type: Date,
        required: true
   },
   time:{
        type: String,
        required: true
   },
   address:{
        type: String,
        required: true
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const EventModel = mongoose.model("Event", EventSchema);
export default EventModel; 
