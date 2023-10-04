import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();
const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL) 
        console.log(`Connected To MongoDb Database ${conn.connection.host}`.bgGreen.white)
    } catch (error) {
        console.log(`Error in mongodb ${error}`.bgRed.white);
    }
}

export default connectDB;