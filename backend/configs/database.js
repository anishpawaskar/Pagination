import mongoose from "mongoose";

export const connectToDb = async () => {
  const MONGODB_URL =
    "mongodb+srv://admin:admin09@cluster0.gqvlcni.mongodb.net/demo";

  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to database successfully!🚀");
  } catch (err) {
    console.error("Error while connecting to database");
  }
};
