import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO)
        console.log("Connected to Mongo Databse");
    } catch(error) {
        console.log(error);
    }
}

export default connectDB;