// connection creation to db
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(
      URI,

      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Error while connecting to MongoDB: " + error.message);
  }
};

export default connectDB;
