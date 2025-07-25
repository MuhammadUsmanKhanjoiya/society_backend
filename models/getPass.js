import mongoose from "mongoose";

const GetpassSchema = new mongoose.Schema({
// date, numberOfPeople , CNIC ,  purpose.   
   numberOfPeople: { 
          type: Number,
          required: true
   },
   
   purpose: {
        type: String,
        require:true
   },
   date:{
        type: [String],
        require:true
   },
   CNIC:{
        type: String,
        require:true
  
   },
   createdAt: {
       type: Date,
       default: Date.now
   }
});

const GetpassModel = mongoose.model("Getpass", GetpassSchema);
export default GetpassModel; 
