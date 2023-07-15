import mongoose from "mongoose";

export async function connectDB(DB_KEY: string) {
  try {
    await mongoose.connect(DB_KEY);
  } catch (err) {
    console.log(err);
  }
}
