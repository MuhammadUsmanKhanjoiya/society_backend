import mongoose from "mongoose";
import {DB_Name} from "../constant.js"

const DBconnection = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_Name}`);
        console.log(`MongoDB connected successfully to:${DB_Name}`);
        
    } catch (error) {
        console.error('error' , error.message);
        process.exit(1);
    }
}

export default DBconnection;