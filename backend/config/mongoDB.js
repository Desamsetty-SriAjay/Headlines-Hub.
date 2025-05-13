import mongoose from "mongoose";
import dotenv from "dotenv"; 

dotenv.config();  

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/headlines-hub`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
};

export default connectDB;
