import mongoose, { Schema } from "mongoose"


const UserSchema = new mongoose.Schema({
     name:{
           type : String,

           
           required: [true, 'Name is required'],
           minlength: [3, 'Name must be at least 3 characters'],
           maxlength: [50, 'Name cannot exceed 50 characters'],
        
     },
     email:{
            type : String,
            required: [true, 'Email is required'],
            unique : true
     },
     password:{
            type : String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters']
     },
     role:{
            type: String,
            enum: ['user', 'admin', 'member'],
            default: 'user'
     },
     HouseNumber:{
       type:String,
       required: [true ,"housenumber is required"]
     },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: {
            type: Date,
            default: Date.now
      }
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel; 