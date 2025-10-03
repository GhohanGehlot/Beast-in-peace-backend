import mongoose from "mongoose";
import dotenv from 'dotenv';


dotenv.config();


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDb connected");

    } catch (err) {
        console.log(err.message);

    }
}


export default connectDb;


