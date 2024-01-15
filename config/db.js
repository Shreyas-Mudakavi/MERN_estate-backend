import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    // mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(uri);
    console.log(`Database is conected successfully!!`);
  } catch (error) {
    console.log(`An error occured while connecting to database.`, error);
  }
};

// module.exports = connectDB;
export default connectDB;
