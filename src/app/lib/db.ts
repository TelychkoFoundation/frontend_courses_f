import * as mongoose from "mongoose";

export async function createDBConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to the database");
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI, { bufferCommands: false });
    console.log("Successfully connected to the database");
    return true;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return false;
  }
}
