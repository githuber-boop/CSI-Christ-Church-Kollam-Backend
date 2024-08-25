import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = () => {
  try {
    mongoose.connect(process.env.DB || "");
    console.log("Mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;