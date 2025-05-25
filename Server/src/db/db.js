import mongoose from "mongoose";


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log("MongoDB :: Connect Successful.....");
  } catch (error) {
    console.log("MongoDB Not Connected");
  }
};

export default connectDB