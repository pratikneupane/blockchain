import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = ()=> {
    mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => {console.log("MONGO_DB connected")})
    .catch((err) => {console.log (err)})
}

export default connectDB;